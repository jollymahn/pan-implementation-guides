# Cómo Funciona el Lab

Este lab está construido alrededor de **Claude Code** como tu compañero de desarrollo con IA. No copias y pegas comandos de un PDF: trabajas de forma interactiva con un mentor de IA que conoce el código, adapta el ritmo de enseñanza y se ajusta a tu progreso.

## Claude Code como Tu Mentor

Claude ha sido configurado (a través de `CLAUDE.md` en la raíz del repo) específicamente para este lab. Lo que hará:

- **Enseñar un concepto a la vez** y verificar tu comprensión antes de avanzar
- **Hacer preguntas, no dar clases** — método socrático de principio a fin
- **Ejecutar comandos por ti** y explicar lo que pasó — aprendes el razonamiento, no la sintaxis
- **Dar pistas progresivas** cuando te atores:
  1. **Pista conceptual** — en qué deberías estar pensando
  2. **Pista de enfoque** — cómo llegar ahí
  3. **Pista específica** — exactamente qué hacer
- **Mostrar código real del proyecto** en lugar de ejemplos abstractos

### Soporte de Idiomas

Claude soporta el lab en tu idioma nativo. Si escribes en español, portugués u otro idioma, Claude te responderá automáticamente en ese idioma. Los términos técnicos (pipeline, endpoint, scan, AIRS, IAM, etc.) se mantienen en inglés porque son estándar en la industria. Las respuestas de los quizzes se evalúan por conceptos, no por idioma: responde en el idioma que te sea más cómodo.

> **Experimental:**
> El soporte multilingüe está integrado pero aún no ha sido probado extensamente en todos los módulos. El inglés es el idioma principal. Si encuentras algún problema en otro idioma, avísale a tu instructor.


### Comandos

Todo se ejecuta a través de slash commands de Claude Code:

| Comando | Propósito |
|---------|-----------|
| `/lab:module N` | Iniciar o retomar el módulo N |
| `/lab:verify-N` | Ejecutar verificaciones del módulo N |
| `/lab:hint` | Obtener una pista progresiva para tu reto actual |
| `/lab:explore TEMA` | Inmersión guiada en un concepto |
| `/lab:quiz` | Evaluar tu comprensión |
| `/lab:progress` | Ver tu dashboard de progreso |

---

## Puntuación y Leaderboard

Tu progreso se rastrea y puntúa durante todo el lab. Los puntos vienen de dos fuentes:

### Verificaciones Técnicas

Cada módulo tiene pasos de verificación concretos que Claude ejecuta contra tu infraestructura real. Verifican cosas como: ¿Está configurado tu proyecto de GCP? ¿El job de training generó resultados? ¿Tu app está desplegada y respondiendo? Ganas puntos cuando las verificaciones reales pasan: no por auto-reporte.

### Preguntas de Comprensión

Al completar los retos de un módulo, Claude te hace preguntas de comprensión para evaluar tu entendimiento. Se califican de 0-3 por pregunta:

| Puntos | Significado |
|--------|-------------|
| 3 | Respuesta completa y precisa |
| 2 | Mayormente correcta, con detalles menores faltantes |
| 1 | Necesitó pistas para llegar a la respuesta |
| 0 | No pudo responder |

### Bonos por Colaboración

Los instructores pueden otorgar puntos extra durante los descansos de discusión:

| Bono | Puntos | Cómo |
|------|--------|------|
| Bono de Enseñanza | +2 | Explicaste un concepto a un compañero |
| Bono de Descubrimiento | +2 | Encontraste un problema o hallazgo no documentado |
| Mejor Pregunta | +1 | Hiciste una pregunta particularmente perspicaz |

### Puntos por Módulo

| Módulo | Técnicos | Comprensión | Máximo |
|--------|----------|-------------|--------|
| 0: Configuración del Entorno | 14 | 8 | 22 |
| 1: Fundamentos de ML | — | 9 | 9 |
| 2: Entrena Tu Modelo | 2 | 6 | 8 |
| 3: Despliega y Sirve | 4 | 6 | 10 |
| 4: Inmersión en AIRS | 8 | 6 | 14 |
| 5: Integración al Pipeline | 10 | 3 | 13 |
| 6: El Zoológico de Amenazas | 6 | 6 | 12 |
| 7: Brechas y Envenenamiento | 6 | 6 | 12 |
| **Total** | **50** | **50** | **100** |

> **Estudiantes en workshop:**
> Los escenarios de workshop incluyen 2 puntos adicionales en el Módulo 0 (configuración de upstream remote y verificación del nombre del proyecto) para un máximo posible de 100 puntos. Los escenarios a tu propio ritmo tienen un tope de 98.


### Leaderboard

Después de cada `/lab:verify-N`, tu puntuación se publica automáticamente en el leaderboard en vivo. Puedes ver tu posición en relación con otros participantes en tiempo real.

El leaderboard rastrea:
- Puntos totales en todos los módulos
- Número de módulos completados
- Puntuaciones individuales por módulo

---

## Ritmo y Pausas Obligatorias

### Ritmo del Workshop

El lab está diseñado para **~4 horas** de trabajo activo, dividido en dos sesiones con una pausa de presentación entre ellas.

> **Pausas Obligatorias:**
> En escenarios de workshop, hay **pausas obligatorias** después del Módulo 3 y opcionalmente después del Módulo 4. Cuando llegues a una pausa obligatoria, Claude te lo indicará. No puedes avanzar al siguiente módulo hasta que el instructor reanude al grupo.
>
> **¿Por qué?** La presentación de AIRS dirigida por el instructor entre los Actos 1 y 2 se basa en lo que acabas de experimentar. Si la mitad de la clase ya se adelantó, la discusión pierde contexto y todos salen perjudicados.


### Si Terminas Antes

**Ayuda a los demás.** Esto es colaborativo, no solo competitivo. El Bono de Enseñanza (+2 pts) y el Bono de Descubrimiento (+2 pts) recompensan exactamente este comportamiento.

Acércate a alguien que esté atorado. Explícale lo que descubriste. Vas a reforzar tu propio entendimiento y ganar puntos extra.

### Si Te Estás Atrasando

El leaderboard se actualiza en vivo. Si notas que eres de los últimos en completar un módulo, acelera el paso. Está bien profundizar en temas interesantes con Claude: eso es excelente aprendizaje: pero sé consciente del tiempo del grupo.

> **Presupuesto de tiempo:**
> | Acto | Módulos | Tiempo Estimado |
> |------|---------|-----------------|
> | Acto 1: Constrúyelo | 0, 1, 2, 3 | ~3-4 horas |
> | *Pausa de Presentación* | -- | ~30-45 min |
> | Acto 2: Entiende la Seguridad | 4 | ~1-1.5 horas |
> | Acto 3: Asegúralo | 5, 6, 7 | ~2.5-3.5 horas |


### Hard Blockers

Algunos problemas de configuración en el Módulo 0 son **hard blockers**: si tu proyecto de GCP no es accesible o las credenciales de AIRS no están configuradas, los módulos posteriores estarán bloqueados. `/lab:verify-0` detecta estos problemas temprano. No te lo saltes.

Si encuentras un hard blocker, Claude te avisará claramente y lo agregará a tu archivo de progreso. Puedes seguir participando en discusiones y exploración de conceptos, pero los retos técnicos que dependan del recurso bloqueado no funcionarán.

---

## Escenarios

Cuando inicias el lab por primera vez, Claude te pregunta en qué escenario estás:

| Escenario | Pausas Obligatorias | Leaderboard | Para |
|-----------|-------------------|-------------|------|
| **TS Workshop** | Sí | Sí | Workshop presencial de Technical Services |
| **TS Self-Paced** | No | Sí | Aprendizaje a tu ritmo de TS |
| **Internal** | No | No | Otros equipos internos |
| **Public** | No | No | Aprendizaje autoguiado |

Tu escenario determina las reglas de ritmo, si las pausas obligatorias se aplican y si tus puntuaciones se publican en el leaderboard. Claude maneja todo esto automáticamente según tu selección durante el onboarding.

**[Siguiente: Configuración del Estudiante &rarr;](student-setup.md)**
