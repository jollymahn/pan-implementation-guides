# Módulos

O lab está organizado em **8 módulos em 3 atos**. Você constrói um pipeline de ML completo e depois o protege sistematicamente.

Cada módulo é executado de forma interativa no Claude Code. As descrições abaixo cobrem o que você vai aprender e fazer: os desafios práticos, dicas e verificações acontecem ao vivo com seu mentor de IA.

---

## Ato 1: Construa

Você constrói um pipeline de ML real do zero. No final do Ato 1, você terá um chatbot consultor de cibersegurança funcionando no Google Cloud: treinado, fundido, publicado e implantado. Ainda não há escaneamentos de segurança. Isso é intencional.

### Módulo 0: Configuração do Ambiente

Configure seu ambiente de trabalho: projeto GCP, GitHub CLI, credenciais do AIRS e a configuração do Claude Code. Este é seu checklist de pré-voo.

**Objetivos:**
- Orientar-se no código e na estrutura do pipeline de 3 gates
- Verificar a autenticação do GCP e a configuração do projeto
- Configurar service accounts de IAM e Workload Identity Federation
- Configurar as credenciais de escaneamento do AIRS como secrets do repositório no GitHub
- Entender como o `CLAUDE.md` configura o Claude Code como seu mentor

**Tempo:** ~30 minutos | **Iniciar:** `/lab:module 0`

---

### Módulo 1: Fundamentos de ML e HuggingFace

Um módulo de pesquisa e exploração. Não há código para escrever: você vai explorar o HuggingFace, avaliar modelos, entender formatos de arquivo e construir o modelo mental necessário para o resto do lab.

**Objetivos:**
- Navegar pelo HuggingFace e avaliar modelos para uso empresarial
- Entender pickle vs safetensors e por que o formato importa para a segurança
- Aprender conceitos de fine-tuning com LoRA (adapters, eficiência de parâmetros, custo)
- Comparar plataformas de ML (Vertex AI vs computação direta)

**Tempo:** ~45 minutos | **Iniciar:** `/lab:module 1`

---

### Módulo 2: Treine Seu Modelo

Dispare o Gate 1 para fazer fine-tuning do Qwen2.5-3B com dados de cibersegurança NIST usando Vertex AI. Enquanto o treinamento executa, você vai estudar o processo de merge que transforma um adapter LoRA em um modelo implantável.

**Objetivos:**
- Entender o workflow do Gate 1 de treinamento de ponta a ponta
- Personalizar parâmetros de treinamento e disparar um job de treinamento
- Entender a mecânica do merge de LoRA (`merge_adapter.py`)
- Verificar os artifacts de treinamento no GCS

**Tempo:** ~30 minutos ativos + tempo de espera do treinamento | **Iniciar:** `/lab:module 2`

---

### Módulo 3: Implante e Sirva

Leve seu modelo treinado de artifacts no GCS até uma aplicação ao vivo. Execute Gate 2 (merge + publish) e Gate 3 (deploy), depois teste seu consultor de cibersegurança no navegador.

**Objetivos:**
- Entender a arquitetura desacoplada (modelo em GPU, app em CPU)
- Executar o pipeline completo de publicação e implantação
- Testar sua aplicação ao vivo com perguntas de cibersegurança
- Articular a arquitetura completa e identificar a brecha de segurança

**Tempo:** ~30 minutos ativos + tempo de espera da implantação | **Iniciar:** `/lab:module 3`

> **Fim do Ato 1:**
> Você acabou de implantar um modelo em produção **sem nenhum escaneamento de segurança**. Qualquer pessoa poderia ter manipulado o modelo base, envenenado os dados de treinamento ou injetado código malicioso. O pipeline funciona, mas não é seguro. Os Atos 2 e 3 resolvem isso.


---

## Pausa de Apresentação

Sessão conduzida pelo instrutor cobrindo a proposta de valor do AIRS, ataques reais à cadeia de suprimentos de modelos e cenários de engajamento com clientes. Isso se baseia em tudo que você acabou de experienciar no Ato 1.

> **Estudantes em Workshop:**
> Esta é uma **parada obrigatória**. Não avance para o Módulo 4 até o instrutor retomar com o grupo. Se terminar o Ato 1 antes, ajude seus colegas ou explore temas com mais profundidade usando `/lab:explore`.


---

## Ato 2: Entenda a Segurança

Um mergulho profundo no AIRS. Você vai configurar o acesso, executar seus primeiros escaneamentos, explorar a parceria com o HuggingFace e construir políticas de segurança personalizadas.

### Módulo 4: Mergulho no AIRS

Coloque a mão na massa com o AIRS Model Security. Ative o deployment profile, navegue pelo SCM, execute escaneamentos através do CLI e SDK, explore a integração com o HuggingFace e entenda as políticas de security groups.

**Objetivos:**
- Ativar AI Model Security no seu tenant de Prisma AIRS
- Navegar pelo console do SCM (dashboard, escaneamentos, security groups)
- Executar escaneamentos via CLI e Python SDK
- Entender a parceria com o HuggingFace e o que o AIRS adiciona além dela
- Configurar políticas de security groups (bloqueio vs alerta)

**Tempo:** ~1-1.5 horas | **Iniciar:** `/lab:module 4`

---

## Ato 3: Proteja

Você pega tudo o que aprendeu e protege o pipeline que construiu no Ato 1. Depois explora o que o AIRS detecta, o que não detecta e como falar honestamente com os clientes sobre ambos.

### Módulo 5: Integração do AIRS ao Pipeline

Adicione escaneamento do AIRS ao seu pipeline de CI/CD. Modifique o Gate 2 para escanear após o merge, adicione verificação de manifest ao Gate 3, rotule seus escaneamentos para rastreabilidade e enriqueça a saída do escaneamento no GitHub Actions.

**Objetivos:**
- Adicionar etapas de escaneamento do AIRS ao workflow do Gate 2
- Adicionar verificação de manifest ao workflow do Gate 3
- Implementar rotulação de escaneamentos para rastreabilidade pipeline-para-SCM
- Enriquecer os resultados de escaneamento nos summaries do GitHub Actions

**Tempo:** ~1-1.5 horas | **Iniciar:** `/lab:module 5`

---

### Módulo 6: O Zoológico de Ameaças

Construa modelos maliciosos e veja o AIRS detectá-los. Crie pickle bombs, armadilhas Keras e exploits de formato, depois escaneie e estude os resultados de detecção. Pesquise incidentes reais para entender por que isso importa.

**Objetivos:**
- Criar e escanear um pickle bomb (execução de código em runtime)
- Criar e escanear um exploit de Keras Lambda (execução de código ao carregar)
- Comparar resultados de escaneamento entre formatos de modelo (pickle vs safetensors)
- Pesquisar ataques reais à cadeia de suprimentos de modelos

**Tempo:** ~1 hora | **Iniciar:** `/lab:module 6`

---

### Módulo 7: Lacunas e Envenenamento

Descubra o que o AIRS não consegue detectar. Crie um dataset envenenado, treine um modelo comprometido, prove que tanto os modelos limpos quanto os envenenados passam pelo escaneamento estrutural, e aprenda a enquadrar isso honestamente em conversas com clientes.

**Objetivos:**
- Entender a fronteira entre segurança estrutural e comportamental
- Criar um dataset envenenado e treinar um modelo comprometido
- Demonstrar que modelos envenenados passam em todos os escaneamentos do AIRS
- Articular uma estratégia de defesa em profundidade para conversas com clientes

**Tempo:** ~45 minutos - 1 hora | **Iniciar:** `/lab:module 7`
