# HUMAN · Hub de Experiência e Bem-estar do Colaborador

> **Tecnologia como meio. Cuidado como propósito.**

Projeto conceitual de portfólio em Employee Experience, Transformação Digital e uso de IA aplicada ao RH.
Empresa, benefícios, dados e histórias são **fictícios** e existem para demonstrar a experiência.

---

## O desafio

Informações, benefícios e recursos de bem-estar ficam dispersos entre intranet, e-mails, PDFs e apps de parceiros.
O colaborador não sabe o que existe, para que serve ou onde acessar.

## A estratégia

Organizar a experiência a partir das necessidades das pessoas, e não da estrutura interna da empresa.
A pergunta **"O que você precisa hoje?"** substitui o menu institucional.

## A solução

Um hub digital com seis dimensões, conteúdo real em cada uma e algo para fazer em menos de três cliques.

| Hub | O que oferece |
|---|---|
| **Mente** | Pausas guiadas, conteúdos curtos e caminho direto para apoio |
| **Corpo** | Práticas rápidas, check de ergonomia interativo e conteúdos |
| **Conexões** | Histórias, mural de reconhecimento, ideias e grupos |
| **Meus Benefícios** | 19 benefícios com busca, filtros e ficha de acesso |
| **Aprender** | Conteúdo de 5 minutos, mídias e plataformas da empresa |
| **5 Minutos Para Mim** | Seletor de tempo, sugestões dinâmicas, sorteio e timer |

## Especial Setembro Amarelo

Dentro do HUMAN, em `#/setembro-amarelo`, existe uma experiência de autocuidado com banco de
experiências (livres, repetíveis, sem streak ou pontuação), quatro jogos leves, um calendário
afetivo ("Meu Tempo por Mim") e um espaço de apoio com o CVV (188) e o Pode Falar. A experiência
fica disponível o ano inteiro — "Setembro acaba. O cuidado continua."

## Premissa ética

O HUMAN informa e direciona. Não realiza diagnósticos e não substitui atendimento profissional.

---

## Estrutura

```
human/
├── index.html    Shell da aplicação (header, footer, busca, modal)
├── style.css     Design system completo
├── script.js     SPA: rotas, hubs, interações e timers
├── data.js       Todo o conteúdo fictício, editável sem tocar no código
├── icons.js      Biblioteca de ícones em SVG
├── .nojekyll     Evita processamento Jekyll no GitHub Pages
└── README.md
```

Sem frameworks, sem build, sem backend. HTML, CSS e JavaScript puro.

## Rotas

| Rota | Tela |
|---|---|
| `#/` | Home |
| `#/dimensao/mente` `corpo` `conexoes` `aprender` | Hubs de conteúdo |
| `#/beneficios` | Benefícios com busca e filtros |
| `#/pausa` | 5 Minutos Para Mim |
| `#/apoio` | Canais de apoio |
| `#/case` | O case do projeto |

Atalhos: **⌘K** ou **Ctrl+K** abrem a busca global. **ESC** fecha qualquer camada.

## Interações do protótipo

- Práticas com passo a passo e timer circular
- Check de ergonomia com anel de progresso e mensagem por resultado
- Mural de reconhecimento com formulário funcional no navegador
- Sorteio de sugestão em 5 Minutos Para Mim
- Lista pessoal de conteúdos salvos, com contador no topo
- Busca global navegável por teclado
- Avisos de confirmação após cada ação

---

## Publicar no GitHub Pages

1. Envie todos os arquivos para a raiz de um repositório.
2. Vá em **Settings → Pages**.
3. Em *Source*, escolha **Deploy from a branch**, com branch `main` e pasta `/ (root)`.
4. O site fica disponível em `https://<seu-usuario>.github.io/<repositorio>/`.

```bash
git init
git add .
git commit -m "HUMAN"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<repositorio>.git
git push -u origin main
```

Para testar localmente, abra `index.html` no navegador.

## Editar conteúdo

Tudo vive em `data.js`:

- `needs` os seis caminhos da home
- `dimensions` as seis dimensões
- `hubs` blocos, práticas e conteúdos de cada hub
- `benefits` benefícios com categoria, ícone e forma de acesso
- `pauses` sugestões por tempo disponível
- `stories`, `support`, `todaySuggestions`, `caseStudy`

Para trocar um ícone, use qualquer chave existente em `icons.js`.

## Design system

| Token | Valor |
|---|---|
| Fundo | `#FBFAF8` |
| Tinta | `#0B1B33` |
| Destaque | `#D6006F` |
| Tipografia | Inter 400 / 500 / 600 |
| Raio | 10 · 16 · 22 · 30 px |

Magenta é acento, nunca superfície. Espaço em branco generoso, ícones consistentes de traço 1.7 e microinterações discretas.

---

*Projeto conceitual. Prototipado com apoio de IA como acelerador de design e desenvolvimento.*
