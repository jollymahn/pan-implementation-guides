"""JWT demo app for the AIGW hybrid lab.

Logs a user in against Keycloak over OIDC, then forwards the resulting access
token straight to the AI Gateway as a bearer credential. The app holds no
gateway API key and no LLM provider key: every call is authorized by the token
Keycloak issued, which the gateway validates against the JWKS registered in
Strata Cloud Manager.
"""

import os
import json
import base64
import logging

import requests
from authlib.integrations.flask_client import OAuth
from flask import Flask, redirect, render_template, request, session, url_for

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("jwt-demo")

KEYCLOAK_BASE_URL = os.environ["KEYCLOAK_BASE_URL"].rstrip("/")
KEYCLOAK_REALM = os.environ.get("KEYCLOAK_REALM", "aigw-lab")
KEYCLOAK_CLIENT_ID = os.environ.get("KEYCLOAK_CLIENT_ID", "jwt-demo-app")
KEYCLOAK_CLIENT_SECRET = os.environ["KEYCLOAK_CLIENT_SECRET"]

GATEWAY_URL = os.environ["GATEWAY_URL"].rstrip("/")
GATEWAY_MODEL = os.environ.get("GATEWAY_MODEL", "@openai/gpt-4o-mini")
REQUEST_TIMEOUT = int(os.environ.get("REQUEST_TIMEOUT_SECONDS", "60"))

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]

# Keycloak sits behind an internal load balancer on plain HTTP inside the VNet,
# so the session cookie cannot be marked Secure.
app.config.update(SESSION_COOKIE_HTTPONLY=True, SESSION_COOKIE_SAMESITE="Lax")

oauth = OAuth(app)
oauth.register(
    name="keycloak",
    client_id=KEYCLOAK_CLIENT_ID,
    client_secret=KEYCLOAK_CLIENT_SECRET,
    server_metadata_url=(
        f"{KEYCLOAK_BASE_URL}/realms/{KEYCLOAK_REALM}/.well-known/openid-configuration"
    ),
    client_kwargs={"scope": "openid profile email"},
)


def decode_claims(token):
    """Decode a JWT payload without verifying it.

    Display only. The gateway is what actually verifies the signature against
    the JWKS held in SCM.
    """
    try:
        payload = token.split(".")[1]
        payload += "=" * (-len(payload) % 4)
        return json.loads(base64.urlsafe_b64decode(payload))
    except (IndexError, ValueError) as exc:
        log.warning("could not decode token payload: %s", exc)
        return {}


@app.route("/")
def index():
    token = session.get("access_token")
    return render_template(
        "index.html",
        logged_in=bool(token),
        username=session.get("username"),
        access_token=token,
        claims=decode_claims(token) if token else None,
        gateway_url=GATEWAY_URL,
        gateway_model=GATEWAY_MODEL,
        result=session.pop("result", None),
    )


@app.route("/login")
def login():
    return oauth.keycloak.authorize_redirect(url_for("callback", _external=True))


@app.route("/callback")
def callback():
    token = oauth.keycloak.authorize_access_token()
    session["access_token"] = token["access_token"]
    userinfo = token.get("userinfo") or {}
    session["username"] = userinfo.get("preferred_username", "unknown")
    log.info("login completed for %s", session["username"])
    return redirect(url_for("index"))


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


@app.route("/ask", methods=["POST"])
def ask():
    token = session.get("access_token")
    if not token:
        return redirect(url_for("login"))

    prompt = request.form.get("prompt", "").strip()
    if not prompt:
        session["result"] = {"status": "error", "body": "Enter a prompt first."}
        return redirect(url_for("index"))

    # The Keycloak access token is the only credential sent. No gateway API key
    # and no provider key exist anywhere in this app.
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",
    }
    payload = {
        "model": GATEWAY_MODEL,
        "messages": [{"role": "user", "content": prompt}],
    }

    try:
        response = requests.post(
            f"{GATEWAY_URL}/chat/completions",
            headers=headers,
            json=payload,
            timeout=REQUEST_TIMEOUT,
        )
    except requests.RequestException as exc:
        session["result"] = {"status": "error", "body": f"Request failed: {exc}"}
        return redirect(url_for("index"))

    try:
        body = response.json()
    except ValueError:
        body = {"raw": response.text}

    content = None
    if response.ok:
        try:
            content = body["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError):
            content = None

    session["result"] = {
        "status": "ok" if response.ok else "error",
        "http_status": response.status_code,
        "content": content,
        "body": json.dumps(body, indent=2),
        "prompt": prompt,
    }
    return redirect(url_for("index"))


@app.route("/healthz")
def healthz():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))
