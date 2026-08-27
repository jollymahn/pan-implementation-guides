# Módulos

El lab está organizado en **8 módulos en 3 actos**. Construyes un pipeline de ML completo y después lo aseguras sistemáticamente.

Cada módulo se ejecuta de forma interactiva en Claude Code. Las descripciones a continuación cubren lo que aprenderás y harás: los retos prácticos, pistas y verificaciones suceden en vivo con tu mentor de IA.

---

## Acto 1: Constrúyelo

Construyes un pipeline de ML real desde cero. Al final del Acto 1, tendrás un chatbot asesor de ciberseguridad funcionando en Google Cloud: entrenado, fusionado, publicado y desplegado. Todavía no hay escaneos de seguridad. Eso es intencional.

### Módulo 0: Configuración del Entorno

Configura tu entorno de trabajo: proyecto GCP, GitHub CLI, credenciales de AIRS y la configuración de Claude Code. Esta es tu checklist de pre-vuelo.

**Objetivos:**
- Orientarte en el código y la estructura del pipeline de 3 gates
- Verificar la autenticación de GCP y la configuración del proyecto
- Configurar service accounts de IAM y Workload Identity Federation
- Configurar las credenciales de escaneo de AIRS como secrets del repositorio en GitHub
- Entender cómo `CLAUDE.md` configura a Claude Code como tu mentor

**Tiempo:** ~30 minutos | **Iniciar:** `/lab:module 0`

---

### Módulo 1: Fundamentos de ML y HuggingFace

Un módulo de investigación y exploración. No hay código que escribir: explorarás HuggingFace, evaluarás modelos, entenderás formatos de archivo y construirás el modelo mental necesario para el resto del lab.

**Objetivos:**
- Navegar HuggingFace y evaluar modelos para uso empresarial
- Entender pickle vs safetensors y por qué el formato importa para la seguridad
- Aprender conceptos de fine-tuning con LoRA (adapters, eficiencia de parámetros, costo)
- Comparar plataformas de ML (Vertex AI vs cómputo directo)

**Tiempo:** ~45 minutos | **Iniciar:** `/lab:module 1`

---

### Módulo 2: Entrena Tu Modelo

Dispara el Gate 1 para hacer fine-tuning de Qwen2.5-3B con datos de ciberseguridad NIST usando Vertex AI. Mientras el entrenamiento se ejecuta, estudiarás el proceso de merge que convierte un adapter LoRA en un modelo desplegable.

**Objetivos:**
- Entender el workflow del Gate 1 de training de principio a fin
- Personalizar parámetros de entrenamiento y disparar un job de training
- Entender la mecánica del merge de LoRA (`merge_adapter.py`)
- Verificar los artifacts de entrenamiento en GCS

**Tiempo:** ~30 minutos activos + tiempo de espera del training | **Iniciar:** `/lab:module 2`

---

### Módulo 3: Despliega y Sirve

Lleva tu modelo entrenado desde artifacts en GCS hasta una aplicación en vivo. Ejecuta Gate 2 (merge + publish) y Gate 3 (deploy), luego prueba tu asesor de ciberseguridad en el navegador.

**Objetivos:**
- Entender la arquitectura desacoplada (modelo en GPU, app en CPU)
- Ejecutar el pipeline completo de publicación y despliegue
- Probar tu aplicación en vivo con preguntas de ciberseguridad
- Articular la arquitectura completa e identificar la brecha de seguridad

**Tiempo:** ~30 minutos activos + tiempo de espera del deployment | **Iniciar:** `/lab:module 3`

> **Fin del Acto 1:**
> Acabas de desplegar un modelo a producción **sin ningún escaneo de seguridad**. Cualquiera podría haber manipulado el modelo base, envenenado los datos de entrenamiento o inyectado código malicioso. El pipeline funciona, pero no es seguro. Los Actos 2 y 3 arreglan eso.


---

## Pausa de Presentación

Sesión dirigida por el instructor cubriendo la propuesta de valor de AIRS, ataques reales a la cadena de suministro de modelos y escenarios de interacción con clientes. Se basa en todo lo que acabas de experimentar en el Acto 1.

> **Estudiantes en Workshop:**
> Esta es una **pausa obligatoria**. No avances al Módulo 4 hasta que el instructor reanude al grupo. Si terminas el Acto 1 antes, ayuda a tus compañeros o explora temas con más profundidad usando `/lab:explore`.


---

## Acto 2: Entiende la Seguridad

Una inmersión profunda en AIRS. Configurarás el acceso, ejecutarás tus primeros escaneos, explorarás la alianza con HuggingFace y construirás políticas de seguridad personalizadas.

### Módulo 4: Inmersión en AIRS

Pon las manos en AIRS Model Security. Activa el deployment profile, navega SCM, ejecuta escaneos a través del CLI y SDK, explora la integración con HuggingFace y entiende las políticas de security groups.

**Objetivos:**
- Activar AI Model Security en tu tenant de Prisma AIRS
- Navegar la consola de SCM (dashboard, escaneos, security groups)
- Ejecutar escaneos vía CLI y Python SDK
- Entender la alianza con HuggingFace y lo que AIRS agrega más allá de ella
- Configurar políticas de security groups (bloqueo vs alerta)

**Tiempo:** ~1-1.5 horas | **Iniciar:** `/lab:module 4`

---

## Acto 3: Asegúralo

Tomas todo lo que aprendiste y aseguras el pipeline que construiste en el Acto 1. Después exploras lo que AIRS detecta, lo que no detecta y cómo hablar honestamente con los clientes sobre ambas cosas.

### Módulo 5: Integración de AIRS al Pipeline

Agrega escaneo de AIRS a tu pipeline de CI/CD. Modifica Gate 2 para escanear después del merge, agrega verificación de manifest a Gate 3, etiqueta tus escaneos para trazabilidad y enriquece la salida del escaneo en GitHub Actions.

**Objetivos:**
- Agregar pasos de escaneo de AIRS al workflow de Gate 2
- Agregar verificación de manifest al workflow de Gate 3
- Implementar etiquetado de escaneos para trazabilidad pipeline-a-SCM
- Enriquecer los resultados de escaneo en los summaries de GitHub Actions

**Tiempo:** ~1-1.5 horas | **Iniciar:** `/lab:module 5`

---

### Módulo 6: El Zoológico de Amenazas

Construye modelos maliciosos y observa cómo AIRS los detecta. Crea pickle bombs, trampas Keras y exploits de formato, luego escanéalos y estudia los resultados de detección. Investiga incidentes reales para entender por qué esto importa.

**Objetivos:**
- Crear y escanear un pickle bomb (ejecución de código en runtime)
- Crear y escanear un exploit de Keras Lambda (ejecución de código al cargar)
- Comparar resultados de escaneo entre formatos de modelo (pickle vs safetensors)
- Investigar ataques reales a la cadena de suministro de modelos

**Tiempo:** ~1 hora | **Iniciar:** `/lab:module 6`

---

### Módulo 7: Brechas y Envenenamiento

Descubre lo que AIRS no puede detectar. Crea un dataset envenenado, entrena un modelo comprometido, demuestra que tanto los modelos limpios como los envenenados pasan el escaneo estructural, y aprende a enmarcar esto honestamente en conversaciones con clientes.

**Objetivos:**
- Entender la frontera entre seguridad estructural y comportamental
- Crear un dataset envenenado y entrenar un modelo comprometido
- Demostrar que los modelos envenenados pasan todos los escaneos de AIRS
- Articular una estrategia de defensa en profundidad para conversaciones con clientes

**Tiempo:** ~45 minutos - 1 hora | **Iniciar:** `/lab:module 7`
