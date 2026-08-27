# Guía de Configuración del Estudiante

Completa estos pasos antes de que inicie el lab. Al terminar, tendrás tu propia copia privada del repositorio del lab, las dependencias instaladas y Claude Code listo para usar.

---

## Configuración Pre-Lab

### Configura un Proyecto GCP vía Torque

Antes de tocar el pipeline, aprovisiona a través de Torque el proyecto GCP que usarás para el lab.

1. Navega a `https://laas.paloaltonetworks.com`.
2. Inicia sesión con el SSO empresarial.
3. Si no estás ya en la pestaña **Self-service**, haz clic en **Self-service**.
4. Haz clic en **Launch** bajo **"Create a GCP Project with Owner Permissions"**.
5. Establece el nombre de entorno que desees y configura la duración del entorno en **2 semanas**.
6. Haz clic en **Inputs**, configura **"Can this be replicated in an on-premise GCS lab (VM/Physical device)?"** en **No**, luego ingresa `GCS-PSO` en **Case or Project-Id**.
7. Haz clic en **Tags**, configura **activity_type** en `development` y **department** en `Technical_service`.
8. Haz clic en **Launch** hacia la parte inferior.

> **Nota:** Torque requiere la VPN de acceso corporativo. Conéctate antes de navegar a la URL.

Después de aproximadamente 7 minutos, recibirás un correo con la información de tu proyecto GCP. Ten estos valores a la mano; los necesitarás al editar `.github/pipeline-config.yaml` durante el Módulo 0.

---

### Configura tu Repositorio del Lab y Claude Code

#### Paso 1: Crea Tu Repo Privado desde el Template

1. Abre el repositorio template en tu navegador:

   ```
   https://github.com/airs-labs/prisma-airs-mlops-lab
   ```

2. Haz clic en el botón verde **"Use this template"** (arriba a la derecha, junto a "Code").

3. Selecciona **"Create a new repository"**.

4. Configura tu nuevo repo (ve la captura de pantalla abajo):
   - **Include all branches:** Actívalo **On** — esto es necesario para que obtengas tanto el branch `lab` (tu espacio de trabajo) como el branch `main` (soluciones de referencia)
   - **Owner:** Selecciona `airs-labs` (la organización del workshop)
   - **Repository name:** `<tu-nombre>-prisma-airs-mlops-lab` (ej. `syoungberg-prisma-airs-mlops-lab`)
   - **Visibility:** Selecciona **Private**

5. Haz clic en **"Create repository"**.

![Crear repo desde template](../lab-screenshots/create-repo-from-template.png)

> **¿Por qué privado?** Los GitHub Secrets tienen alcance por repositorio. Tu repo contendrá IDs de proyecto de GCP, credenciales de AIRS y configuraciones de despliegue específicas de tu entorno. Un fork público expondría todo esto.

---

#### Paso 2: Clona y Cambia al Branch del Lab

1. Clona tu nuevo repo privado:

   ```bash
   git clone https://github.com/airs-labs/<tu-nombre>-prisma-airs-mlops-lab.git
   cd <tu-nombre>-prisma-airs-mlops-lab
   ```

2. Cámbiate al branch `lab`:

   ```bash
   git checkout lab
   ```

   El branch `lab` es tu branch de trabajo. Tiene la estructura del pipeline pero el escaneo de AIRS aún no está integrado: eso es lo que vas a construir durante el workshop.

   El branch `main` contiene la implementación de referencia completa. Puedes comparar contra él en cualquier momento con `git diff lab..main`.

3. Instala las dependencias de Python:

   ```bash
   uv sync
   ```

   > Si no tienes `uv` instalado: `curl -LsSf https://astral.sh/uv/install.sh | sh` y reinicia tu terminal.

---

#### Paso 3: Inicia Claude Code

1. Abre Claude Code en el directorio del repo:

   ```bash
   claude
   ```

   Claude ha sido preconfigurado como tu mentor del lab a través del archivo `CLAUDE.md` en la raíz del repo. Conoce el código, adapta el ritmo de sus explicaciones y usa preguntas socráticas para guiarte.

2. Inicia el lab escribiendo:

   ```
   /lab:module 0
   ```

   El Módulo 0 te guía para verificar tu proyecto de GCP, GitHub CLI y credenciales de AIRS. Claude también te ayudará a conectar tu repo al template para recibir actualizaciones del instructor.

---

## Referencia Rápida

| Comando | Qué Hace |
|---------|----------|
| `/lab:module N` | Iniciar o retomar el módulo N |
| `/lab:verify-N` | Ejecutar verificaciones del módulo N |
| `/lab:hint` | Obtener una pista progresiva para tu reto actual |
| `/lab:explore TEMA` | Inmersión en un concepto |
| `/lab:quiz` | Evaluar tu comprensión |
| `/lab:progress` | Ver tu dashboard de progreso |

---

## Retomar el Trabajo entre Sesiones

Cuando regreses al lab después de cerrar tu terminal o al día siguiente:

### Paso 1: Descarga Actualizaciones del Instructor

Antes de iniciar Claude Code, descarga cualquier cambio que el instructor haya publicado. Abre una terminal en el directorio de tu repo y pega este prompt en Claude:

```bash
cd <tu-nombre>-prisma-airs-mlops-lab
claude
```

```
Revisa si tengo un remote "upstream" apuntando a airs-labs/prisma-airs-mlops-lab.
Si no, agrégalo. Luego haz fetch de upstream y merge de upstream/lab en mi branch actual.
Si hay conflictos de merge en lab/.progress.json o .github/pipeline-config.yaml,
quédate con mi versión (--ours) ya que tienen mi configuración personal. Para todo lo demás,
toma la versión de upstream (--theirs).
```

Claude manejará los comandos de git y resolverá cualquier conflicto automáticamente.

### Paso 2: Reinicia Tu Sesión del Lab

Si los cambios de upstream actualizaron `CLAUDE.md` o archivos del lab, Claude necesita cargar esos cambios. Sal y reinicia Claude Code para que lea las instrucciones más recientes:

```
/exit
```

```bash
claude
```

### Paso 3: Continúa Donde Te Quedaste

Tu progreso se guarda en `lab/.progress.json`, así que Claude sabe exactamente dónde vas. Ejecuta:

```
/lab:progress
```

Esto muestra tu dashboard de progreso: qué módulos están completados, tus puntos y cualquier blocker. Luego retoma tu módulo actual:

```
/lab:module N
```

Reemplaza `N` con el módulo en el que estabas. Claude leerá tu archivo de progreso y continuará desde donde te quedaste.

> **¿Por qué no /resume?:**
> `/resume` recupera tu conversación anterior pero mantiene las instrucciones antiguas de `CLAUDE.md`. Después de descargar actualizaciones del instructor, una sesión nueva asegura que Claude trabaje con el contenido más reciente del lab. Tu progreso no se pierde; todo está en `.progress.json`.


> **Pasos manuales (si prefieres hacerlo tú mismo):**
>
> **Agregar el remote upstream (solo la primera vez):**
>
```bash
git remote add upstream https://github.com/airs-labs/prisma-airs-mlops-lab.git
```
>
> **Descargar cambios:**
>
```bash
git fetch upstream
git merge upstream/lab --no-edit
```
>
> **Si tienes un conflicto de merge en `lab/.progress.json` o `.github/pipeline-config.yaml`**, quédate con tu versión (tienen tu configuración personal):
>
```bash
git checkout --ours lab/.progress.json .github/pipeline-config.yaml
git add lab/.progress.json .github/pipeline-config.yaml
git commit --no-edit
```
>
> Para conflictos en otros archivos (guías del lab, código, workflows), toma la versión del instructor:
>
```bash
git checkout --theirs ruta/al/archivo
git add ruta/al/archivo
git commit --no-edit
```


---

## Solución de Problemas

| Problema | Solución |
|----------|----------|
| No se ve el botón "Use this template" | Asegúrate de haber iniciado sesión en GitHub y que te hayan agregado a la organización `airs-labs` |
| El branch `lab` no existe después del clone | No activaste "Include all branches" al crear el template — borra el repo, recréalo con el toggle activado |
| `uv: command not found` | Instala uv: `curl -LsSf https://astral.sh/uv/install.sh \| sh` y reinicia tu terminal |
| `claude: command not found` | Instala Claude Code: `npm install -g @anthropic-ai/claude-code` |
| Claude no parece saber del lab | Asegúrate de estar en el directorio del repo y en el branch `lab` — Claude lee `CLAUDE.md` desde la raíz del repo |
| Conflicto de merge en `lab/.progress.json` | Quédate con tu versión: `git checkout --ours lab/.progress.json && git add lab/.progress.json && git commit --no-edit` |
| No se encuentra el remote `upstream` | Agrégalo: `git remote add upstream https://github.com/airs-labs/prisma-airs-mlops-lab.git` |

**[Siguiente: Módulos del Lab &rarr;](modules.md)**
