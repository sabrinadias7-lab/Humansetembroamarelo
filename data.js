/* =====================================================================
   HUMAN — Hub de Experiência e Bem-estar do Colaborador
   data.js — Base de conteúdo (dados fictícios / projeto conceitual)

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
    concept: "Tecnologia como meio. Cuidado como propósito.",
    purpose: "Um só lugar para encontrar o que a empresa já oferece, organizado pelo que você precisa.",
    disclaimer: "O HUMAN informa e direciona. Não realiza diagnósticos e não substitui atendimento profissional."
  },

  /* ---------------------------------------------------------------
     JORNADAS — "O que você precisa hoje?"
     --------------------------------------------------------------- */
  needs: [
    { id: "pausa",      label: "Quero fazer uma pausa",        hint: "Autocuidado em poucos minutos", route: "#/pausa",              icon: "clock" },
    { id: "corpo",      label: "Quero me movimentar",          hint: "Movimento e ergonomia",         route: "#/dimensao/corpo",     icon: "body" },
    { id: "aprender",   label: "Quero aprender algo",          hint: "Conteúdos e plataformas",       route: "#/dimensao/aprender",  icon: "learn" },
    { id: "beneficios", label: "Quero conhecer meus benefícios", hint: "O que existe e como acessar", route: "#/beneficios",         icon: "gift" },
    { id: "conexoes",   label: "Quero me conectar",            hint: "Pessoas e reconhecimento",      route: "#/dimensao/conexoes",  icon: "connect" },
    { id: "apoio",      label: "Preciso encontrar apoio",      hint: "Canais da empresa",             route: "#/apoio",              icon: "shield", quiet: true }
  ],

  /* ---------------------------------------------------------------
     DIMENSÕES
     --------------------------------------------------------------- */
  dimensions: [
    { id: "mente",      name: "Mente",             tagline: "Pausas, foco e apoio",        icon: "mind",    count: "13 recursos" },
    { id: "corpo",      name: "Corpo",             tagline: "Movimento e ergonomia",       icon: "body",    count: "14 recursos" },
    { id: "conexoes",   name: "Conexões",          tagline: "Pessoas e pertencimento",     icon: "connect", count: "12 recursos" },
    { id: "beneficios", name: "Meus Benefícios",   tagline: "Tudo em um só lugar",         icon: "gift",    count: "18 benefícios", route: "#/beneficios" },
    { id: "aprender",   name: "Aprender",          tagline: "Conteúdo e desenvolvimento",  icon: "learn",   count: "13 recursos" },
    { id: "pausa",      name: "5 Minutos Para Mim", tagline: "Você escolhe o tempo",       icon: "clock",   count: "16 sugestões", route: "#/pausa" }
  ],

  /* =================================================================
     HUBS
     ================================================================= */
  hubs: {

    /* ---------------------- MENTE ---------------------- */
    mente: {
      icon: "mind",
      title: "Cuide da mente no seu ritmo",
      lead: "Escolha por onde começar hoje.",
      stats: [
        { v: "4", k: "pausas rápidas" },
        { v: "5", k: "conteúdos" },
        { v: "24h", k: "canal de apoio" }
      ],
      blocks: [
        {
          id: "pausa",
          label: "Preciso de uma pausa",
          icon: "clock",
          hint: "Práticas guiadas para fazer agora",
          layout: "action",
          items: [
            {
              id: "m1", icon: "breath", kind: "pratica", type: "Respiração", minutes: 2,
              title: "Respiração de 2 minutos",
              text: "Um ciclo curto para desacelerar antes da próxima reunião.",
              points: ["Inspire por 4 tempos", "Segure por 4 tempos", "Expire por 6 tempos", "Repita cinco vezes"],
              cta: "Começar"
            },
            {
              id: "m2", icon: "eye", kind: "pratica", type: "Pausa visual", minutes: 2,
              title: "Pausa da tela",
              text: "Alívio rápido para os olhos em dias de reunião atrás de reunião.",
              points: ["Olhe para um ponto distante por 20 segundos", "Pisque devagar dez vezes", "Solte a mandíbula e os ombros"],
              cta: "Começar"
            },
            {
              id: "m3", icon: "target", kind: "pratica", type: "Foco", minutes: 5,
              title: "Exercício rápido de foco",
              text: "Tire da cabeça o que está ocupando espaço.",
              points: ["Escreva tudo o que está pendente", "Circule o que depende só de você", "Escolha uma única tarefa para agora"],
              cta: "Começar"
            },
            {
              id: "m4", icon: "list", kind: "pratica", type: "Organização", minutes: 10,
              title: "Organizar os próximos 10 minutos",
              text: "Um plano curto vale mais que uma lista longa.",
              points: ["Feche as abas que não vai usar", "Defina uma entrega pequena", "Silencie notificações até terminar"],
              cta: "Começar"
            }
          ]
        },
        {
          id: "entender",
          label: "Quero entender melhor",
          icon: "book",
          hint: "Conteúdos curtos, sem linguagem clínica",
          layout: "content",
          items: [
            { id: "m5", icon: "alert", kind: "conteudo", type: "Artigo", minutes: 6, title: "Como reconhecer sinais de sobrecarga", text: "Sinais que aparecem antes do esgotamento.", points: ["Sinais físicos, mentais e de comportamento", "O que costuma passar despercebido", "Primeiros passos possíveis"], cta: "Ler" },
            { id: "m6", icon: "shieldCheck", kind: "conteudo", type: "Guia", minutes: 5, title: "Limites na rotina de trabalho", text: "Como combinar disponibilidade sem culpa.", points: ["Acordos simples com o time", "O que dizer quando o pedido chega tarde", "Modelos de resposta prontos"], cta: "Abrir guia" },
            { id: "m7", icon: "chat", kind: "conteudo", type: "Roteiro", minutes: 4, title: "Conversar com a liderança sobre demandas", text: "Um roteiro para uma conversa difícil.", points: ["Como abrir o assunto", "Dados que ajudam a sustentar o ponto", "Como propor um próximo passo"], cta: "Abrir roteiro" },
            { id: "m8", icon: "clock", kind: "conteudo", type: "Artigo", minutes: 5, title: "A importância das pausas", text: "Por que parar melhora o resultado.", points: ["O que acontece com a atenção sem intervalo", "Frequência que funciona na prática", "Como encaixar pausas na agenda"], cta: "Ler" },
            { id: "m9", icon: "moon", kind: "conteudo", type: "Podcast", minutes: 18, title: "Sono e produtividade", text: "Conversa sobre descanso e desempenho.", points: ["Rotina de desligamento", "Luz, cafeína e horários", "O que muda em times de fusos diferentes"], cta: "Ouvir" }
          ]
        }
      ],
      support: {
        title: "Você não precisa encontrar tudo sozinho.",
        text: "Estes canais são confidenciais e não passam pela sua liderança.",
        items: [
          { icon: "heart",   name: "Apoio psicológico",   how: "Aplicativo do plano de saúde" },
          { icon: "cross",   name: "Plano de saúde",      how: "Carteirinha digital e rede credenciada" },
          { icon: "phone",   name: "Canal de acolhimento", how: "0800 000 0000, disponível 24h" },
          { icon: "users",   name: "Contato com RH",      how: "pessoas@empresa.com" }
        ]
      }
    },

    /* ---------------------- CORPO ---------------------- */
    corpo: {
      icon: "body",
      title: "Pequenos movimentos também cuidam da sua rotina",
      lead: "Comece por onde der hoje.",
      stats: [
        { v: "5", k: "práticas rápidas" },
        { v: "5", k: "itens de ergonomia" },
        { v: "4", k: "conteúdos" }
      ],
      blocks: [
        {
          id: "agora",
          label: "Para fazer agora",
          icon: "bolt",
          hint: "Nada exige equipamento",
          layout: "action",
          items: [
            { id: "c1", icon: "neck",  kind: "pratica", type: "Alongamento", minutes: 3, title: "Alongamento de pescoço", text: "Alívio para quem passa o dia em chamadas.", points: ["Incline a cabeça para a direita por 20 segundos", "Repita para a esquerda", "Faça três rodadas sem forçar"], cta: "Começar" },
            { id: "c2", icon: "hand",  kind: "pratica", type: "Alongamento", minutes: 2, title: "Alongamento de punhos", text: "Para quem digita muitas horas por dia.", points: ["Estenda o braço com a palma para cima", "Puxe os dedos suavemente por 15 segundos", "Repita com a palma para baixo"], cta: "Começar" },
            { id: "c3", icon: "rotate", kind: "pratica", type: "Mobilidade", minutes: 4, title: "Mobilidade de ombros", text: "Solta a tensão que se acumula sentado.", points: ["Gire os ombros para trás dez vezes", "Abra o peito com as mãos atrás da cabeça", "Respire fundo em cada abertura"], cta: "Começar" },
            { id: "c4", icon: "walk",  kind: "pratica", type: "Movimento", minutes: 5, title: "Caminhada de 5 minutos", text: "Circulação e cabeça mais leve.", points: ["Deixe o celular na mesa", "Caminhe sem destino definido", "Volte antes de decidir qualquer coisa"], cta: "Começar" },
            { id: "c5", icon: "eye",   kind: "pratica", type: "Pausa visual", minutes: 2, title: "Pausa da tela", text: "Regra simples para a fadiga ocular.", points: ["A cada 20 minutos", "Olhe algo distante por 20 segundos", "Pisque devagar para hidratar os olhos"], cta: "Começar" }
          ]
        }
      ],
      ergonomia: {
        title: "Como está seu espaço agora?",
        text: "Marque o que já está ajustado.",
        items: [
          { icon: "monitor", label: "Tela na altura dos olhos",   tip: "O topo da tela deve ficar na linha do olhar." },
          { icon: "feet",    label: "Pés apoiados no chão",       tip: "Se não alcançam, use uma caixa ou apoio." },
          { icon: "body",    label: "Ombros relaxados",           tip: "Cotovelos próximos ao corpo, em ângulo de 90 graus." },
          { icon: "lamp",    label: "Iluminação confortável",     tip: "Luz lateral evita reflexo e cansaço visual." },
          { icon: "clock",   label: "Pausas ao longo do dia",     tip: "Levante ao menos uma vez por hora." }
        ],
        results: {
          low:  "Vale ajustar um item hoje. Comece pelo mais simples.",
          mid:  "Bom caminho. Falta pouco para o espaço ficar confortável.",
          high: "Seu espaço está bem ajustado. Mantenha as pausas."
        }
      },
      contents: [
        { id: "c6", icon: "moon",  kind: "conteudo", type: "Guia",   minutes: 6, title: "Sono",      text: "Rotina de descanso para quem trabalha em ritmo intenso.", points: ["Horário de desligamento", "Luz e cafeína", "Como lidar com noites ruins"], cta: "Abrir" },
        { id: "c7", icon: "walk",  kind: "conteudo", type: "Vídeo",  minutes: 12, title: "Movimento", text: "Aula curta de mobilidade, sem equipamento.", points: ["Quadril e coluna", "Ombros e pescoço", "Versão de 5 e de 12 minutos"], cta: "Assistir" },
        { id: "c8", icon: "chair", kind: "conteudo", type: "Checklist", minutes: 4, title: "Ergonomia", text: "Ajustes de custo zero no home office.", points: ["Altura de tela e cadeira", "Apoio lombar improvisado", "Posição de teclado e mouse"], cta: "Abrir" },
        { id: "c9", icon: "bolt",  kind: "conteudo", type: "Artigo", minutes: 5, title: "Energia",    text: "O que sustenta o pique da tarde.", points: ["Pausa real no almoço", "Hidratação e luz natural", "Bloco de foco antes do cansaço"], cta: "Ler" }
      ]
    },

    /* ---------------------- CONEXÕES ---------------------- */
    conexoes: {
      icon: "connect",
      title: "Trabalho também é feito de relações",
      lead: "Pequenos gestos criam pertencimento.",
      stats: [
        { v: "6", k: "grupos ativos" },
        { v: "4", k: "ideias rápidas" },
        { v: "1", k: "reconhecimento por dia" }
      ],
      ideas: [
        { id: "x1", icon: "coffee", kind: "pratica", type: "Convite", minutes: 15, title: "Convide alguém para um café", text: "Sem pauta e sem apresentação.", points: ["Escolha alguém com quem você fala pouco", "Proponha 15 minutos", "Deixe o assunto de trabalho de fora"], cta: "Ver como" },
        { id: "x2", icon: "heart",  kind: "pratica", type: "Gesto",   minutes: 2, title: "Agradeça uma ajuda", text: "Reconhecimento específico vale mais que elogio genérico.", points: ["Diga exatamente o que ajudou", "Diga qual foi o efeito", "Envie hoje, não na sexta"], cta: "Ver como" },
        { id: "x3", icon: "compass", kind: "pratica", type: "Rede",   minutes: 20, title: "Conheça alguém de outra área", text: "A empresa fica menor quando você conhece gente.", points: ["Escolha uma área que aparece nas suas entregas", "Peça 20 minutos para entender o trabalho dela", "Anote uma coisa que você não sabia"], cta: "Ver como" },
        { id: "x4", icon: "spark",  kind: "pratica", type: "Partilha", minutes: 10, title: "Compartilhe um aprendizado", text: "Ensinar é a forma mais rápida de fixar.", points: ["Escolha algo que você aprendeu no mês", "Resuma em três frases", "Poste no canal do time"], cta: "Ver como" }
      ],
      groups: [
        { icon: "users", name: "Mulheres na tecnologia" },
        { icon: "users", name: "Pais e mães" },
        { icon: "users", name: "LGBTQIA+" },
        { icon: "users", name: "Pessoas com deficiência" },
        { icon: "users", name: "Raça e equidade" },
        { icon: "users", name: "Gerações" }
      ]
    },

    /* ---------------------- APRENDER ---------------------- */
    aprender: {
      icon: "learn",
      title: "Aprender também faz parte do cuidado",
      lead: "Escolha pelo tempo que você tem.",
      stats: [
        { v: "4", k: "conteúdos de 5 min" },
        { v: "5", k: "livros e mídias" },
        { v: "4", k: "plataformas" }
      ],
      blocks: [
        {
          id: "cinco",
          label: "Tenho 5 minutos",
          icon: "clock",
          hint: "Conteúdo rápido, ideia aplicável hoje",
          layout: "content",
          items: [
            { id: "a1", icon: "headphones", kind: "conteudo", type: "Podcast", minutes: 8, title: "Como criar limites em uma rotina acelerada", text: "Episódio curto sobre acordos de disponibilidade.", points: ["O custo do sempre disponível", "Três acordos simples de time", "Como combinar sem parecer indisponível"], cta: "Ouvir" },
            { id: "a2", icon: "doc",   kind: "conteudo", type: "Resumo", minutes: 5, title: "Resumo do mês: foco em ambientes barulhentos", text: "As ideias principais do livro do clube de leitura.", points: ["Blocos de trabalho profundo", "O mito do multitarefa", "Como medir seu tempo de foco"], cta: "Ler resumo" },
            { id: "a3", icon: "video", kind: "conteudo", type: "Vídeo",  minutes: 6, title: "Feedback em três frases", text: "Um modelo simples para conversas difíceis.", points: ["Situação", "Comportamento", "Impacto"], cta: "Assistir" },
            { id: "a4", icon: "spark", kind: "conteudo", type: "Prática", minutes: 5, title: "Uma pergunta melhor por dia", text: "Como fazer perguntas que destravam reuniões.", points: ["Troque perguntas fechadas por abertas", "Pergunte pelo critério, não pela opinião", "Silêncio também é técnica"], cta: "Abrir" }
          ]
        },
        {
          id: "novo",
          label: "Quero aprender algo novo",
          icon: "book",
          hint: "Livros, artigos, podcasts e vídeos",
          layout: "content",
          items: [
            { id: "a5", icon: "book",  kind: "conteudo", type: "Livro",   minutes: 240, title: "Clube de leitura do mês", text: "Encontro de discussão na última quinta.", points: ["Livro escolhido pelo time", "Encontro de uma hora", "Leitura disponível na biblioteca digital"], cta: "Entrar no clube" },
            { id: "a6", icon: "headphones", kind: "conteudo", type: "Podcast", minutes: 24, title: "Times que confiam", text: "Segurança psicológica na prática.", points: ["O que muda quando o erro pode ser dito", "Rituais que ajudam", "Papel da liderança"], cta: "Ouvir" },
            { id: "a7", icon: "doc",   kind: "conteudo", type: "Artigo",  minutes: 9, title: "People analytics sem planilha assustadora", text: "Como ler indicadores de pessoas.", points: ["Quais números importam", "Erros comuns de leitura", "Como levar dados para uma decisão"], cta: "Ler" },
            { id: "a8", icon: "video", kind: "conteudo", type: "Vídeo",   minutes: 15, title: "Apresentações que prendem atenção", text: "Estrutura, ritmo e slides.", points: ["Abertura em 30 segundos", "Uma ideia por slide", "Como fechar com pedido claro"], cta: "Assistir" },
            { id: "a9", icon: "spark", kind: "conteudo", type: "Trilha",  minutes: 180, title: "IA no dia a dia de trabalho", text: "Uso prático e responsável de IA generativa.", points: ["Onde a IA ajuda de verdade", "Cuidados com dados", "Exercícios aplicados à sua rotina"], cta: "Iniciar trilha" }
          ]
        }
      ],
      platforms: [
        { id: "p1", icon: "library", kind: "recurso", type: "Plataforma", title: "Biblioteca digital", text: "Mais de 12 mil títulos, leitura ilimitada.", points: ["Negócios, tecnologia e comportamento", "Acesso pelo e-mail corporativo", "Disponível no app e no navegador"], cta: "Acessar" },
        { id: "p2", icon: "cap",     kind: "recurso", type: "Plataforma", title: "Trilhas internas", text: "Cursos criados pelas áreas da empresa.", points: ["Liderança, dados e produto", "Certificado interno ao concluir", "Média de 4 horas por trilha"], cta: "Ver trilhas" },
        { id: "p3", icon: "globe",   kind: "recurso", type: "Programa",   title: "Bolsa de idiomas", text: "Subsídio para inglês e espanhol.", points: ["Até 70% de subsídio", "Aulas individuais ou em grupo", "Inscrições duas vezes por ano"], cta: "Ver regras" },
        { id: "p4", icon: "cap",     kind: "recurso", type: "Programa",   title: "Subsídio de pós e MBA", text: "Apoio para formação de longo prazo.", points: ["Cursos aprovados pelo comitê", "Janelas em março e setembro", "Aval da liderança necessário"], cta: "Ver regras" }
      ]
    }
  },

  /* ---------------------------------------------------------------
     BENEFÍCIOS
     --------------------------------------------------------------- */
  benefitCategories: ["Todos", "Saúde", "Bem-estar", "Financeiro", "Desenvolvimento", "Família", "Mobilidade"],

  benefits: [
    { id: "b01", icon: "cross",  category: "Saúde", name: "Plano de saúde", short: "Cobertura médica nacional para você e dependentes.", forWhat: "Consultas, exames, internações e pronto-socorro na rede credenciada.", how: "Carteirinha digital no aplicativo do plano.", highlight: true },
    { id: "b02", icon: "heart",  category: "Saúde", name: "Apoio psicológico", short: "Acolhimento profissional em momentos difíceis.", forWhat: "Apoio profissional em momentos que exigem cuidado emocional.", how: "Aplicativo do plano de saúde, aba Apoio emocional.", highlight: true, support: true },
    { id: "b03", icon: "phone",  category: "Saúde", name: "Telemedicina 24h", short: "Consulta por vídeo a qualquer hora.", forWhat: "Sintomas leves, dúvidas rápidas e renovação de receitas.", how: "Aplicativo do plano, aba Pronto atendimento digital." },
    { id: "b04", icon: "tooth",  category: "Saúde", name: "Plano odontológico", short: "Cobertura para consultas e tratamentos.", forWhat: "Limpeza, restauração, canal e urgência odontológica.", how: "Adesão pelo portal de pessoas em qualquer mês." },

    { id: "b05", icon: "bolt",   category: "Bem-estar", name: "Auxílio bem-estar", short: "Crédito mensal para atividade física.", forWhat: "Academias, estúdios, aulas e aplicativos de movimento.", how: "Cadastro no parceiro com o e-mail corporativo.", highlight: true },
    { id: "b06", icon: "chair",  category: "Bem-estar", name: "Kit ergonomia", short: "Apoio para montar seu espaço de trabalho.", forWhat: "Cadeira, suporte de monitor e apoio de pés no home office.", how: "Solicitação pelo portal, com aprovação da liderança." },
    { id: "b07", icon: "leaf",   category: "Bem-estar", name: "Check-up anual", short: "Exames preventivos sem custo.", forWhat: "Acompanhamento de saúde ao longo do ano.", how: "Agendamento pela clínica parceira, aba Check-up." },

    { id: "b08", icon: "piggy",  category: "Financeiro", name: "Previdência privada", short: "A empresa deposita junto com você.", forWhat: "Construir reserva de longo prazo com contrapartida da empresa.", how: "Adesão a qualquer momento pelo portal do fundo.", highlight: true },
    { id: "b09", icon: "shield", category: "Financeiro", name: "Seguro de vida", short: "Proteção financeira para a família.", forWhat: "Cobertura equivalente a 24 salários, com assistência funeral.", how: "Ativo automaticamente. Indique beneficiários no portal." },
    { id: "b10", icon: "chart",  category: "Financeiro", name: "Educação financeira", short: "Consultoria individual e trilhas.", forWhat: "Organizar orçamento, dívidas e primeiros investimentos.", how: "Agendamento pelo HUMAN, aba Meus Benefícios." },

    { id: "b11", icon: "cap",     category: "Desenvolvimento", name: "Subsídio de educação", short: "Até 70% em cursos aprovados.", forWhat: "Graduação, pós, MBA e certificações técnicas.", how: "Duas janelas por ano, em março e setembro." },
    { id: "b12", icon: "library", category: "Desenvolvimento", name: "Biblioteca digital", short: "Leitura ilimitada de 12 mil títulos.", forWhat: "Desenvolvimento contínuo no seu ritmo.", how: "Acesso com o e-mail corporativo, sem custo." },
    { id: "b13", icon: "globe",   category: "Desenvolvimento", name: "Bolsa de idiomas", short: "Inglês e espanhol com subsídio.", forWhat: "Preparo para atuação em times internacionais.", how: "Inscrição no portal, com aval da liderança." },

    { id: "b14", icon: "baby",   category: "Família", name: "Licença parental estendida", short: "180 e 60 dias, incluindo adoção.", forWhat: "Acompanhar os primeiros meses sem perda de renda.", how: "Solicitação pelo portal a partir do quinto mês." },
    { id: "b15", icon: "home",   category: "Família", name: "Auxílio creche", short: "Reembolso mensal até 5 anos.", forWhat: "Reduzir o custo de cuidado infantil na jornada de trabalho.", how: "Envio da nota fiscal pelo portal até o dia 20." },
    { id: "b16", icon: "heart",  category: "Família", name: "Apoio a cuidadores", short: "Orientação para quem cuida de alguém.", forWhat: "Conciliar cuidado de idosos ou pessoas com deficiência e trabalho.", how: "Contato com saúde ocupacional pelo HUMAN.", support: true },

    { id: "b17", icon: "bus",    category: "Mobilidade", name: "Vale transporte flexível", short: "Saldo que você distribui como quiser.", forWhat: "Transporte público, aplicativos e combustível.", how: "Aplicativo do cartão, aba Redistribuir saldo." },
    { id: "b18", icon: "bike",   category: "Mobilidade", name: "Bicicletário e vestiário", short: "Estrutura para quem vai pedalando.", forWhat: "Deslocamento ativo até o escritório.", how: "Cadastro na recepção do prédio." },
    { id: "b19", icon: "laptop", category: "Mobilidade", name: "Trabalho híbrido", short: "Dias definidos por time.", forWhat: "Equilibrar deslocamento, foco e vida pessoal.", how: "Acordo registrado com a liderança no portal.", highlight: true }
  ],

  /* ---------------------------------------------------------------
     5 MINUTOS PARA MIM
     --------------------------------------------------------------- */
  pauseOptions: [2, 5, 10, 15],

  pauses: {
    2: [
      { icon: "breath", kind: "Respiração", title: "Respiração em caixa", text: "Inspire por 4, segure por 4, expire por 4, segure por 4.", why: "Baixa a sensação de aceleração antes de uma reunião." },
      { icon: "eye",    kind: "Pausa visual", title: "Pausa da tela", text: "Olhe um ponto distante por 20 segundos e pisque devagar.", why: "Alivia a fadiga de quem passa o dia em telas." },
      { icon: "desk",   kind: "Ambiente", title: "Organizar a mesa", text: "Deixe visível só o que você vai usar na próxima hora.", why: "Menos estímulo por perto, menos dispersão." },
      { icon: "water",  kind: "Rotina", title: "Um copo de água longe da tela", text: "Levante, sirva e beba sem o celular na mão.", why: "Quebra o piloto automático em menos de dois minutos." }
    ],
    5: [
      { icon: "neck",   kind: "Alongamento", title: "Alongamento na cadeira", text: "Pescoço, tronco e punhos, 20 segundos em cada lado.", why: "Reduz o desconforto que aparece no fim do dia." },
      { icon: "walk",   kind: "Movimento", title: "Caminhada curta", text: "Cinco minutos pelo corredor ou pelo quarteirão.", why: "Melhora a circulação e organiza o pensamento." },
      { icon: "heart",  kind: "Conexão", title: "Mensagem de reconhecimento", text: "Escreva para alguém do time citando algo específico.", why: "Fortalece o vínculo de quem envia e de quem recebe." },
      { icon: "target", kind: "Foco", title: "Descarga mental", text: "Anote tudo o que ocupa sua cabeça e circule o que é seu.", why: "Diminui a carga de manter tudo na memória." }
    ],
    10: [
      { icon: "walk",   kind: "Movimento", title: "Caminhada sem destino", text: "Dez minutos sem celular e sem decidir nada.", why: "Movimento leve ajuda a resolver o que estava travado." },
      { icon: "book",   kind: "Leitura", title: "Leitura curta", text: "Um artigo da biblioteca e uma ideia anotada.", why: "Aprendizado curto e aplicado rende mais que volume." },
      { icon: "calendar", kind: "Agenda", title: "Organização da agenda", text: "Proteja dois blocos de foco na sua semana.", why: "Foco não sobra no fim do dia, ele precisa de espaço." },
      { icon: "desk",   kind: "Ambiente", title: "Reset do espaço", text: "Escolha uma superfície e deixe só o essencial.", why: "Ambiente mais limpo, cabeça mais leve." }
    ],
    15: [
      { icon: "rotate", kind: "Movimento", title: "Mobilidade completa", text: "Sequência de quadril, coluna e ombros sem equipamento.", why: "Quinze minutos mudam a qualidade do fim do expediente." },
      { icon: "headphones", kind: "Aprender", title: "Um episódio, uma ideia", text: "Ouça um podcast curto e anote uma coisa para testar.", why: "Aprender também é uma forma de pausa." },
      { icon: "coffee", kind: "Conexão", title: "Conversa não agendada", text: "Chame alguém do time para 15 minutos sem pauta.", why: "Relações se constroem fora das reuniões de status." },
      { icon: "list",   kind: "Foco", title: "Pausa completa", text: "Saia da mesa, coma algo devagar e volte sem pressa.", why: "Pausa real na tarde sustenta a energia até o fim." }
    ]
  },

  /* ---------------------------------------------------------------
     HISTÓRIAS
     --------------------------------------------------------------- */
  stories: [
    { id: "s1", name: "Marina A.", role: "Operações, Recife", theme: "Benefícios", quote: "Descobri o auxílio creche depois de um ano de casa. A informação existia, eu é que não achava." },
    { id: "s2", name: "Rafael T.", role: "Dados, remoto", theme: "5 Minutos", quote: "Comecei com dois minutos entre reuniões. Hoje é a única coisa da rotina que eu não negocio." },
    { id: "s3", name: "Juliana P.", role: "Comercial, São Paulo", theme: "Conexões", quote: "Um café com o time de produto virou projeto conjunto três meses depois." },
    { id: "s4", name: "Diego M.", role: "Financeiro, Curitiba", theme: "Benefícios", quote: "A consultoria financeira organizou minhas dívidas. Foi o benefício que mais mudou meu ano." },
    { id: "s5", name: "Ana L.", role: "Jurídico, Salvador", theme: "Corpo", quote: "Ajustei a altura da tela em cinco minutos e a dor no pescoço sumiu em uma semana." },
    { id: "s6", name: "Tiago R.", role: "Suporte, Manaus", theme: "Mente", quote: "O roteiro de conversa com a liderança me ajudou a pedir prazo sem travar." }
  ],

  /* ---------------------------------------------------------------
     APOIO
     --------------------------------------------------------------- */
  support: [
    { icon: "phone",  name: "Canal de acolhimento 24h", what: "Atendimento sigiloso com psicólogos, todos os dias.", how: "0800 000 0000 e chat no aplicativo", tone: "primary" },
    { icon: "scale",  name: "Orientação jurídica e financeira", what: "Dúvidas sobre dívidas, contratos e orçamento familiar.", how: "Agendamento no portal, retorno em 48h" },
    { icon: "cross",  name: "Saúde ocupacional", what: "Afastamentos, retorno ao trabalho e adaptações.", how: "saude@empresa.com, resposta em 2 dias úteis" },
    { icon: "shield", name: "Canal de ética e conduta", what: "Registro de assédio, discriminação ou desvio de conduta.", how: "Portal independente, com opção de anonimato" },
    { icon: "users",  name: "Rede de apoio entre pares", what: "Colegas treinados como primeiros ouvintes.", how: "Lista disponível no hub Conexões" },
    { icon: "heart",  name: "Apoio psicológico do plano", what: "Sessões com psicólogos da rede credenciada.", how: "Aplicativo do plano, aba Apoio emocional" }
  ],

  /* ---------------------------------------------------------------
     PARA VOCÊ HOJE
     --------------------------------------------------------------- */
  todaySuggestions: [
    { icon: "sun",    period: "Manhã",             minutes: 2, title: "Respiração",     link: "#/pausa?t=2" },
    { icon: "coffee", period: "Meio do dia",       minutes: 5, title: "Alongamento",    link: "#/dimensao/corpo" },
    { icon: "cloud",  period: "Tarde",             minutes: 5, title: "Reconhecimento", link: "#/dimensao/conexoes" },
    { icon: "moon",   period: "Fim do expediente", minutes: 3, title: "Encerramento",   link: "#/dimensao/mente" }
  ],

  /* ---------------------------------------------------------------
     O CASE
     --------------------------------------------------------------- */
  caseStudy: {
    blocks: [
      { icon: "alert",  label: "Desafio",    text: "Informações, benefícios e recursos podem estar dispersos em muitos canais." },
      { icon: "compass", label: "Estratégia", text: "Organizar a experiência a partir das necessidades dos colaboradores." },
      { icon: "spark",  label: "Solução",    text: "HUMAN, um hub digital de Employee Experience e bem-estar." },
      { icon: "chip",   label: "Tecnologia", text: "Produto prototipado e desenvolvido com apoio de Inteligência Artificial." },
      { icon: "heart",  label: "Princípio",  text: "Tecnologia como meio. Cuidado como propósito." }
    ],
    flow: [
      { icon: "users",  t: "Necessidade", d: "O que você precisa hoje?" },
      { icon: "compass", t: "Caminho",    d: "Seis jornadas simples" },
      { icon: "grid",   t: "Hub",         d: "Conteúdo, prática ou benefício" },
      { icon: "check",  t: "Ação",        d: "Algo para fazer agora" }
    ],
    principles: [
      { icon: "compass", t: "Necessidade antes de estrutura", d: "A navegação segue a intenção, não o organograma." },
      { icon: "chat",    t: "Linguagem sem jargão",           d: "O que é, para que serve e como acessar." },
      { icon: "bolt",    t: "Ação em três cliques",           d: "Todo conteúdo tem um próximo passo claro." },
      { icon: "heart",   t: "Cuidado sem clínica",            d: "O produto informa e direciona, não diagnostica." }
    ],
    metrics: [
      { v: "68%", k: "Adoção mensal", d: "meta de 12 meses" },
      { v: "+31%", k: "Uso de benefícios", d: "aumento projetado" },
      { v: "3", k: "Cliques até o recurso", d: "no máximo" },
      { v: "+14", k: "eNPS de experiência", d: "variação estimada" }
    ]
  },

  /* =================================================================
     SETEMBRO AMARELO — Especial dentro do HUMAN
     "Cuidar da vida não cabe em um mês."

     Estrutura de uma experiência (banco escalável):
     { id, titulo, categoria: "pausa"|"movimento"|"conexao"|"descoberta",
       tempo: 2|5|15|30|60, tempoLivre: bool (true = "sem tempo fixo"),
       icon, texto, precisa, onde, passos: [], buscar: string|null,
       usaTimer: bool, tags: [] }

     categoria também é usada pelo jogo "Escolha uma carta" e pelas
     mensagens de reconhecimento (uma "voz" por categoria).
     ================================================================= */
  setembroAmarelo: {

    entrada: {
      eyebrow: "Especial Setembro Amarelo 💛",
      title: "Cuidar da vida não cabe em um mês.",
      text: "Setembro coloca o cuidado em evidência. O HUMAN quer ajudar você a encontrar pequenos espaços para si, hoje e durante todo o ano.",
      cta: "Explorar o especial"
    },

    contexto: {
      title: "Por que Setembro Amarelo?",
      cards: [
        { icon: "calendar", title: "10 de setembro", text: "Dia Mundial de Prevenção do Suicídio — a data que dá nome ao mês de conscientização." },
        { icon: "heart", title: "Uma campanha, não um limite", text: "Setembro Amarelo é um movimento de conscientização e prevenção. Falar sobre cuidado não deveria caber em um mês só." },
        { icon: "shieldCheck", title: "Cuidado também é coletivo", text: "Pequenos gestos, escuta e acesso a apoio fazem parte da prevenção no dia a dia, o ano inteiro." }
      ],
      closing: "Setembro nos convida a falar sobre a vida.\nO cuidado continua quando o mês termina."
    },

    precisaHoje: [
      { id: "desacelerar", label: "Quero desacelerar", icon: "moon", tags: ["descansar"] },
      { id: "mover", label: "Quero me movimentar", icon: "walk", tags: ["movimentar"] },
      { id: "descobrir", label: "Quero descobrir algo novo", icon: "spark", tags: ["novo"] },
      { id: "ouvir", label: "Quero ouvir algo", icon: "headphones", tags: ["casa", "sozinho"] },
      { id: "sair", label: "Quero sair de casa", icon: "leaf", tags: ["sair"] },
      { id: "conectar", label: "Quero me conectar", icon: "users", tags: ["alguem"] },
      { id: "mente", label: "Quero alimentar minha mente", icon: "book", tags: ["novo", "casa"] },
      { id: "conversar", label: "Quero conversar", icon: "chat", tags: ["alguem"] },
      { id: "sortear", label: "Não sei. Escolha por mim.", icon: "shuffle", tags: [] }
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
      { id: "alguem",     label: "Com alguém" },
      { id: "novo",       label: "Experimentar algo novo" },
      { id: "movimentar", label: "Movimentar" },
      { id: "descansar",  label: "Descansar" }
    ],

    categorias: {
      pausa:      { label: "Pausa",      icon: "moon" },
      movimento:  { label: "Movimento",  icon: "walk" },
      conexao:    { label: "Conexão",    icon: "users" },
      descoberta: { label: "Descoberta", icon: "spark" }
    },

    experiencias: [
      { id: "e01", titulo: "Respire comigo", categoria: "pausa", tempo: 2, icon: "breath", texto: "Um ciclo curto de respiração para desacelerar agora.", precisa: "Nada, só um instante.", onde: "Onde você estiver.", passos: ["Inspire por 4 tempos", "Segure por 4 tempos", "Expire por 6 tempos"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e02", titulo: "Olhe para longe", categoria: "pausa", tempo: 2, icon: "eye", texto: "Descanse a vista de quem passou o dia em telas.", precisa: "Nada.", onde: "Perto de uma janela, se tiver uma por perto.", passos: ["Escolha um ponto distante", "Fixe o olhar nele por 20 segundos", "Pisque devagar algumas vezes"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e03", titulo: "Água sem pressa", categoria: "pausa", tempo: 2, icon: "water", texto: "Levante, sirva um copo de água e beba sem o celular na mão.", precisa: "Um copo d'água.", onde: "Na cozinha ou por perto.", passos: ["Levante-se devagar", "Sirva o copo com atenção", "Beba sem pressa, sem tela"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e04", titulo: "Solte os ombros", categoria: "pausa", tempo: 2, icon: "neck", texto: "Um alívio rápido para a tensão que se acumula sentado.", precisa: "Nada.", onde: "Onde você estiver sentado.", passos: ["Suba os ombros até as orelhas", "Solte devagar, soltando o ar junto", "Repita três vezes"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e05", titulo: "Observe cinco coisas ao seu redor", categoria: "pausa", tempo: 2, icon: "eye", texto: "Um pequeno exercício de presença, sem precisar de nada além de olhar.", precisa: "Nada.", onde: "Onde você estiver.", passos: ["Nomeie cinco coisas que você vê", "Repare em uma cor que chamou atenção", "Volte para o que estava fazendo, sem pressa"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },

      { id: "e06", titulo: "Uma música, nada mais", categoria: "pausa", tempo: 5, icon: "music", texto: "Ouça uma música inteira sem fazer outra coisa ao mesmo tempo.", precisa: "Fones ou uma caixinha de som.", onde: "Onde você estiver.", passos: ["Escolha uma música que você gosta", "Ouça do início ao fim", "Evite mexer no celular enquanto ela toca"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e07", titulo: "Cinco minutos sem telas", categoria: "pausa", tempo: 5, icon: "monitor", texto: "Uma pequena pausa de verdade, longe de qualquer tela.", precisa: "Nada.", onde: "Onde você estiver.", passos: ["Deixe o celular em outro cômodo, se possível", "Fique com os próprios pensamentos", "Volte quando o tempo acabar"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e08", titulo: "Caminhe um pouquinho", categoria: "movimento", tempo: 5, icon: "walk", texto: "Um passeio curto para colocar o corpo em movimento.", precisa: "Um espaço para andar.", onde: "No quarteirão, no corredor ou no quintal.", passos: ["Levante-se e caminhe sem destino", "Preste atenção nos passos", "Volte no seu ritmo"], usaTimer: true, tags: ["sair", "movimentar", "sozinho"] },
      { id: "e09", titulo: "Arrume um pequeno cantinho", categoria: "pausa", tempo: 5, icon: "desk", texto: "Organize uma superfície pequena, só para respirar melhor no espaço.", precisa: "Nada além do que já está aí.", onde: "Uma mesa, prateleira ou gaveta.", passos: ["Escolha um espaço pequeno", "Deixe visível só o essencial", "Aproveite o resultado por um instante"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e10", titulo: "Faça absolutamente nada por 5 minutos", categoria: "pausa", tempo: 5, icon: "moon", texto: "Sem tarefa, sem meta. Só um tempo livre de verdade.", precisa: "Nada.", onde: "Onde você estiver confortável.", passos: ["Sente-se ou deite-se", "Não tente preencher o tempo com nada", "Deixe o tempo passar"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e11", titulo: "Aprenda cinco palavras em outro idioma", categoria: "descoberta", tempo: 5, icon: "globe", texto: "Uma curiosidade pequena para levar com você.", precisa: "Nada, ou um app de idiomas se preferir.", onde: "Onde você estiver.", passos: ["Escolha um idioma que desperte curiosidade", "Aprenda cinco palavras novas", "Tente lembrar delas mais tarde"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e12", titulo: "Ouça sons da natureza", categoria: "pausa", tempo: 5, icon: "leaf", texto: "Um fundo sonoro simples para desacelerar.", precisa: "Fones, se preferir.", onde: "Onde você estiver.", passos: ["Procure um som de chuva, mar ou floresta", "Feche os olhos, se quiser", "Só escute, sem outro objetivo"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e13", titulo: "Cuide de uma planta", categoria: "pausa", tempo: 5, icon: "leaf", texto: "Um cuidado pequeno com algo vivo por perto.", precisa: "Uma planta, se você tiver uma.", onde: "Em casa.", passos: ["Regue ou limpe as folhas", "Observe como ela está", "Aproveite o momento sem pressa"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e14", titulo: "Reveja fotos de momentos bons", categoria: "pausa", tempo: 5, icon: "camera", texto: "Um passeio rápido por lembranças que fazem bem.", precisa: "Seu celular ou um álbum.", onde: "Onde você estiver.", passos: ["Abra a galeria ou um álbum físico", "Escolha um período para revisitar", "Pare em uma foto que te faça sorrir"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },

      { id: "e15", titulo: "Desenhe alguma coisa", categoria: "descoberta", tempo: 15, icon: "pencil", texto: "Não precisa saber desenhar. Só precisa começar.", precisa: "Papel e caneta, ou o dedo na tela.", onde: "Onde você estiver.", passos: ["Escolha qualquer objeto ou ideia", "Desenhe sem se preocupar com o resultado", "Guarde ou apague, como preferir"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e16", titulo: "Fotografe cinco coisas interessantes", categoria: "descoberta", tempo: 15, icon: "camera", texto: "Um pequeno exercício de olhar com mais atenção.", precisa: "Seu celular.", onde: "Em casa ou pela vizinhança.", passos: ["Saia ou circule pelo espaço", "Fotografe cinco coisas que chamem atenção", "Reveja as fotos ao final"], usaTimer: true, tags: ["sair", "sozinho", "novo"] },
      { id: "e17", titulo: "Aprenda um origami", categoria: "descoberta", tempo: 15, icon: "pencil", texto: "Uma dobradura simples, só para experimentar algo novo com as mãos.", precisa: "Uma folha de papel.", onde: "Onde você estiver.", passos: ["Procure um modelo simples", "Siga o passo a passo com calma", "Não tem problema se não sair perfeito"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e18", titulo: "Escreva sem objetivo", categoria: "descoberta", tempo: 15, icon: "doc", texto: "Coloque no papel o que vier, sem se preocupar com sentido.", precisa: "Papel e caneta, ou um bloco de notas.", onde: "Onde você estiver.", passos: ["Escreva o que vier à cabeça", "Não se preocupe com ortografia ou coerência", "Pare quando quiser"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e19", titulo: "Dance três músicas", categoria: "movimento", tempo: 15, icon: "music", texto: "Movimente o corpo do seu jeito, sem coreografia nenhuma.", precisa: "Uma playlist.", onde: "Em casa.", passos: ["Escolha três músicas que você goste", "Dance do seu jeito, sem se cobrar", "Sinta o corpo se soltando aos poucos"], usaTimer: true, tags: ["casa", "movimentar"] },
      { id: "e20", titulo: "Ligue para alguém", categoria: "conexao", tempo: 15, icon: "phone", texto: "Uma conversa de voz, sem ser por mensagem.", precisa: "Seu celular.", onde: "Onde você estiver à vontade.", passos: ["Escolha alguém que você queira ouvir", "Ligue sem um motivo especial", "Aproveite a conversa"], usaTimer: false, tags: ["alguem"] },
      { id: "e21", titulo: "Tome um café sem celular", categoria: "pausa", tempo: 15, icon: "coffee", texto: "Uma pausa de verdade para uma bebida que você gosta.", precisa: "Café, chá ou o que preferir.", onde: "Em casa ou em algum lugar tranquilo.", passos: ["Prepare a bebida com calma", "Deixe o celular longe da mesa", "Beba prestando atenção no sabor"], usaTimer: true, tags: ["sozinho", "descansar"] },
      { id: "e22", titulo: "Ouça música instrumental", categoria: "pausa", tempo: 15, icon: "music", texto: "Um fundo sonoro sem letra, só para acompanhar o silêncio.", precisa: "Fones ou caixinha de som.", onde: "Onde você estiver.", passos: ["Escolha uma playlist instrumental", "Feche os olhos, se quiser", "Deixe a mente descansar um pouco"], usaTimer: true, tags: ["casa", "sozinho", "descansar"] },
      { id: "e23", titulo: "Brinque com um animal", categoria: "conexao", tempo: 15, icon: "paw", texto: "Um momento leve de companhia, se você tiver um animal por perto.", precisa: "Um animal de estimação, seu ou de alguém próximo.", onde: "Em casa.", passos: ["Escolha um brinquedo ou brincadeira simples", "Dedique esse tempo só a isso", "Aproveite a companhia"], usaTimer: true, tags: ["casa", "sozinho"] },

      { id: "e24", titulo: "Experimente crochê", categoria: "descoberta", tempo: 30, icon: "hand", texto: "Um primeiro contato com um ponto simples de crochê.", precisa: "Linha e agulha de crochê.", onde: "Onde você estiver sentado.", passos: ["Procure um tutorial de ponto básico", "Tente reproduzir devagar", "Não tem problema errar no início"], usaTimer: true, tags: ["casa", "sozinho", "novo"] },
      { id: "e25", titulo: "Cozinhe algo diferente", categoria: "descoberta", tempo: 30, icon: "pan", texto: "Prepare uma receita nova, mesmo que simples.", precisa: "Ingredientes básicos que você já tenha.", onde: "Na cozinha.", passos: ["Escolha uma receita curta e simples", "Separe os ingredientes", "Cozinhe com calma, sem pressa"], usaTimer: true, tags: ["casa", "novo"] },
      { id: "e26", titulo: "Comece um livro", categoria: "descoberta", tempo: 30, icon: "book", texto: "Os primeiros capítulos de algo novo, sem compromisso de terminar.", precisa: "Um livro, físico ou digital.", onde: "Onde você estiver confortável.", passos: ["Escolha um livro que desperte curiosidade", "Leia os primeiros capítulos", "Pare quando quiser, sem cobrança"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e27", titulo: "Faça um quebra-cabeça", categoria: "descoberta", tempo: 30, icon: "puzzle", texto: "Um tempo de atenção simples, peça por peça.", precisa: "Um quebra-cabeça físico ou um aplicativo.", onde: "Em casa.", passos: ["Escolha um quebra-cabeça de qualquer tamanho", "Monte com calma", "Continue depois, se preferir"], usaTimer: true, tags: ["casa", "sozinho"] },
      { id: "e28", titulo: "Faça um passeio de bicicleta", categoria: "movimento", tempo: 30, icon: "bike", texto: "Movimento ao ar livre, no seu ritmo.", precisa: "Uma bicicleta.", onde: "Pela vizinhança ou uma ciclovia.", passos: ["Escolha um trajeto tranquilo", "Pedale no seu próprio ritmo", "Aproveite o ar livre"], usaTimer: true, tags: ["sair", "movimentar"] },
      { id: "e29", titulo: "Convide alguém para caminhar", categoria: "conexao", tempo: 30, tempoLivre: true, icon: "users", texto: "Uma companhia para colocar o corpo em movimento junto.", precisa: "Alguém disponível.", onde: "Pela vizinhança ou um parque.", passos: ["Chame alguém para caminhar com você", "Combine um horário simples", "Aproveite a companhia e o movimento"], usaTimer: false, tags: ["alguem", "movimentar"] },
      { id: "e30", titulo: "Faça algo gentil por alguém", categoria: "conexao", tempo: 30, tempoLivre: true, icon: "heart", texto: "Um gesto pequeno, sem esperar nada em troca.", precisa: "Nada além de disposição.", onde: "Onde for possível.", passos: ["Pense em alguém que possa gostar de um gesto seu", "Escolha algo simples de fazer", "Não precisa avisar que foi você"], usaTimer: false, tags: ["alguem"] },

      { id: "e31", titulo: "Conheça um parque", categoria: "movimento", tempo: 60, tempoLivre: true, icon: "leaf", texto: "Um passeio ao ar livre para colocar o corpo e a cabeça em outro ritmo.", precisa: "Disposição para sair.", onde: "Um parque perto de você.", passos: ["Separe um tempo livre na sua agenda", "Vá sem pressa, sem compromisso de exercício"], buscar: "Pesquise: parque gratuito perto de mim", usaTimer: false, tags: ["sair", "movimentar"] },
      { id: "e32", titulo: "Procure uma atividade gratuita na sua cidade", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "compass", texto: "Descubra o que já existe pertinho de você.", precisa: "Alguns minutos para pesquisar.", onde: "Na sua cidade.", passos: ["Pesquise a agenda cultural da sua região", "Escolha algo que desperte curiosidade"], buscar: "Pesquise: agenda cultural gratuita + sua cidade", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e33", titulo: "Conheça uma biblioteca pública", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "library", texto: "Um espaço tranquilo e gratuito para explorar.", precisa: "Disposição para sair.", onde: "Uma biblioteca pública perto de você.", passos: ["Procure a biblioteca mais próxima", "Reserve um tempo para conhecer o espaço"], buscar: "Pesquise: biblioteca pública perto de mim", usaTimer: false, tags: ["sair", "sozinho", "novo"] },
      { id: "e34", titulo: "Procure atividade física gratuita", categoria: "movimento", tempo: 60, tempoLivre: true, icon: "target", texto: "Muitas cidades oferecem aulas abertas e gratuitas.", precisa: "Disposição para pesquisar e sair.", onde: "Praças, parques ou centros esportivos.", passos: ["Pesquise opções gratuitas na sua região", "Escolha uma para experimentar"], buscar: "Pesquise: atividade física gratuita perto de mim", usaTimer: false, tags: ["sair", "movimentar"] },
      { id: "e35", titulo: "Assista ao pôr do sol", categoria: "pausa", tempo: 60, tempoLivre: true, icon: "sunset", texto: "Um momento simples de pausa observando o fim do dia.", precisa: "Nada além de um lugar com vista.", onde: "Uma janela, varanda ou espaço aberto.", passos: ["Reserve um tempo perto do fim da tarde", "Fique alguns minutos só observando"], usaTimer: false, tags: ["sair", "sozinho", "descansar"] },
      { id: "e36", titulo: "Assista novamente a um filme que gosta", categoria: "pausa", tempo: 60, tempoLivre: true, icon: "video", texto: "O conforto de algo que você já conhece.", precisa: "Um filme que você já ama.", onde: "Onde você estiver confortável.", passos: ["Escolha um filme que já te fez bem antes", "Assista sem multitarefa"], usaTimer: false, tags: ["casa", "sozinho", "descansar"] },
      { id: "e37", titulo: "Conheça uma feira da sua cidade", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "map", texto: "Um passeio simples por algo diferente da rotina.", precisa: "Disposição para sair.", onde: "Uma feira ou mercado perto de você.", passos: ["Pesquise feiras próximas", "Vá sem pressa, só para conhecer"], buscar: "Pesquise: feira ou mercado perto de mim", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e38", titulo: "Visite uma exposição gratuita", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "spark", texto: "Um pouco de arte ou cultura no seu tempo livre.", precisa: "Disposição para sair.", onde: "Um espaço cultural perto de você.", passos: ["Pesquise exposições gratuitas na sua região", "Reserve um tempo para visitar"], buscar: "Pesquise: exposição gratuita + sua cidade", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e39", titulo: "Experimente uma aula aberta", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "cap", texto: "Uma primeira experiência com algo que você nunca tentou.", precisa: "Disposição para pesquisar e experimentar.", onde: "Um espaço com aulas abertas na sua região.", passos: ["Pesquise aulas experimentais gratuitas", "Escolha uma que desperte curiosidade"], buscar: "Pesquise: aula aberta gratuita + sua cidade", usaTimer: false, tags: ["sair", "novo"] },
      { id: "e40", titulo: "Conheça um lugar da sua cidade onde nunca esteve", categoria: "descoberta", tempo: 60, tempoLivre: true, icon: "map", texto: "Um pequeno passeio de descoberta, pertinho de casa.", precisa: "Disposição para sair.", onde: "Algum canto da sua própria cidade.", passos: ["Escolha um bairro ou lugar que você nunca visitou", "Vá com calma, sem roteiro fixo"], buscar: "Pesquise: lugares para conhecer perto de mim", usaTimer: false, tags: ["sair", "novo"] }
    ],

    /* ---------------------------------------------------------------
       MENSAGENS DE RECONHECIMENTO — por categoria, com variações
       para não repetir sempre a mesma frase.
       --------------------------------------------------------------- */
    mensagensReconhecimento: {
      pausa: [
        "♥ Você escolheu parar por você.\n\nForam apenas alguns minutos no relógio, mas houve uma escolha importante aqui: você criou um espaço para respirar e desacelerar.\n\nPequenos cuidados também contam.",
        "♥ Você deu um tempo para si.\n\nNão mudou o dia inteiro, mas mudou esse momento. E esse momento era seu.\n\nIsso já vale alguma coisa."
      ],
      movimento: [
        "♥ Você colocou seu corpo em movimento.\n\nNão importa a distância ou o ritmo. Hoje você escolheu reservar um momento para você.\n\nEsse passo merece ser reconhecido.",
        "♥ Você se moveu por você.\n\nMesmo que tenha sido pouco, foi uma escolha sua, no seu tempo.\n\nIsso conta."
      ],
      conexao: [
        "♥ Você escolheu se aproximar de alguém.\n\nUm gesto, uma ligação, uma companhia: pequenas conexões também são cuidado.\n\nObrigado por ter feito esse movimento.",
        "♥ Você compartilhou um momento com alguém.\n\nNem sempre cuidar de si significa estar sozinho. Às vezes é justamente o contrário.\n\nEsse passo importa."
      ],
      descoberta: [
        "♥ Você abriu espaço para algo novo.\n\nExperimentar, criar ou aprender também é uma forma de cuidar de si.\n\nParabéns por ter tentado.",
        "♥ Você escolheu sair da rotina, ainda que por pouco tempo.\n\nCuriosidade também é autocuidado.\n\nEsse momento é seu."
      ],
      semTimer: "♥ Você fez por você.\n\nNão importa se foi rápido ou se durou a tarde inteira. Você escolheu reservar esse espaço.\n\nEsse passo merece ser reconhecido.",
      interrompida: "♥ O que você conseguiu fazer hoje também conta.\n\nVocê não precisava chegar até o final para esse momento ter valor.\n\nVocê começou. E esse passo importa."
    },

    /* ---------------------------------------------------------------
       JOGOS — sem ranking, sem pontuação, sem competição.
       --------------------------------------------------------------- */
    jogos: {
      titulo: "Um momento leve também pode ser um momento por você.",

      encontreEmVoce: {
        titulo: "Encontre em Você",
        intro: "É comum reconhecermos qualidades nas pessoas ao nosso redor e esquecermos de olhar com a mesma atenção para nós.",
        palavras: ["CORAGEM", "FORCA", "VALOR", "POTENCIAL", "TALENTO", "GENTILEZA", "CRIATIVIDADE", "RESILIENCIA", "IMPORTANCIA", "AUTENTICIDADE"],
        reflexao: "Essas palavras estavam escondidas aqui.\n\nTalvez algumas delas também estejam mais escondidas em você do que deveriam.\n\nNão significa que precisamos nos sentir fortes, corajosos ou confiantes todos os dias. Mas podemos aprender a reconhecer nossas qualidades com a mesma generosidade que usamos para enxergar as dos outros."
      },

      poteDasCoisasBoas: {
        titulo: "Coisas que eu quero guardar",
        text: "Nem todo dia precisa ser extraordinário para ter alguma coisa que vale a pena guardar.\n\nPode ter sido uma conversa, uma comida gostosa, uma risada, uma música, algo que você conseguiu fazer, um momento tranquilo ou simplesmente algo pequeno que chamou sua atenção.",
        pergunta: "O que você gostaria de guardar de hoje?",
        placeholder: "Escreva aqui...",
        cta: "💛 Colocar no meu pote",
        vazio: "Seu pote ainda está vazio. Quando quiser, guarde a primeira coisa boa do seu dia."
      },

      escolhaUmaCarta: {
        titulo: "Escolha uma carta",
        intro: "Cada carta representa um caminho possível. Escolha a que fizer sentido agora.",
        cartas: [
          { categoria: "pausa", label: "PAUSA", icon: "moon" },
          { categoria: "movimento", label: "MOVIMENTO", icon: "walk" },
          { categoria: "conexao", label: "CONEXÃO", icon: "users" },
          { categoria: "descoberta", label: "DESCOBERTA", icon: "spark" }
        ]
      },

      roleta: {
        titulo: "Por Mim Hoje",
        intro: "Gire e deixe a roleta escolher por você. Sempre com opções diferentes.",
        tamanhoRodada: 6
      }
    },

    /* ---------------------------------------------------------------
       APOIO — separado das atividades recreativas
       --------------------------------------------------------------- */
    apoio: {
      title: "Preciso conversar",
      text: "Você não precisa lidar com tudo sozinho.\n\nSe estiver passando por um momento difícil e quiser conversar, existem espaços de escuta e apoio.",
      canais: [
        { icon: "phone", nome: "CVV — Centro de Valorização da Vida", telefone: "188", texto: "Ligação gratuita, disponível 24 horas por dia, todos os dias, em todo o Brasil.", site: "https://cvv.org.br/" },
        { icon: "chat", nome: "Pode Falar", texto: "Espaço de apoio emocional voltado ao público jovem." }
      ]
    },

    /* ---------------------------------------------------------------
       MEU TEMPO POR MIM
       --------------------------------------------------------------- */
    meuTempo: {
      title: "Meu Tempo por Mim",
      hint: "Um calendário afetivo dos momentos que você reservou para si. Não é uma cobrança — é um registro.",
      vazio: "Ainda não há momentos guardados aqui. Quando você registrar um ♥, ele aparece neste calendário.",
      encerramento: "Setembro acaba. O cuidado continua."
    },

    /* ---------------------------------------------------------------
       FEEDBACK
       --------------------------------------------------------------- */
    feedback: {
      eyebrow: "💬 Sua experiência também importa",
      title: "Conta pra gente 💛",
      text: "Como está sendo sua experiência com o HUMAN? Teve alguma experiência que fez bem para o seu dia? Descobriu algo novo? Tem alguma sugestão?\n\nQueremos continuar construindo uma experiência que faça sentido para quem está do outro lado.",
      placeholderNome: "Seu nome",
      placeholderMsg: "Conte pra gente...",
      consentimento: "Autorizo que meu comentário seja exibido de forma pública no HUMAN.",
      cta: "Enviar feedback ♥",
      confirmacao: "Recebemos sua mensagem. 💛\nObrigada por dedicar alguns minutos para ajudar o HUMAN a evoluir."
    },

    disclaimer: "O HUMAN informa, incentiva práticas de autocuidado e facilita caminhos de acesso. Não realiza diagnósticos e não substitui acompanhamento profissional."
  }
};
