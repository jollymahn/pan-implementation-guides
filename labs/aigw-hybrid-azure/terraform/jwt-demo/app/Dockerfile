FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY templates/ ./templates/

RUN useradd --create-home --uid 10001 appuser
USER appuser

EXPOSE 5000

# One worker keeps the Flask session, and therefore the access token, on a
# single process. The lab has one user.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--timeout", "90", "app:app"]
