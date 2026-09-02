/* =====================================================================
   HUMAN. Hub de ExperiÃªncia e Bem-estar do Colaborador
   data.js. Base de conteÃºdo (dados fictÃ­cios / projeto conceitual)

   Estrutura de um item de hub:
   { id, icon, kind: "pratica" | "conteudo" | "recurso",
     type, minutes, title, text, points: [], cta }
   ===================================================================== */

window.HUMAN_DATA = {

  /* ---------------------------------------------------------------
     MARCA
     --------------------------------------------------------------- */
  brand: {
    name: "HUMAN",
    concept: "Tecnologia como meio. Cuidado como propÃ³sito.",
    purpose: "Um sÃ³ lugar para encontrar o que a empresa jÃ¡ oferece, organizado pelo que vocÃª precisa.",
    disclaimer: "O HUMAN informa e direciona. NÃ£o realiza diagnÃ³sticos e nÃ£o substitui atendimento profissional."
  },

  /* ---------------------------------------------------------------
     JORNADAS. "O que vocÃª precisa hoje?"
     --------------------------------------------------------------- */
  needs: [
    { id: "pausa",      label: "Quero fazer uma pausa",        hint: "Autocuidado em poucos minutos", route: "#/pausa",              icon: "clock" },
    { id: "corpo",      label: "Quero me movimentar",          hint: "Movimento e ergonomia",         route: "#/dimensao/corpo",     icon: "body" },
    { id: "aprender",   label: "Quero aprender algo",          hint: "ConteÃºdos e plataformas",       route: "#/dimensao/aprender",  icon: "learn" },
    { id: "beneficios", label: "Quero conhecer meus benefÃ­cios", hint: "O que existe e como acessar", route: "#/beneficios",         icon: "gift" },
    { id: "conexoes",   label: "Quero me conectar",            hint: "Pessoas e reconhecimento",      route: "#/dimensao/conexoes",  icon: "connect" },
    { id: "apoio",      label: "Preciso encontrar apoio",      hint: "Canais da empresa",             route: "#/apoio",              icon: "shield", quiet: true }
  ],

  /* ---------------------------------------------------------------
     DIMENSÃ•ES
     --------------------------------------------------------------- */
  dimensions: [
    { id: "mente",      name: "Mente",             tagline: "Pausas, foco e apoio",        icon: "mind",    count: "13 recursos" },
    { id: "corpo",      name: "Corpo",             tagline: "Movimento e ergonomia",       icon: "body",    count: "14 recursos" },
    { id: "conexoes",   name: "ConexÃµes",          tagline: "Pessoas e pertencimento",     icon: "connect", count: "12 recursos" },
    { id: "beneficios", name: "Meus BenefÃ­cios",   tagline: "Tudo em um sÃ³ lugar",         icon: "gift",    count: "18 benefÃ­cios", route: "#/beneficios" },
    { id: "aprender",   name: "Aprender",          tagline: "ConteÃºdo e desenvolvimento",  icon: "learn",   count: "13 recursos" },
    { id: "pausa",      name: "5 Minutos Para Mim", tagline: "VocÃª escolhe o tempo",       icon: "clock",   count: "16 sugestÃµes", route: "#/pausa" }
  ],

  /* =================================================================
     HUBS
     ================================================================= */
  hubs: {

    /* ---------------------- MENTE ---------------------- */
    mente: {
      icon: "mind",
      title: "Cuide da mente no seu ritmo",
      lead: "Escolha por onde comeÃ§ar hoje.",
      stats: [
        { v: "4", k: "pausas rÃ¡pidas" },
        { v: "5", k: "conteÃºdos" },
        { v: "24h", k: "canal de apoio" }
      ],
      blocks: [
        {
          id: "pausa",
          label: "Preciso de uma pausa",
          icon: "clock",
          hint: "PrÃ¡ticas guiadas para fazer agora",
          layout: "action",
          items: [
            {
              id: "m1", icon: "breath", kind: "pratica", type: "RespiraÃ§Ã£o", minutes: 2,
              title: "RespiraÃ§Ã£o de 2 minutos",
              text: "Um ciclo curto para desacelerar antes da prÃ³xima reuniÃ£o.",
              points: ["Inspire por 4 tempos", "Segure por 4 tempos", "Expire por 6 tempos", "Repita cinco vezes"],
              cta: "ComeÃ§ar"
            },
            {
              id: "m2", icon: "eye", kind: "pratica", type: "Pausa visual", minutes: 2,
              title: "Pausa da tela",
              text: "AlÃ­vio rÃ¡pido para os olhos em dias de reuniÃ£o atrÃ¡s de reuniÃ£o.",
              points: ["Olhe para um ponto distante por 20 segundos", "Pisque devagar dez vezes", "Solte a mandÃ­bula e os ombros"],
              cta: "ComeÃ§ar"
            },
            {
              id: "m3", icon: "target", kind: "pratica", type: "Foco", minutes: 5,
              title: "ExercÃ­cio rÃ¡pido de foco",
              text: "Tire da cabeÃ§a o que estÃ¡ ocupando espaÃ§o.",
              points: ["Escreva tudo o que estÃ¡ pendente", "Circule o que depende sÃ³ de vocÃª", "Escolha uma Ãºnica tarefa para agora"],
              cta: "ComeÃ§ar"
            },
            {
              id: "m4", icon: "list", kind: "pratica", type: "OrganizaÃ§Ã£o", minutes: 10,
              title: "Organizar os prÃ³ximos 10 minutos",
              text: "Um plano curto vale mais que uma lista longa.",
              points: ["Feche as abas que nÃ£o vai usar", "Defina uma entrega pequena", "Silencie notificaÃ§Ãµes atÃ© terminar"],
              cta: "ComeÃ§ar"
            }
          ]
        },
        {
          id: "entender",
          label: "Quero entender melhor",
          icon: "book",
          hint: "ConteÃºdos curtos, sem linguagem clÃ­nica",
          layout: "content",
          items: [
            { id: "m5", icon: "alert", kind: "conteudo", type: "Artigo", minutes: 6, title: "Como reconhecer sinais de sobrecarga", text: "Sinais que aparecem antes do esgotamento.", points: ["Sinais fÃ­sicos, mentais e de comportamento", "O que costuma passar despercebido", "Primeiros passos possÃ­veis"], cta: "Ler" },
            { id: "m6", icon: "shieldCheck", kind: "conteudo", type: "Guia", minutes: 5, title: "Limites na rotina de trabalho", text: "Como combinar disponibilidade sem culpa.", points: ["Acordos simples com o time", "O que dizer quando o pedido chega tarde", "Modelos de resposta prontos"], cta: "Abrir guia" },
            { id: "m7", icon: "chat", kind: "conteudo", type: "Roteiro", minutes: 4, title: "Conversar com a lideranÃ§a sobre demandas", text: "Um roteiro para uma conversa difÃ­cil.", points: ["Como abrir o assunto", "Dados que ajudam a sustentar o ponto", "Como propor um prÃ³ximo passo"], cta: "Abrir roteiro" },
            { id: "m8", icon: "clock", kind: "conteudo", type: "Artigo", minutes: 5, title: "A importÃ¢ncia das pausas", text: "Por que parar melhora o resultado.", points: ["O que acontece com a atenÃ§Ã£o sem intervalo", "FrequÃªncia que funciona na prÃ¡tica", "Como encaixar pausas na agenda"], cta: "Ler" },
            { id: "m9", icon: "moon", kind: "conteudo", type: "Podcast", minutes: 18, title: "Sono e produtividade", text: "Conversa sobre descanso e desempenho.", points: ["Rotina de desligamento", "Luz, cafeÃ­na e horÃ¡rios", "O que muda em times de fusos diferentes"], cta: "Ouvir" }
          ]
        }
      ],
      support: {
        title: "VocÃª nÃ£o precisa encontrar tudo sozinho.",
        text: "Estes canais sÃ£o confidenciais e nÃ£o passam pela sua lideranÃ§a.",
        items: [
          { icon: "heart",   name: "Apoio psicolÃ³gico",   how: "Aplicativo do plano de saÃºde" },
          { icon: "cross",   name: "Plano de saÃºde",      how: "Carteirinha digital e rede credenciada" },
          { icon: "phone",   name: "Canal de acolhimento", how: "0800 000 0000, disponÃ­vel 24h" },
          { icon: "users",   name: "Contato com RH",      how: "pessoas@empresa.com" }
        ]
      }
    },

    /* ---------------------- CORPO ---------------------- */
    corpo: {
      icon: "body",
      title: "Pequenos movimentos tambÃ©m cuidam da sua rotina",
      lead: "Comece por onde der hoje.",
      stats: [
        { v: "5", k: "prÃ¡ticas rÃ¡pidas" },
        { v: "5", k: "itens de ergonomia" },
        { v: "4", k: "conteÃºdos" }
      ],
      blocks: [
        {
          id: "agora",
          label: "Para fazer agora",
          icon: "bolt",
          hint: "Nada exige equipamento",
          layout: "action",
          items: [
            { id: "c1", icon: "neck",  kind: "pratica", type: "Alongamento", minutes: 3, title: "Alongamento de pescoÃ§o", text: "AlÃ­vio para quem passa o dia em chamadas.", points: ["Incline a cabeÃ§a para a direita por 20 segundos", "Repita para a esquerda", "FaÃ§a trÃªs rodadas sem forÃ§ar"], cta: "ComeÃ§ar" },
            { id: "c2", icon: "hand",  kind: "pratica", type: "Alongamento", minutes: 2, title: "Alongamento de punhos", text: "Para quem digita muitas horas por dia.", points: ["Estenda o braÃ§o com a palma para cima", "Puxe os dedos suavemente por 15 segundos", "Repita com a palma para baixo"], cta: "ComeÃ§ar" },
            { id: "c3", icon: "rotate", kind: "pratica", type: "Mobilidade", minutes: 4, title: "Mobilidade de ombros", text: "Solta a tensÃ£o que se acumula sentado.", points: ["Gire os ombros para trÃ¡s dez vezes", "Abra o peito com as mÃ£os atrÃ¡s da cabeÃ§a", "Respire fundo em cada abertura"], cta: "ComeÃ§ar" },
            { id: "c4", icon: "walk",  kind: "pratica", type: "Movimento", minutes: 5, title: "Caminhada de 5 minutos", text: "CirculaÃ§Ã£o e cabeÃ§a mais leve.", points: ["Deixe o celular na mesa", "Caminhe sem destino definido", "Volte antes de decidir qualquer coisa"], cta: "ComeÃ§ar" },
            { id: "c5", icon: "eye",   kind: "pratica", type: "Pausa visual", minutes: 2, title: "Pausa da tela", text: "Regra simples para a fadiga ocular.", points: ["A cada 20 minutos", "Olhe algo distante por 20 segundos", "Pisque devagar para hidratar os olhos"], cta: "ComeÃ§ar" }
          ]
        }
      ],
      ergonomia: {
        title: "Como estÃ¡ seu espaÃ§o agora?",
        text: "Marque o que jÃ¡ estÃ¡ ajustado.",
        items: [
          { icon: "monitor", label: "Tela na altura dos olhos",   tip: "O topo da tela deve ficar na linha do olhar." },
          { icon: "feet",    label: "PÃ©s apoiados no chÃ£o",       tip: "Se nÃ£o alcanÃ§am, use uma caixa ou apoio." },
          { icon: "body",    label: "Ombros relaxados",           tip: "Cotovelos prÃ³ximos ao corpo, em Ã¢ngulo de 90 graus." },
          { icon: "lamp",    label: "IluminaÃ§Ã£o confortÃ¡vel",     tip: "Luz lateral evita reflexo e cansaÃ§o visual." },
          { icon: "clock",   label: "Pausas ao longo do dia",     tip: "Levante ao menos uma vez por hora." }
        ],
        results: {
          low:  "Vale ajustar um item hoje. Comece pelo mais simples.",
          mid:  "Bom caminho. Falta pouco para o espaÃ§o ficar confortÃ¡vel.",
          high: "Seu espaÃ§o estÃ¡ bem ajustado. Mantenha as pausas."
        }
      },
      contents: [
        { id: "c6", icon: "moon",  kind: "conteudo", type: "Guia",   minutes: 6, title: "Sono",      text: "Rotina de descanso para quem trabalha em ritmo intenso.", points: ["HorÃ¡rio de desligamento", "Luz e cafeÃ­na", "Como lidar com noites ruins"], cta: "Abrir" },
        { id: "c7", icon: "walk",  kind: "conteudo", type: "VÃ­deo",  minutes: 12, title: "Movimento", text: "Aula curta de mobilidade, sem equipamento.", points: ["Quadril e coluna", "Ombros e pescoÃ§o", "VersÃ£o de 5 e de 12 minutos"], cta: "Assistir" },
        { id: "c8", icon: "chair", kind: "conteudo", type: "Checklist", minutes: 4, title: "Ergonomia", text: "Ajustes de custo zero no home office.", points: ["Altura de tela e cadeira", "Apoio lombar improvisado", "PosiÃ§Ã£o de teclado e mouse"], cta: "Abrir" },
        { id: "c9", icon: "bolt",  kind: "conteudo", type: "Artigo", minutes: 5, title: "Energia",    text: "O que sustenta o pique da tarde.", points: ["Pausa real no almoÃ§o", "HidrataÃ§Ã£o e luz natural", "Bloco de foco antes do cansaÃ§o"], cta: "Ler" }
      ]
    },

    /* ---------------------- CONEXÃ•ES ---------------------- */
    conexoes: {
      icon: "connect",
      title: "Trabalho tambÃ©m Ã© feito de relaÃ§Ãµes",
      lead: "Pequenos gestos criam pertencimento.",
      stats: [
        { v: "6", k: "grupos ativos" },
        { v: "4", k: "ideias rÃ¡pidas" },
        { v: "1", k: "reconhecimento por dia" }
      ],
      ideas: [
        { id: "x1", icon: "coffee", kind: "pratica", type: "Convite", minutes: 15, title: "Convide alguÃ©m para um cafÃ©", text: "Sem pauta e sem apresentaÃ§Ã£o.", points: ["Escolha alguÃ©m com quem vocÃª fala pouco", "Proponha 15 minutos", "Deixe o assunto de trabalho de fora"], cta: "Ver como" },
        { id: "x2", icon: "heart",  kind: "pratica", type: "Gesto",   minutes: 2, title: "AgradeÃ§a uma ajuda", text: "Reconhecimento especÃ­fico vale mais que elogio genÃ©rico.", points: ["Diga exatamente o que ajudou", "Diga qual foi o efeito", "Envie hoje, nÃ£o na sexta"], cta: "Ver como" },
        { id: "x3", icon: "compass", kind: "pratica", type: "Rede",   minutes: 20, title: "ConheÃ§a alguÃ©m de outra Ã¡rea", text: "A empresa fica menor quando vocÃª conhece gente.", points: ["Escolha uma Ã¡rea que aparece nas suas entregas", "PeÃ§a 20 minutos para entender o trabalho dela", "Anote uma coisa que vocÃª nÃ£o sabia"], cta: "Ver como" },
        { id: "x4", icon: "spark",  kind: "pratica", type: "Partilha", minutes: 10, title: "Compartilhe um aprendizado", text: "Ensinar Ã© a forma mais rÃ¡pida de fixar.", points: ["Escolha algo que vocÃª aprendeu no mÃªs", "Resuma em trÃªs frases", "Poste no canal do time"], cta: "Ver como" }
      ],
      groups: [
        { icon: "users", name: "Mulheres na tecnologia" },
        { icon: "users", name: "Pais e mÃ£es" },
        { icon: "users", name: "LGBTQIA+" },
        { icon: "users", name: "Pessoas com deficiÃªncia" },
        { icon: "users", name: "RaÃ§a e equidade" },
        { icon: "users", name: "GeraÃ§Ãµes" }
      ]
    },

    /* ---------------------- APRENDER ---------------------- */
    aprender: {
      icon: "learn",
      title: "Aprender tambÃ©m faz parte do cuidado",
      lead: "Escolha pelo tempo que vocÃª tem.",
      stats: [
        { v: "4", k: "conteÃºdos de 5 min" },
        { v: "5", k: "livros e mÃ­dias" },
        { v: "4", k: "plataformas" }
      ],
      blocks: [
        {
          id: "cinco",
          label: "Tenho 5 minutos",
          icon: "clock",
          hint: "ConteÃºdo rÃ¡pido, ideia aplicÃ¡vel hoje",
          layout: "content",
          items: [
            { id: "a1", icon: "headphones", kind: "conteudo", type: "Podcast", minutes: 8, title: "Como criar limites em uma rotina acelerada", text: "EpisÃ³dio curto sobre acordos de disponibilidade.", points: ["O custo do sempre disponÃ­vel", "TrÃªs acordos simples de time", "Como combinar sem parecer indisponÃ­vel"], cta: "Ouvir" },
            { id: "a2", icon: "doc",   kind: "conteudo", type: "Resumo", minutes: 5, title: "Resumo do mÃªs: foco em ambientes barulhentos", text: "As ideias principais do livro do clube de leitura.", points: ["Blocos de trabalho profundo", "O mito do multitarefa", "Como medir seu tempo de foco"], cta: "Ler resumo" },
            { id: "a3", icon: "video", kind: "conteudo", type: "VÃ­deo",  minutes: 6, title: "Feedback em trÃªs frases", text: "Um modelo simples para conversas difÃ­ceis.", points: ["SituaÃ§Ã£o", "Comportamento", "Impacto"], cta: "Assistir" },
            { id: "a4", icon: "spark", kind: "conteudo", type: "PrÃ¡tica", minutes: 5, title: "Uma pergunta melhor por dia", text: "Como fazer perguntas que destravam reuniÃµes.", points: ["Troque perguntas fechadas por abertas", "Pergunte pelo critÃ©rio, nÃ£o pela opiniÃ£o", "SilÃªncio tambÃ©m Ã© tÃ©cnica"], cta: "Abrir" }
          ]
        },
        {
          id: "novo",
          label: "Quero aprender algo novo",
          icon: "book",
          hint: "Livros, artigos, podcasts e vÃ­deos",
          layout: "content",
          items: [
            { id: "a5", icon: "book",  kind: "conteudo", type: "Livro",   minutes: 240, title: "Clube de leitura do mÃªs", text: "Encontro de discussÃ£o na Ãºltima quinta.", points: ["Livro escolhido pelo time", "Encontro de uma hora", "Leitura disponÃ­vel na biblioteca digital"], cta: "Entrar no clube" },
            { id: "a6", icon: "headphones", kind: "conteudo", type: "Podcast", minutes: 24, title: "Times que confiam", text: "SeguranÃ§a psicolÃ³gica na prÃ¡tica.", points: ["O que muda quando o erro pode ser dito", "Rituais que ajudam", "Papel da lideranÃ§a"], cta: "Ouvir" },
            { id: "a7", icon: "doc",   kind: "conteudo", type: "Artigo",  minutes: 9, title: "People analytics sem planilha assustadora", text: "Como ler indicadores de pessoas.", points: ["Quais nÃºmeros importam", "Erros comuns de leitura", "Como levar dados para uma decisÃ£o"], cta: "Ler" },
            { id: "a8", icon: "video", kind: "conteudo", type: "VÃ­deo",   minutes: 15, title: "ApresentaÃ§Ãµes que prendem atenÃ§Ã£o", text: "Estrutura, ritmo e slides.", points: ["Abertura em 30 segundos", "Uma ideia por slide", "Como fechar com pedido claro"], cta: "Assistir" },
            { id: "a9", icon: "spark", kind: "conteudo", type: "Trilha",  minutes: 180, title: "IA no dia a dia de trabalho", text: "Uso prÃ¡tico e responsÃ¡vel de IA generativa.", points: ["Onde a IA ajuda de verdade", "Cuidados com dados", "ExercÃ­cios aplicados Ã  sua rotina"], cta: "Iniciar trilha" }
          ]
        }
      ],
      platforms: [
        { id: "p1", icon: "library", kind: "recurso", type: "Plataforma", title: "Biblioteca digital", text: "Mais de 12 mil tÃ­tulos, leitura ilimitada.", points: ["NegÃ³cios, tecnologia e comportamento", "Acesso pelo e-mail corporativo", "DisponÃ­vel no app e no navegador"], cta: "Acessar" },
        { id: "p2", icon: "cap",     kind: "recurso", type: "Plataforma", title: "Trilhas internas", text: "Cursos criados pelas Ã¡reas da empresa.", points: ["LideranÃ§a, dados e produto", "Certificado interno ao concluir", "MÃ©dia de 4 horas por trilha"], cta: "Ver trilhas" },
        { id: "p3", icon: "globe",   kind: "recurso", type: "Programa",   title: "Bolsa de idiomas", text: "SubsÃ­dio para inglÃªs e espanhol.", points: ["AtÃ© 70% de subsÃ­dio", "Aulas individuais ou em grupo", "InscriÃ§Ãµes duas vezes por ano"], cta: "Ver regras" },
        { id: "p4", icon: "cap",     kind: "recurso", type: "Programa",   title: "SubsÃ­dio de pÃ³s e MBA", text: "Apoio para formaÃ§Ã£o de longo prazo.", points: ["Cursos aprovados pelo comitÃª", "Janelas em marÃ§o e setembro", "Aval da lideranÃ§a necessÃ¡rio"], cta: "Ver regras" }
      ]
    }
  },

  /* ---------------------------------------------------------------
     BENEFÃCIOS
     --------------------------------------------------------------- */
  benefitCategories: ["Todos", "SaÃºde", "Bem-estar", "Financeiro", "Desenvolvimento", "FamÃ­lia", "Mobilidade"],

  benefits: [
    { id: "b01", icon: "cross",  category: "SaÃºde", name: "Plano de saÃºde", short: "Cobertura mÃ©dica nacional para vocÃª e dependentes.", forWhat: "Consultas, exames, internaÃ§Ãµes e pronto-socorro na rede credenciada.", how: "Carteirinha digital no aplicativo do plano.", highlight: true },
    { id: "b02", icon: "heart",  category: "SaÃºde", name: "Apoio psicolÃ³gico", short: "Acolhimento profissional em momentos difÃ­ceis.", forWhat: "Apoio profissional em momentos que exigem cuidado emocional.", how: "Aplicativo do plano de saÃºde, aba Apoio emocional.", highlight: true, support: true },
    { id: "b03", icon: "phone",  category: "SaÃºde", name: "Telemedicina 24h", short: "Consulta por vÃ­deo a qualquer hora.", forWhat: "Sintomas leves, dÃºvidas rÃ¡pidas e renovaÃ§Ã£o de receitas.", how: "Aplicativo do plano, aba Pronto atendimento digital." },
    { id: "b04", icon: "tooth",  category: "SaÃºde", name: "Plano odontolÃ³gico", short: "Cobertura para consultas e tratamentos.", forWhat: "Limpeza, restauraÃ§Ã£o, canal e urgÃªncia odontolÃ³gica.", how: "AdesÃ£o pelo portal de pessoas em qualquer mÃªs." },

    { id: "b05", icon: "bolt",   category: "Bem-estar", name: "AuxÃ­lio bem-estar", short: "CrÃ©dito mensal para atividade fÃ­sica.", forWhat: "Academias, estÃºdios, aulas e aplicativos de movimento.", how: "Cadastro no parceiro com o e-mail corporativo.", highlight: true },
    { id: "b06", icon: "chair",  category: "Bem-estar", name: "Kit ergonomia", short: "Apoio para montar seu espaÃ§o de trabalho.", forWhat: "Cadeira, suporte de monitor e apoio de pÃ©s no home office.", how: "SolicitaÃ§Ã£o pelo portal, com aprovaÃ§Ã£o da lideranÃ§a." },
    { id: "b07", icon: "leaf",   category: "Bem-estar", name: "Check-up anual", short: "Exames preventivos sem custo.", forWhat: "Acompanhamento de saÃºde ao longo do ano.", how: "Agendamento pela clÃ­nica parceira, aba Check-up." },

    { id: "b08", icon: "piggy",  category: "Financeiro", name: "PrevidÃªncia privada", short: "A empresa deposita junto com vocÃª.", forWhat: "Construir reserva de longo prazo com contrapartida da empresa.", how: "AdesÃ£o a qualquer momento pelo portal do fundo.", highlight: true },
    { id: "b09", icon: "shield", category: "Financeiro", name: "Seguro de vida", short: "ProteÃ§Ã£o financeira para a famÃ­lia.", forWhat: "Cobertura equivalente a 24 salÃ¡rios, com assistÃªncia funeral.", how: "Ativo automaticamente. Indique beneficiÃ¡rios no portal." },
    { id: "b10", icon: "chart",  category: "Financeiro", name: "EducaÃ§Ã£o financeira", short: "Consultoria individual e trilhas.", forWhat: "Organizar orÃ§amento, dÃ­vidas e primeiros investimentos.", how: "Agendamento pelo HUMAN, aba Meus BenefÃ­cios." },

    { id: "b11", icon: "cap",     category: "Desenvolvimento", name: "SubsÃ­dio de educaÃ§Ã£o", short: "AtÃ© 70% em cursos aprovados.", forWhat: "GraduaÃ§Ã£o, pÃ³s, MBA e certificaÃ§Ãµes tÃ©cnicas.", how: "Duas janelas por ano, em marÃ§o e setembro." },
    { id: "b12", icon: "library", category: "Desenvolvimento", name: "Biblioteca digital", short: "Leitura ilimitada de 12 mil tÃ­tulos.", forWhat: "Desenvolvimento contÃ­nuo no seu ritmo.", how: "Acesso com o e-mail corporativo, sem custo." },
    { id: "b13", icon: "globe",   category: "Desenvolvimento", name: "Bolsa de idiomas", short: "InglÃªs e espanhol com subsÃ­dio.", forWhat: "Preparo para atuaÃ§Ã£o em times internacionais.", how: "InscriÃ§Ã£o no portal, com aval da lideranÃ§a." },

    { id: "b14", icon: "baby",   category: "FamÃ­lia", name: "LicenÃ§a parental estendida", short: "180 e 60 dias, incluindo adoÃ§Ã£o.", forWhat: "Acompanhar os primeiros meses sem perda de renda.", how: "SolicitaÃ§Ã£o pelo portal a partir do quinto mÃªs." },
    { id: "b15", icon: "home",   category: "FamÃ­lia", name: "AuxÃ­lio creche", short: "Reembolso mensal atÃ© 5 anos.", forWhat: "Reduzir o custo de cuidado infantil na jornada de trabalho.", how: "Envio da nota fiscal pelo portal atÃ© o dia 20." },
    { id: "b16", icon: "heart",  category: "FamÃ­lia", name: "Apoio a cuidadores", short: "OrientaÃ§Ã£o para quem cuida de alguÃ©m.", forWhat: "Conciliar cuidado de idosos ou pessoas com deficiÃªncia e trabalho.", how: "Contato com saÃºde ocupacional pelo HUMAN.", support: true },

    { id: "b17", icon: "bus",    category: "Mobilidade", name: "Vale transporte flexÃ­vel", short: "Saldo que vocÃª distribui como quiser.", forWhat: "Transporte pÃºblico, aplicativos e combustÃ­vel.", how: "Aplicativo do cartÃ£o, aba Redistribuir saldo." },
    { id: "b18", icon: "bike",   category: "Mobilidade", name: "BicicletÃ¡rio e vestiÃ¡rio", short: "Estrutura para quem vai pedalando.", forWhat: "Deslocamento ativo atÃ© o escritÃ³rio.", how: "Cadastro na recepÃ§Ã£o do prÃ©dio." },
    { id: "b19", icon: "laptop", category: "Mobilidade", name: "Trabalho hÃ­brido", short: "Dias definidos por time.", forWhat: "Equilibrar deslocamento, foco e vida pessoal.", how: "Acordo registrado com a lideranÃ§a no portal.", highlight: true }
  ],

  /* ---------------------------------------------------------------
     5 MINUTOS PARA MIM
     --------------------------------------------------------------- */
  pauseOptions: [2, 5, 10, 15],

  pauses: {
    2: [
      { icon: "breath", kind: "RespiraÃ§Ã£o", title: "RespiraÃ§Ã£o em caixa", text: "Inspire por 4, segure por 4, expire por 4, segure por 4.", why: "Baixa a sensaÃ§Ã£o de aceleraÃ§Ã£o antes de uma reuniÃ£o." },
      { icon: "eye",    kind: "Pausa visual", title: "Pausa da tela", text: "Olhe um ponto distante por 20 segundos e pisque devagar.", why: "Alivia a fadiga de quem passa o dia em telas." },
      { icon: "desk",   kind: "Ambiente", title: "Organizar a mesa", text: "Deixe visÃ­vel sÃ³ o que vocÃª vai usar na prÃ³xima hora.", why: "Menos estÃ­mulo por perto, menos dispersÃ£o." },
      { icon: "water",  kind: "Rotina", title: "Um copo de Ã¡gua longe da tela", text: "Levante, sirva e beba sem o celular na mÃ£o.", why: "Quebra o piloto automÃ¡tico em menos de dois minutos." }
    ],
    5: [
      { icon: "neck",   kind: "Alongamento", title: "Alongamento na cadeira", text: "PescoÃ§o, tronco e punhos, 20 segundos em cada lado.", why: "Reduz o desconforto que aparece no fim do dia." },
      { icon: "walk",   kind: "Movimento", title: "Caminhada curta", text: "Cinco minutos pelo corredor ou pelo quarteirÃ£o.", why: "Melhora a circulaÃ§Ã£o e organiza o pensamento." },
      { icon: "heart",  kind: "ConexÃ£o", title: "Mensagem de reconhecimento", text: "Escreva para alguÃ©m do time citando algo especÃ­fico.", why: "Fortalece o vÃ­nculo de quem envia e de quem recebe." },
      { icon: "target", kind: "Foco", title: "Descarga mental", text: "Anote tudo o que ocupa sua cabeÃ§a e circule o que Ã© seu.", why: "Diminui a carga de manter tudo na memÃ³ria." }
    ],
    10: [
      { icon: "walk",   kind: "Movimento", title: "Caminhada sem destino", text: "Dez minutos sem celular e sem decidir nada.", why: "Movimento leve ajuda a resolver o que estava travado." },
      { icon: "book",   kind: "Leitura", title: "Leitura curta", text: "Um artigo da biblioteca e uma ideia anotada.", why: "Aprendizado curto e aplicado rende mais que volume." },
      { icon: "calendar", kind: "Agenda", title: "OrganizaÃ§Ã£o da agenda", text: "Proteja dois blocos de foco na sua semana.", why: "Foco nÃ£o sobra no fim do dia, ele precisa de espaÃ§o." },
      { icon: "desk",   kind: "Ambiente", title: "Reset do espaÃ§o", text: "Escolha uma superfÃ­cie e deixe sÃ³ o essencial.", why: "Ambiente mais limpo, cabeÃ§a mais leve." }
    ],
    15: [
      { icon: "rotate", kind: "Movimento", title: "Mobilidade completa", text: "SequÃªncia de quadril, coluna e ombros sem equipamento.", why: "Quinze minutos mudam a qualidade do fim do expediente." },
      { icon: "headphones", kind: "Aprender", title: "Um episÃ³dio, uma ideia", text: "OuÃ§a um podcast curto e anote uma coisa para testar.", why: "Aprender tambÃ©m Ã© uma forma de pausa." },
      { icon: "coffee", kind: "ConexÃ£o", title: "Conversa nÃ£o agendada", text: "Chame alguÃ©m do time para 15 minutos sem pauta.", why: "RelaÃ§Ãµes se constroem fora das reuniÃµes de status." },
      { icon: "list",   kind: "Foco", title: "Pausa completa", text: "Saia da mesa, coma algo devagar e volte sem pressa.", why: "Pausa real na tarde sustenta a energia atÃ© o fim." }
    ]
  },

  /* ---------------------------------------------------------------
     HISTÃ“RIAS
     --------------------------------------------------------------- */
  stories: [
    { id: "s1", name: "Marina A.", role: "OperaÃ§Ãµes, Recife", theme: "BenefÃ­cios", quote: "Descobri o auxÃ­lio creche depois de um ano de casa. A informaÃ§Ã£o existia, eu Ã© que nÃ£o achava." },
    { id: "s2", name: "Rafael T.", role: "Dados, remoto", theme: "5 Minutos", quote: "Comecei com dois minutos entre reuniÃµes. Hoje Ã© a Ãºnica coisa da rotina que eu nÃ£o negocio." },
    { id: "s3", name: "Juliana P.", role: "Comercial, SÃ£o Paulo", theme: "ConexÃµes", quote: "Um cafÃ© com o time de produto virou projeto conjunto trÃªs meses depois." },
    { id: "s4", name: "Diego M.", role: "Financeiro, Curitiba", theme: "BenefÃ­cios", quote: "A consultoria financeira organizou minhas dÃ­vidas. Foi o benefÃ­cio que mais mudou meu ano." },
    { id: "s5", name: "Ana L.", role: "JurÃ­dico, Salvador", theme: "Corpo", quote: "Ajustei a altura da tela em cinco minutos e a dor no pescoÃ§o sumiu em uma semana." },
    { id: "s6", name: "Tiago R.", role: "Suporte, Manaus", theme: "Mente", quote: "O roteiro de conversa com a lideranÃ§a me ajudou a pedir prazo sem travar." }
  ],

  /* ---------------------------------------------------------------
     APOIO
     --------------------------------------------------------------- */
  support: [
    { icon: "phone",  name: "Canal de acolhimento 24h", what: "Atendimento sigiloso com psicÃ³logos, todos os dias.", how: "0800 000 0000 e chat no aplicativo", tone: "primary" },
    { icon: "scale",  name: "OrientaÃ§Ã£o jurÃ­dica e financeira", what: "DÃºvidas sobre dÃ­vidas, contratos e orÃ§amento familiar.", how: "Agendamento no portal, retorno em 48h" },
    { icon: "cross",  name: "SaÃºde ocupacional", what: "Afastamentos, retorno ao trabalho e adaptaÃ§Ãµes.", how: "saude@empresa.com, resposta em 2 dias Ãºteis" },
    { icon: "shield", name: "Canal de Ã©tica e conduta", what: "Registro de assÃ©dio, discriminaÃ§Ã£o ou desvio de conduta.", how: "Portal independente, com opÃ§Ã£o de anonimato" },
    { icon: "users",  name: "Rede de apoio entre pares", what: "Colegas treinados como primeiros ouvintes.", how: "Lista disponÃ­vel no hub ConexÃµes" },
    { icon: "heart",  name: "Apoio psicolÃ³gico do plano", what: "SessÃµes com psicÃ³logos da rede credenciada.", how: "Aplicativo do plano, aba Apoio emocional" }
  ],

  /* ---------------------------------------------------------------
     PARA VOCÃŠ HOJE
     --------------------------------------------------------------- */
  todaySuggestions: [
    { icon: "sun",    period: "ManhÃ£",             minutes: 2, title: "RespiraÃ§Ã£o",     link: "#/pausa?t=2" },
    { icon: "coffee", period: "Meio do dia",       minutes: 5, title: "Alongamento",    link: "#/dimensao/corpo" },
    { icon: "cloud",  period: "Tarde",             minutes: 5, title: "Reconhecimento", link: "#/dimensao/conexoes" },
    { icon: "moon",   period: "Fim do expediente", minutes: 3, title: "Encerramento",   link: "#/dimensao/mente" }
  ],

  /* ---------------------------------------------------------------
     O CASE
     --------------------------------------------------------------- */
  caseStudy: {
    blocks: [
      { icon: "alert",  label: "Desafio",    text: "InformaÃ§Ãµes, benefÃ­cios e recursos podem estar dispersos em muitos canais." },
      { icon: "compass", label: "EstratÃ©gia", text: "Organizar a experiÃªncia a partir das necessidades dos colaboradores." },
      { icon: "spark",  label: "SoluÃ§Ã£o",    text: "HUMAN, um hub digital de Employee Experience e bem-estar." },
      { icon: "chip",   label: "Tecnologia", text: "Produto prototipado e desenvolvido com apoio de InteligÃªncia Artificial." },
      { icon: "heart",  label: "PrincÃ­pio",  text: "Tecnologia como meio. Cuidado como propÃ³sito." }
    ],
    flow: [
      { icon: "users",  t: "Necessidade", d: "O que vocÃª precisa hoje?" },
      { icon: "compass", t: "Caminho",    d: "Seis jornadas simples" },
      { icon: "grid",   t: "Hub",         d: "ConteÃºdo, prÃ¡tica ou benefÃ­cio" },
      { icon: "check",  t: "AÃ§Ã£o",        d: "Algo para fazer agora" }
    ],
    principles: [
      { icon: "compass", t: "Necessidade antes de estrutura", d: "A navegaÃ§Ã£o segue a intenÃ§Ã£o, nÃ£o o organograma." },
      { icon: "chat",    t: "Linguagem sem jargÃ£o",           d: "O que Ã©, para que serve e como acessar." },
      { icon: "bolt",    t: "AÃ§Ã£o em trÃªs cliques",           d: "Todo conteÃºdo tem um prÃ³ximo passo claro." },
      { icon: "heart",   t: "Cuidado sem clÃ­nica",            d: "O produto informa e direciona, nÃ£o diagnostica." }
    ],
    metrics: [
      { v: "68%", k: "AdoÃ§Ã£o mensal", d: "meta de 12 meses" },
      { v: "+31%", k: "Uso de benefÃ­cios", d: "aumento projetado" },
      { v: "3", k: "Cliques atÃ© o recurso", d: "no mÃ¡ximo" },
      { v: "+14", k: "eNPS de experiÃªncia", d: "variaÃ§Ã£o estimada" }
    ]
  },

  /* =================================================================
     SETEMBRO AMARELO. Especial dentro do HUMAN
     "Cuidar da vida nÃ£o cabe em um mÃªs."

     Estrutura de uma experiÃªncia (banco escalÃ¡vel):
     { id, titulo, categoria: "pausa"|"movimento"|"conexao"|"descoberta",
       tempo: 2|5|15|30|60, tempoLivre: bool (true = "sem tempo fixo"),
       icon, texto, precisa, onde, passos: [], buscar: string|null,
       usaTimer: bool, tags: [] }

     categoria tambÃ©m Ã© usada pelo jogo "Escolha uma carta" e pelas
     mensagens de reconhecimento (uma "voz" por categoria).
     ================================================================= */
  setembroAmarelo: {

    entrada: {
      eyebrow: "Especial Setembro Amarelo ðŸ’›",
      title: "Cuidar da vida nÃ£o cabe em um mÃªs.",
      text: "Setembro coloca o cuidado em evidÃªncia. O HUMAN quer ajudar vocÃª a encontrar pequenos espaÃ§os para si, hoje e durante todo o ano.",
      cta: "Explorar o especial"
    },

    contexto: {
      title: "VocÃª sabe por que setembro Ã© amarelo? ðŸŽ—ï¸",
      resumo: "A histÃ³ria que inspirou o sÃ­mbolo amarelo comeÃ§ou em 1994, nos Estados Unidos, apÃ³s a morte de Mike Emme, um jovem de 17 anos conhecido por seu Mustang amarelo. No funeral, familiares e amigos distribuÃ­ram cartÃµes e fitas amarelas com mensagens de apoio e incentivo para que quem estivesse passando por um momento difÃ­cil pedisse ajuda. O gesto cresceu e a fita amarela passou a ser associada Ã  prevenÃ§Ã£o do suicÃ­dio e Ã  valorizaÃ§Ã£o da vida. No Brasil, Setembro Amarelo transformou setembro em um convite coletivo para falar sobre cuidado, escuta e caminhos de apoio.",
      closing: "Setembro nos lembra de uma conversa que precisa continuar o ano inteiro: pedir ajuda, oferecer presenÃ§a e conhecer os caminhos de cuidado tambÃ©m fazem parte da vida."
    },

    voceSabia: [
      { titulo: "O SUS tambÃ©m oferece cuidado em saÃºde mental", texto: "VocÃª pode procurar uma Unidade BÃ¡sica de SaÃºde (UBS) para orientaÃ§Ã£o e cuidado. Os Centros de AtenÃ§Ã£o Psicossocial (CAPS) tambÃ©m sÃ£o serviÃ§os pÃºblicos de saÃºde mental e podem ser procurados diretamente para acolhimento." },
      { titulo: "Existem portas de atendimento para situaÃ§Ãµes urgentes", texto: "Em uma situaÃ§Ã£o que precise de atendimento imediato, a rede pÃºblica inclui UPA 24h, pronto-socorro e SAMU pelo 192." },
      { titulo: "O CVV Ã© um caminho gratuito de escuta", texto: "O Centro de ValorizaÃ§Ã£o da Vida oferece apoio emocional gratuito e sigiloso pelo 188, 24 horas por dia. O CVV Ã© um serviÃ§o externo e independente do HUMAN." }
    ],

    precisaHoje: [
      { id: "desacelerar", label: "Quero desacelerar", icon: "moon", tags: ["descansar"] },
      { id: "mover", label: "Quero me movimentar", icon: "walk", tags: ["movimentar"] },
      { id: "descobrir", label: "Quero descobrir algo novo", icon: "spark", tags: ["novo"] },
      { id: "ouvir", label: "Quero ouvir algo", icon: "headphones", tags: ["casa", "sozinho"] },
      { id: "sair", label: "Quero sair de casa", icon: "leaf", tags: ["sair"] },
      { id: "conectar", label: "Quero me conectar", icon: "users", tags: ["alguem"] },
      { id: "mente", label: "Quero alimentar minha mente", icon: "book", tags: ["novo", "casa"] },
      { id: "conversar", label: "Quero conversar", icon: "chat", tags: ["alguem"] },
      { id: "sortear", label: "NÃ£o sei. Escolha por mim.", icon: "shuffle", tags: [] }
    ],

    filtrosTempo: [
      { v: 2,  label: "2 min" },
      { v: 5,  label: "5 min" },
      { v: 15, label: "15 min" },
      { v: 30, label: "30 min" },
      { v: 60, label: "1h+" }
    ],

    filtrosContexto: [
      { id: "casa",       label: "Em casa" },
      { id: "sair",       label: "Quero sair" },
      { id: "sozinho",    label: "Sozinho" },
      { id: "alguem",     label: "Com alguÃ©m" },
      { id: "novo",       label: "Experimentar algo novo" },
      { id: "movimentar", label: "Movimentar" },
      { id: "descansar",  label: "Descansar" }
    ],

    categorias: {
      pausa:      { label: "Pausa",      icon: "moon" },
      movimento:  { label: "Movimento",  icon: "walk" },
      conexao:    { label: "ConexÃ£o",    icon: "users" },
      descoberta: { label: "Descoberta", icon: "spark" }
    },

    experiencias: [
      { id: "e01", titulo: "Respire comigo", categoria: "pausa", tempo: 2, icon: "breath", texto: "Um ciclo curto de respiraÃ§Ã£o para desacelerar agora.", precisa: "Nada, sÃ³ um instante.", onde: "Onde vocÃª estiver.", passos: ["Inspire por 4 tempos", "Segure por 4 tempos", "Expire por 6 tempos"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e02", titulo: "Olhe para longe", categoria: "pausa", tempo: 2, icon: "eye", texto: "Descanse a vista de quem passou o dia em telas.", precisa: "Nada.", onde: "Perto de uma janela, se tiver uma por perto.", passos: ["Escolha um ponto distante", "Fixe o olhar nele por 20 segundos", "Pisque devagar algumas vezes"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e03", titulo: "Ãgua sem pressa", categoria: "pausa", tempo: 2, icon: "water", texto: "Levante, sirva um copo de Ã¡gua e beba sem o celular na mÃ£o.", precisa: "Um copo d'Ã¡gua.", onde: "Na cozinha ou por perto.", passos: ["Levante-se devagar", "Sirva o copo com atenÃ§Ã£o", "Beba sem pressa, sem tela"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e04", titulo: "Solte os ombros", categoria: "pausa", tempo: 2, icon: "neck", texto: "Um alÃ­vio rÃ¡pido para a tensÃ£o que se acumula sentado.", precisa: "Nada.", onde: "Onde vocÃª estiver sentado.", passos: ["Suba os ombros atÃ© as orelhas", "Solte devagar, soltando o ar junto", "Repita trÃªs vezes"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e05", titulo: "Observe cinco coisas ao seu redor", categoria: "pausa", tempo: 2, icon: "eye", texto: "Um pequeno exercÃ­cio de presenÃ§a, sem precisar de nada alÃ©m de olhar.", precisa: "Nada.", onde: "Onde vocÃª estiver.", passos: ["Nomeie cinco coisas que vocÃª vÃª", "Repare em uma cor que chamou atenÃ§Ã£o", "Volte para o que estava fazendo, sem pressa"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },

      { id: "e06", titulo: "Uma mÃºsica, nada mais", categoria: "pausa", tempo: 5, icon: "music", texto: "OuÃ§a uma mÃºsica inteira sem fazer outra coisa ao mesmo tempo.", precisa: "Fones ou uma caixinha de som.", onde: "Onde vocÃª estiver.", passos: ["Escolha uma mÃºsica que vocÃª gosta", "OuÃ§a do inÃ­cio ao fim", "Evite mexer no celular enquanto ela toca"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e07", titulo: "Cinco minutos sem telas", categoria: "pausa", tempo: 5, icon: "monitor", texto: "Uma pequena pausa de verdade, longe de qualquer tela.", precisa: "Nada.", onde: "Onde vocÃª estiver.", passos: ["Deixe o celular em outro cÃ´modo, se possÃ­vel", "Fique com os prÃ³prios pensamentos", "Volte quando o tempo acabar"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e08", titulo: "Caminhe um pouquinho", categoria: "movimento", tempo: 5, icon: "walk", texto: "Um passeio curto para colocar o corpo em movimento.", precisa: "Um espaÃ§o para andar.", onde: "No quarteirÃ£o, no corredor ou no quintal.", passos: ["Levante-se e caminhe sem destino", "Preste atenÃ§Ã£o nos passos", "Volte no seu ritmo"], usaTimer: true, tags: ["sair", "movimentar", "sozinho"] },
      { id: "e09", titulo: "Arrume um pequeno cantinho", categoria: "pausa", tempo: 5, icon: "desk", texto: "Organize uma superfÃ­cie pequena, sÃ³ para respirar melhor no espaÃ§o.", precisa: "Nada alÃ©m do que jÃ¡ estÃ¡ aÃ­.", onde: "Uma mesa, prateleira ou gaveta.", passos: ["Escolha um espaÃ§o pequeno", "Deixe visÃ­vel sÃ³ o essencial", "Aproveite o resultado por um instante"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e10", titulo: "FaÃ§a absolutamente nada por 5 minutos", categoria: "pausa", tempo: 5, icon: "moon", texto: "Sem tarefa, sem meta. SÃ³ um tempo livre de verdade.", precisa: "Nada.", onde: "Onde vocÃª estiver confortÃ¡vel.", passos: ["Sente-se ou deite-se", "NÃ£o tente preencher o tempo com nada", "Deixe o tempo passar"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e11", titulo: "Aprenda cinco palavras em outro idioma", categoria: "descoberta", tempo: 5, icon: "globe", texto: "Uma curiosidade pequena para levar com vocÃª.", precisa: "Nada, ou um app de idiomas se preferir.", onde: "Onde vocÃª estiver.", passos: ["Escolha um idioma que desperte curiosidade", "Aprenda cinco palavras novas", "Tente lembrar delas mais tarde"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e12", titulo: "OuÃ§a sons da natureza", categoria: "pausa", tempo: 5, icon: "leaf", texto: "Um fundo sonoro simples para desacelerar.", precisa: "Fones, se preferir.", onde: "Onde vocÃª estiver.", passos: ["Procure um som de chuva, mar ou floresta", "Feche os olhos, se quiser", "SÃ³ escute, sem outro objetivo"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e13", titulo: "Cuide de uma planta", categoria: "pausa", tempo: 5, icon: "leaf", texto: "Um cuidado pequeno com algo vivo por perto.", precisa: "Uma planta, se vocÃª tiver uma.", onde: "Em casa.", passos: ["Regue ou limpe as folhas", "Observe como ela estÃ¡", "Aproveite o momento sem pressa"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e14", titulo: "Reveja fotos de momentos bons", categoria: "pausa", tempo: 5, icon: "camera", texto: "Um passeio rÃ¡pido por lembranÃ§as que fazem bem.", precisa: "Seu celular ou um Ã¡lbum.", onde: "Onde vocÃª estiver.", passos: ["Abra a galeria ou um Ã¡lbum fÃ­sico", "Escolha um perÃ­odo para revisitar", "Pare em uma foto que te faÃ§a sorrir"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },

      { id: "e15", titulo: "Desenhe alguma coisa", categoria: "descoberta", tempo: 15, icon: "pencil", texto: "NÃ£o precisa saber desenhar. SÃ³ precisa comeÃ§ar.", precisa: "Papel e caneta, ou o dedo na tela.", onde: "Onde vocÃª estiver.", passos: ["Escolha qualquer objeto ou ideia", "Desenhe sem se preocupar com o resultado", "Guarde ou apague, como preferir"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e16", titulo: "Fotografe cinco coisas interessantes", categoria: "descoberta", tempo: 15, icon: "camera", texto: "Um pequeno exercÃ­cio de olhar com mais atenÃ§Ã£o.", precisa: "Seu celular.", onde: "Em casa ou pela vizinhanÃ§a.", passos: ["Saia ou circule pelo espaÃ§o", "Fotografe cinco coisas que chamem atenÃ§Ã£o", "Reveja as fotos ao final"], usaTimer: true, tags: ["sair", "sozinho", "novo"] },
      { id: "e17", titulo: "Aprenda um origami", categoria: "descoberta", tempo: 15, icon: "pencil", texto: "Uma dobradura simples, sÃ³ para experimentar algo novo com as mÃ£os.", precisa: "Uma folha de papel.", onde: "Onde vocÃª estiver.", passos: ["Procure um modelo simples", "Siga o passo a passo com calma", "NÃ£o tem problema se nÃ£o sair perfeito"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e18", titulo: "Escreva sem objetivo", categoria: "descoberta", tempo: 15, icon: "doc", texto: "Coloque no papel o que vier, sem se preocupar com sentido.", precisa: "Papel e caneta, ou um bloco de notas.", onde: "Onde vocÃª estiver.", passos: ["Escreva o que vier Ã  cabeÃ§a", "NÃ£o se preocupe com ortografia ou coerÃªncia", "Pare quando quiser"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e19", titulo: "Dance trÃªs mÃºsicas", categoria: "movimento", tempo: 15, icon: "music", texto: "Movimente o corpo do seu jeito, sem coreografia nenhuma.", precisa: "Uma playlist.", onde: "Em casa.", passos: ["Escolha trÃªs mÃºsicas que vocÃª goste", "Dance do seu jeito, sem se cobrar", "Sinta o corpo se soltando aos poucos"], usaTimer: true, tags: ["casa", "movimentar"] },
      { id: "e20", titulo: "Ligue para alguÃ©m", categoria: "conexao", tempo: 15, icon: "phone", texto: "Uma conversa de voz, sem ser por mensagem.", precisa: "Seu celular.", onde: "Onde vocÃª estiver Ã  vontade.", passos: ["Escolha alguÃ©m que vocÃª queira ouvir", "Ligue sem um motivo especial", "Aproveite a conversa"], usaTimer: false, tags: ["alguem"] },
      { id: "e21", titulo: "Tome um cafÃ© sem celular", categoria: "pausa", tempo: 15, icon: "coffee", texto: "Uma pausa de verdade para uma bebida que vocÃª gosta.", precisa: "CafÃ©, chÃ¡ ou o que preferir.", onde: "Em casa ou em algum lugar tranquilo.", passos: ["Prepare a bebida com calma", "Deixe o celular longe da mesa", "Beba prestando atenÃ§Ã£o no sabor"], usaTimer: true, tags: ["sozinho", "descansar"] },
      { id: "e22", titulo: "OuÃ§a mÃºsica instrumental", categoria: "pausa", tempo: 15, icon: "music", texto: "Um fundo sonoro sem letra, sÃ³ para acompanhar o silÃªncio.", precisa: "Fones ou caixinha de som.", onde: "Onde vocÃª estiver.", passos: ["Escolha uma playlist instrumental", "Feche os olhos, se quiser", "Deixe a mente descansar um pouco"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e23", titulo: "Brinque com um animal", categoria: "conexao", tempo: 15, icon: "paw", texto: "Um momento leve de companhia, se vocÃª tiver um animal por perto.", precisa: "Um animal de estimaÃ§Ã£o, seu ou de alguÃ©m prÃ³ximo.", onde: "Em casa.", passos: ["Escolha um brinquedo ou brincadeira simples", "Dedique esse tempo sÃ³ a isso", "Aproveite a companhia"], usaTimer: true, tags: ["casa", "sozinho"] },

      { id: "e24", titulo: "Experimente crochÃª", categoria: "descoberta", tempo: 30, icon: "hand", texto: "Um primeiro contato com um ponto simples de crochÃª.", precisa: "Linha e agulha de crochÃª.", onde: "Onde vocÃª estiver sentado.", passos: ["Procure um tutorial de ponto bÃ¡sico", "Tente reproduzir devagar", "NÃ£o tem problema errar no inÃ­cio"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e25", titulo: "Cozinhe algo diferente", categoria: "descoberta", tempo: 30, icon: "pan", texto: "Prepare uma receita nova, mesmo que simples.", precisa: "Ingredientes bÃ¡sicos que vocÃª jÃ¡ tenha.", onde: "Na cozinha.", passos: ["Escolha uma receita curta e simples", "Separe os ingredientes", "Cozinhe com calma, sem pressa"], usaTimer: true, tags: ["casa", "novo"] },
      { id: "e26", titulo: "Comece um livro", categoria: "descoberta", tempo: 30, icon: "book", texto: "Os primeiros capÃ­tulos de algo novo, sem compromisso de terminar.", precisa: "Um livro, fÃ­sico ou digital.", onde: "Onde vocÃª estiver confortÃ¡vel.", passos: ["Escolha um livro que desperte curiosidade", "Leia os primeiros capÃ­tulos", "Pare quando quiser, sem cobranÃ§a"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e27", titulo: "FaÃ§a um quebra-cabeÃ§a", categoria: "descoberta", tempo: 30, icon: "puzzle", texto: "Um tempo de atenÃ§Ã£o simples, peÃ§a por peÃ§a.", precisa: "Um quebra-cabeÃ§a fÃ­sico ou um aplicativo.", onde: "Em casa.", passos: ["Escolha um quebra-cabeÃ§a de qualquer tamanho", "Monte com calma", "Continue depois, se preferir"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e28", titulo: "FaÃ§a um passeio de bicicleta", categoria: "movimento", tempo: 30, icon: "bike", texto: "Movimento ao ar livre, no seu ritmo.", precisa: "Uma bicicleta.", onde: "Pela vizinhanÃ§a ou uma ciclovia.", passos: ["Escolha um trajeto tranquilo", "Pedale no seu prÃ³prio ritmo", "Aproveite o ar livre"], usaTimer: true, tags: ["sair", "movimentar"] },
      { id: "e29", titulo: "Convide alguÃ©m para caminhar", categoria: "conexao", tempo: 30, tempoLivre: true, icon: "users", texto: "Uma companhia para colocar o corpo em movimento junto.", precisa: "AlguÃ©m disponÃ­vel.", onde: "Pela vizinhanÃ§a ou um parque.", passos: ["Chame alguÃ©m para caminhar com vocÃª", "Combine um horÃ¡rio simples", "Aproveite a companhia e o movimento"], usaTimer: false, tags: ["alguem", "movimentar"] },
      { id: "e30", titulo: "FaÃ§a algo gentil por alguÃ©m", categoria: "conexao", tempo: 30, tempoLivre: true, icon: "heart", texto: "Um gesto pequeno, sem esperar nada em troca.", precisa: "Nada alÃ©m de disposiÃ§Ã£o.", onde: "Onde for possÃ­vel.", passos: ["Pense em alguÃ©m que possa gostar de um gesto seu", "Escolha algo simples de fazer", "NÃ£o precisa avisar que foi vocÃª"], usaTimer: false, tags: ["alguem"] },

      { id: "e31", titulo: "ConheÃ§a um parque", categoria: "movimento", tempo: 60, tempoLivre: true, icon: "leaf", texto: "Um passeio ao ar livre para colocar o corpo e a cabeÃ§a em outro ritmo.", precisa: "DisposiÃ§Ã£o para sair.", onde: "Um parque perto de vocÃª.", passos: ["Separe um tempo livre na sua agenda", "VÃ¡ sem pressa, sem compromisso de exercÃ­cio"], buscar: "Pesquise: parque gratuito perto de mim", usaTimer: false, tags: ["sair", "movimentar"] },
      { id: "e32", titulo: "Procure uma atividade gratuita na sua cidade", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "compass", texto: "Descubra o que jÃ¡ existe pertinho de vocÃª.", precisa: "Alguns minutos para pesquisar.", onde: "Na sua cidade.", passos: ["Pesquise a agenda cultural da sua regiÃ£o", "Escolha algo que desperte curiosidade"], buscar: "Pesquise: agenda cultural gratuita + sua cidade", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e33", titulo: "ConheÃ§a uma biblioteca pÃºblica", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "library", texto: "Um espaÃ§o tranquilo e gratuito para explorar.", precisa: "DisposiÃ§Ã£o para sair.", onde: "Uma biblioteca pÃºblica perto de vocÃª.", passos: ["Procure a biblioteca mais prÃ³xima", "Reserve um tempo para conhecer o espaÃ§o"], buscar: "Pesquise: biblioteca pÃºblica perto de mim", usaTimer: false, tags: ["sair", "sozinho", "novo"] },
      { id: "e34", titulo: "Procure atividade fÃ­sica gratuita", categoria: "movimento", tempo: 60, tempoLivre: true, icon: "target", texto: "Muitas cidades oferecem aulas abertas e gratuitas.", precisa: "DisposiÃ§Ã£o para pesquisar e sair.", onde: "PraÃ§as, parques ou centros esportivos.", passos: ["Pesquise opÃ§Ãµes gratuitas na sua regiÃ£o", "Escolha uma para experimentar"], buscar: "Pesquise: atividade fÃ­sica gratuita perto de mim", usaTimer: false, tags: ["sair", "movimentar"] },
      { id: "e35", titulo: "Assista ao pÃ´r do sol", categoria: "pausa", tempo: 60, tempoLivre: true, icon: "sunset", texto: "Um momento simples de pausa observando o fim do dia.", precisa: "Nada alÃ©m de um lugar com vista.", onde: "Uma janela, varanda ou espaÃ§o aberto.", passos: ["Reserve um tempo perto do fim da tarde", "Fique alguns minutos sÃ³ observando"], usaTimer: false, tags: ["sair", "sozinho", "descansar"] },
      { id: "e36", titulo: "Assista novamente a um filme que gosta", categoria: "pausa", tempo: 60, tempoLivre: true, icon: "video", texto: "O conforto de algo que vocÃª jÃ¡ conhece.", precisa: "Um filme que vocÃª jÃ¡ ama.", onde: "Onde vocÃª estiver confortÃ¡vel.", passos: ["Escolha um filme que jÃ¡ te fez bem antes", "Assista sem multitarefa"], usaTimer: false, tags: ["casa", "sozinho", "descansar"] },
      { id: "e37", titulo: "ConheÃ§a uma feira da sua cidade", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "map", texto: "Um passeio simples por algo diferente da rotina.", precisa: "DisposiÃ§Ã£o para sair.", onde: "Uma feira ou mercado perto de vocÃª.", passos: ["Pesquise feiras prÃ³ximas", "VÃ¡ sem pressa, sÃ³ para conhecer"], buscar: "Pesquise: feira ou mercado perto de mim", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e38", titulo: "Visite uma exposiÃ§Ã£o gratuita", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "spark", texto: "Um pouco de arte ou cultura no seu tempo livre.", precisa: "DisposiÃ§Ã£o para sair.", onde: "Um espaÃ§o cultural perto de vocÃª.", passos: ["Pesquise exposiÃ§Ãµes gratuitas na sua regiÃ£o", "Reserve um tempo para visitar"], buscar: "Pesquise: exposiÃ§Ã£o gratuita + sua cidade", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e39", titulo: "Experimente uma aula aberta", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "cap", texto: "Uma primeira experiÃªncia com algo que vocÃª nunca tentou.", precisa: "DisposiÃ§Ã£o para pesquisar e experimentar.", onde: "Um espaÃ§o com aulas abertas na sua regiÃ£o.", passos: ["Pesquise aulas experimentais gratuitas", "Escolha uma que desperte curiosidade"], buscar: "Pesquise: aula aberta gratuita + sua cidade", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e40", titulo: "ConheÃ§a um lugar da sua cidade onde nunca esteve", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "map", texto: "Um pequeno passeio de descoberta, pertinho de casa.", precisa: "DisposiÃ§Ã£o para sair.", onde: "Algum canto da sua prÃ³pria cidade.", passos: ["Escolha um bairro ou lugar que vocÃª nunca visitou", "VÃ¡ com calma, sem roteiro fixo"], buscar: "Pesquise: lugares para conhecer perto de mim", usaTimer: false, tags: ["sair", "novo"] }
    ],

    /* ---------------------------------------------------------------
       MENSAGENS DE RECONHECIMENTO. por categoria, com variaÃ§Ãµes
       para nÃ£o repetir sempre a mesma frase.
       --------------------------------------------------------------- */
    mensagensReconhecimento: {
      pausa: [
        "â™¥ VocÃª escolheu parar por vocÃª.\n\nForam apenas alguns minutos no relÃ³gio, mas houve uma escolha importante aqui: vocÃª criou um espaÃ§o para respirar e desacelerar.\n\nPequenos cuidados tambÃ©m contam.",
        "â™¥ VocÃª deu um tempo para si.\n\nNÃ£o mudou o dia inteiro, mas mudou esse momento. E esse momento era seu.\n\nIsso jÃ¡ vale alguma coisa."
      ],
      movimento: [
        "â™¥ VocÃª colocou seu corpo em movimento.\n\nNÃ£o importa a distÃ¢ncia ou o ritmo. Hoje vocÃª escolheu reservar um momento para vocÃª.\n\nEsse passo merece ser reconhecido.",
        "â™¥ VocÃª se moveu por vocÃª.\n\nMesmo que tenha sido pouco, foi uma escolha sua, no seu tempo.\n\nIsso conta."
      ],
      conexao: [
        "â™¥ VocÃª escolheu se aproximar de alguÃ©m.\n\nUm gesto, uma ligaÃ§Ã£o, uma companhia: pequenas conexÃµes tambÃ©m sÃ£o cuidado.\n\nObrigado por ter feito esse movimento.",
        "â™¥ VocÃª compartilhou um momento com alguÃ©m.\n\nNem sempre cuidar de si significa estar sozinho. Ã€s vezes Ã© justamente o contrÃ¡rio.\n\nEsse passo importa."
      ],
      descoberta: [
        "â™¥ VocÃª abriu espaÃ§o para algo novo.\n\nExperimentar, criar ou aprender tambÃ©m Ã© uma forma de cuidar de si.\n\nParabÃ©ns por ter tentado.",
        "â™¥ VocÃª escolheu sair da rotina, ainda que por pouco tempo.\n\nCuriosidade tambÃ©m Ã© autocuidado.\n\nEsse momento Ã© seu."
      ],
      semTimer: "â™¥ VocÃª fez por vocÃª.\n\nNÃ£o importa se foi rÃ¡pido ou se durou a tarde inteira. VocÃª escolheu reservar esse espaÃ§o.\n\nEsse passo merece ser reconhecido.",
      interrompida: "â™¥ O que vocÃª conseguiu fazer hoje tambÃ©m conta.\n\nVocÃª nÃ£o precisava chegar atÃ© o final para esse momento ter valor.\n\nVocÃª comeÃ§ou. E esse passo importa."
    },

    /* ---------------------------------------------------------------
       JOGOS. sem ranking, sem pontuaÃ§Ã£o, sem competiÃ§Ã£o.
       --------------------------------------------------------------- */
    jogos: {
      titulo: "Um momento leve tambÃ©m pode ser um momento por vocÃª.",

      encontreEmVoce: {
        titulo: "Encontre em VocÃª",
        intro: "Encontre as palavras ligadas a cuidado, presenÃ§a e conexÃ£o. Arraste da primeira atÃ© a Ãºltima letra.",
        palavras: ["CUIDADO", "PAUSA", "ESCUTA", "APOIO", "RESPIRO", "TEMPO", "CALMA", "PRESENCA", "CONEXAO", "ACOLHER", "CONVERSA", "DESCANSO"],
        reflexao: "VocÃª encontrou todas. ðŸ’›\n\nCuidado tambÃ©m pode estar nas pequenas coisas que fazemos por nÃ³s e pelas pessoas ao nosso redor."
      },

      poteDasCoisasBoas: {
        titulo: "Coisas que eu quero guardar",
        text: "Nem todo dia precisa ser extraordinÃ¡rio para ter alguma coisa que vale a pena guardar.\n\nPode ter sido uma conversa, uma comida gostosa, uma risada, uma mÃºsica, algo que vocÃª conseguiu fazer, um momento tranquilo ou simplesmente algo pequeno que chamou sua atenÃ§Ã£o.",
        pergunta: "O que vocÃª gostaria de guardar de hoje?",
        placeholder: "Escreva aqui...",
        cta: "ðŸ’› Colocar no meu pote",
        vazio: "Seu pote ainda estÃ¡ vazio. Quando quiser, guarde a primeira coisa boa do seu dia."
      },

      escolhaUmaCarta: {
        titulo: "Escolha uma carta",
        intro: "Cada carta representa um caminho possÃ­vel. Escolha a que fizer sentido agora.",
        cartas: [
          { categoria: "pausa", label: "PAUSA", icon: "moon" },
          { categoria: "movimento", label: "MOVIMENTO", icon: "walk" },
          { categoria: "conexao", label: "CONEXÃƒO", icon: "users" },
          { categoria: "descoberta", label: "DESCOBERTA", icon: "spark" }
        ]
      },

      roleta: {
        titulo: "Por Mim Hoje",
        intro: "Gire e deixe a roleta escolher por vocÃª. Sempre com opÃ§Ãµes diferentes.",
        tamanhoRodada: 6
      }
    },

    /* ---------------------------------------------------------------
       APOIO. separado das atividades recreativas
       --------------------------------------------------------------- */
    apoio: {
      title: "Precisa conversar com alguÃ©m?",
      text: "Se vocÃª precisa de apoio emocional, o CVV oferece escuta voluntÃ¡ria, gratuita e sigilosa. Este Ã© um canal externo ao HUMAN.",
      canais: [
        { icon: "phone", nome: "CVV. Centro de ValorizaÃ§Ã£o da Vida", telefone: "188", texto: "LigaÃ§Ã£o gratuita, disponÃ­vel 24 horas por dia, todos os dias, em todo o Brasil.", site: "https://cvv.org.br/" },
        { icon: "chat", nome: "Pode Falar", texto: "EspaÃ§o de apoio emocional voltado ao pÃºblico jovem." }
      ]
    },

    /* ---------------------------------------------------------------
       MEU TEMPO POR MIM
       --------------------------------------------------------------- */
    meuTempo: {
      title: "Meu Tempo por Mim",
      hint: "Um calendÃ¡rio afetivo dos momentos que vocÃª reservou para si. NÃ£o Ã© uma cobranÃ§a. Ã© um registro.",
      vazio: "Ainda nÃ£o hÃ¡ momentos guardados aqui. Quando vocÃª registrar um â™¥, ele aparece neste calendÃ¡rio.",
      encerramento: "Setembro acaba. O cuidado continua."
    },

    /* ---------------------------------------------------------------
       FEEDBACK
       --------------------------------------------------------------- */
    feedback: {
      eyebrow: "ðŸ’¬ Sua experiÃªncia tambÃ©m importa",
      title: "Deixe uma mensagem ðŸ’›",
      text: "Uma palavra, um pensamento ou algo que esta experiÃªncia despertou em vocÃª. O envio Ã© anÃ´nimo.",
      placeholderMsg: "Escreva aqui...",
      cta: "Enviar mensagem",
      confirmacao: "Obrigado por compartilhar. ðŸ’›\nColocar em palavras tambÃ©m pode ser uma forma de perceber o que este momento despertou em vocÃª."
    },

    disclaimer: "O HUMAN informa, incentiva prÃ¡ticas de autocuidado e facilita caminhos de acesso. NÃ£o realiza diagnÃ³sticos e nÃ£o substitui acompanhamento profissional."
  }
};
