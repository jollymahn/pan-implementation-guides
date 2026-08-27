# Como o Lab Funciona

Este lab é construído ao redor do **Claude Code** como seu parceiro de desenvolvimento com IA. Você não copia e cola comandos de um PDF: você trabalha de forma interativa com um mentor de IA que conhece o código, adapta o ritmo de ensino e se ajusta ao seu progresso.

## Claude Code como Seu Mentor

O Claude foi configurado (via `CLAUDE.md` na raiz do repo) especificamente para este lab. Ele vai:

- **Ensinar um conceito por vez** e verificar sua compreensão antes de avançar
- **Fazer perguntas, não dar aulas** — método socrático do início ao fim
- **Executar comandos por você** e explicar o que aconteceu — você aprende o raciocínio, não a sintaxe
- **Dar dicas progressivas** quando você travar:
  1. **Dica conceitual** — no que você deveria estar pensando
  2. **Dica de abordagem** — como chegar lá
  3. **Dica específica** — exatamente o que fazer
- **Mostrar código real do projeto** em vez de exemplos abstratos

### Suporte a Idiomas

O Claude suporta o lab no seu idioma nativo. Se você escrever em português, espanhol ou outro idioma, o Claude responderá automaticamente nesse idioma. Termos técnicos (pipeline, endpoint, scan, AIRS, IAM, etc.) permanecem em inglês por serem padrão na indústria. As respostas dos quizzes são avaliadas por conceitos, não por idioma: responda no idioma em que se sentir mais confortável.

> **Experimental:**
> O suporte multilíngue é nativo mas ainda não foi testado extensivamente em todos os módulos. O inglês é o idioma principal. Se encontrar algum problema em outro idioma, avise seu instrutor.


### Comandos

Tudo é executado através de slash commands do Claude Code:

| Comando | Finalidade |
|---------|------------|
| `/lab:module N` | Iniciar ou retomar o módulo N |
| `/lab:verify-N` | Executar verificações do módulo N |
| `/lab:hint` | Obter uma dica progressiva para seu desafio atual |
| `/lab:explore TEMA` | Mergulho guiado em um conceito |
| `/lab:quiz` | Testar sua compreensão |
| `/lab:progress` | Ver seu dashboard de progresso |

---

## Pontuação e Leaderboard

Seu progresso é rastreado e pontuado durante todo o lab. Os pontos vêm de duas fontes:

### Verificações Técnicas

Cada módulo tem etapas de verificação concretas que o Claude executa contra sua infraestrutura real. Elas verificam coisas como: Seu projeto GCP está configurado? O job de treinamento gerou resultados? Sua aplicação está implantada e respondendo? Você ganha pontos quando as verificações reais passam: não por auto-relato.

### Perguntas de Compreensão

Ao completar os desafios de um módulo, o Claude faz perguntas de compreensão para avaliar seu entendimento. São pontuadas de 0-3 por pergunta:

| Pontos | Significado |
|--------|-------------|
| 3 | Resposta completa e precisa |
| 2 | Quase toda correta, com pequenas lacunas |
| 1 | Precisou de dicas para chegar à resposta |
| 0 | Não conseguiu responder |

### Bônus por Colaboração

Instrutores podem conceder pontos extras durante os intervalos de discussão:

| Bônus | Pontos | Como |
|-------|--------|------|
| Bônus de Ensino | +2 | Explicou um conceito para um colega |
| Bônus de Descoberta | +2 | Encontrou um problema ou insight não documentado |
| Melhor Pergunta | +1 | Fez uma pergunta particularmente perspicaz |

### Pontos por Módulo

| Módulo | Técnicos | Compreensão | Máximo |
|--------|----------|-------------|--------|
| 0: Configuração do Ambiente | 14 | 8 | 22 |
| 1: Fundamentos de ML | — | 9 | 9 |
| 2: Treine Seu Modelo | 2 | 6 | 8 |
| 3: Implante e Sirva | 4 | 6 | 10 |
| 4: Mergulho no AIRS | 8 | 6 | 14 |
| 5: Integração ao Pipeline | 10 | 3 | 13 |
| 6: O Zoológico de Ameaças | 6 | 6 | 12 |
| 7: Lacunas e Envenenamento | 6 | 6 | 12 |
| **Total** | **50** | **50** | **100** |

> **Estudantes em workshop:**
> Cenários de workshop incluem 2 pontos adicionais no Módulo 0 (configuração do upstream remote e verificação do nome do projeto) para um máximo possível de 100 pontos. Cenários no seu próprio ritmo têm teto de 98.


### Leaderboard

Após cada `/lab:verify-N`, sua pontuação é publicada automaticamente no leaderboard ao vivo. Você pode ver sua posição em relação aos outros participantes em tempo real.

O leaderboard rastreia:
- Pontos totais em todos os módulos
- Número de módulos completados
- Pontuações individuais por módulo

---

## Ritmo e Paradas Obrigatórias

### Ritmo do Workshop

O lab é projetado para **~4 horas** de trabalho ativo, dividido em duas sessões com uma pausa de apresentação entre elas.

> **Paradas Obrigatórias:**
> Em cenários de workshop, existem **paradas obrigatórias** após o Módulo 3 e opcionalmente após o Módulo 4. Quando você chegar a uma parada obrigatória, o Claude vai avisar. Você não pode avançar para o próximo módulo até o instrutor retomar com o grupo.
>
> **Por quê?** A apresentação do AIRS conduzida pelo instrutor entre os Atos 1 e 2 se baseia no que você acabou de experienciar. Se metade da turma já se adiantou, a discussão perde contexto e todos saem prejudicados.


### Se Você Terminar Antes

**Ajude os outros.** Isso é colaborativo, não apenas competitivo. O Bônus de Ensino (+2 pts) e o Bônus de Descoberta (+2 pts) recompensam exatamente esse comportamento.

Vá até alguém que esteja travado. Explique o que você descobriu. Você vai reforçar seu próprio entendimento e ganhar pontos extras.

### Se Você Estiver Ficando Para Trás

O leaderboard atualiza ao vivo. Se perceber que você é um dos últimos a completar um módulo, acelere o passo. Tudo bem se aprofundar em tópicos interessantes com o Claude: isso é ótimo aprendizado: mas fique atento ao tempo do grupo.

> **Orçamento de tempo:**
> | Ato | Módulos | Tempo Estimado |
> |-----|---------|----------------|
> | Ato 1: Construa | 0, 1, 2, 3 | ~3-4 horas |
> | *Pausa de Apresentação* | -- | ~30-45 min |
> | Ato 2: Entenda a Segurança | 4 | ~1-1.5 horas |
> | Ato 3: Proteja | 5, 6, 7 | ~2.5-3.5 horas |


### Hard Blockers

Alguns problemas de configuração no Módulo 0 são **hard blockers**: se seu projeto GCP não estiver acessível ou as credenciais do AIRS não estiverem configuradas, os módulos seguintes estarão bloqueados. `/lab:verify-0` detecta esses problemas cedo. Não pule essa etapa.

Se encontrar um hard blocker, o Claude vai avisar claramente e adicioná-lo ao seu arquivo de progresso. Você pode continuar participando de discussões e exploração de conceitos, mas os desafios técnicos que dependam do recurso bloqueado não vão funcionar.

---

## Cenários

Quando você inicia o lab pela primeira vez, o Claude pergunta em qual cenário você está:

| Cenário | Paradas Obrigatórias | Leaderboard | Para |
|---------|---------------------|-------------|------|
| **TS Workshop** | Sim | Sim | Workshop presencial de Technical Services |
| **TS Self-Paced** | Não | Sim | Aprendizado no seu ritmo de TS |
| **Internal** | Não | Não | Outros times internos |
| **Public** | Não | Não | Aprendizado autoguiado |

Seu cenário determina as regras de ritmo, se as paradas obrigatórias são aplicadas e se suas pontuações são publicadas no leaderboard. O Claude cuida de tudo isso automaticamente com base na sua seleção durante o onboarding.

**[Próximo: Configuração do Estudante &rarr;](student-setup.md)**
