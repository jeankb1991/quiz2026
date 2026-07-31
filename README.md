# IoT Lab

Plataforma de aulas e questionários interativos sobre Internet das Coisas (IoT),
construída em HTML, CSS e JavaScript puros — roda direto no navegador, sem
backend ou servidor próprio.

## O que tem de novo nesta versão

- **Cadastro e login simples** com CPF + senha (armazenado apenas no
  navegador do aluno, em `localStorage`; a senha é transformada com SHA-256
  antes de ser salva).
- **Progresso separado por aluno**: cada CPF cadastrado tem seu próprio
  histórico de notas neste navegador.
- **Criação de novas aulas a partir de PDF**: o aluno/professor envia um
  arquivo PDF, o texto é extraído no próprio navegador (via PDF.js) e uma
  aula com texto de apoio + questionário é gerada automaticamente.
- **Acessibilidade**: barra com alto contraste e três tamanhos de fonte
  (A / A+ / A++), pensada para pessoas com baixa visão. As preferências
  ficam salvas e valem para todas as páginas.

## Estrutura de arquivos

```
index.html          Página inicial: login/cadastro, grade de módulos, upload de PDF
quiz.html            Motor do questionário
css/style.css        Todo o design system (cores, tipografia, componentes, alto contraste)
js/
  auth.js            Cadastro/login por CPF + senha (localStorage)
  storage.js          Progresso do aluno + aulas personalizadas (por CPF)
  accessibility.js    Alto contraste e tamanho de fonte
  pdf-import.js       Extração de texto do PDF e geração automática de questionário
  app.js              Controlador da página inicial
  quiz.js             Controlador da página de questionário
  audio.js             Efeitos sonoros (Web Audio API, sem arquivos externos)
  icons.js             Ícones SVG usados nas aulas e na interface
data/
  lessons-data.js      Conteúdo das 5 aulas fixas, embutido em JS (usado pelo site)
  aulas.json            Índice das 5 aulas (mantido como referência/backup)
  aula1.json ... aula5.json   Conteúdo original de cada aula em JSON (referência/backup)
```

As aulas **personalizadas** (criadas via upload de PDF) não geram arquivo
novo em `data/` — elas ficam salvas no `localStorage` do navegador,
associadas ao CPF do aluno que as criou.

> Os arquivos `.json` em `data/` continuam no projeto como fonte "legível"
> do conteúdo das aulas fixas, caso você queira editá-las depois. Se editar
> algum `aulaN.json` ou o `aulas.json`, é preciso regenerar o
> `data/lessons-data.js` a partir deles (ele é quem o site realmente usa).

## Como rodar

O site agora funciona **direto com duplo clique no `index.html`**, sem
precisar de servidor local: o conteúdo das 5 aulas fixas foi embutido em
`data/lessons-data.js` (em vez de ser buscado com `fetch()`), justamente
porque navegadores como Chrome e Edge bloqueiam `fetch()` de arquivos
locais quando a página é aberta como `file:///...`.

Se preferir mesmo assim rodar por um servidor local (por exemplo, ao
publicar em produção depois), qualquer servidor estático simples funciona:

```bash
# Python
python3 -m http.server 8000

# Node (com o pacote "serve" instalado globalmente)
npx serve .
```

> A geração de aulas via PDF depende de uma biblioteca externa (PDF.js)
> carregada por CDN, então é necessário estar conectado à internet para
> usar essa função — o restante do site funciona normalmente offline.

## Sobre a geração automática de questionários

A extração de texto do PDF é feita no navegador. As questões são geradas
por uma heurística simples (sem inteligência artificial nem serviços
externos): o sistema escolhe frases do documento, cria lacunas ou troca
palavras-chave para montar alternativas de múltipla escolha e afirmações
de verdadeiro/falso. Por isso, **as questões geradas são um rascunho
automático** — vale revisar antes de aplicar em sala de aula.

## Acessibilidade

- **A- / A+ / A++**: ajusta o tamanho de todo o texto do site.
- **Contraste**: alterna para um tema de alto contraste (fundo preto,
  texto branco, destaques em amarelo vivo), com bordas mais grossas e
  foco de teclado bem visível.

Essas preferências ficam salvas no navegador e valem tanto na página
inicial quanto na página de questionário.

## Privacidade

Este é um projeto 100% client-side: não existe servidor recebendo CPF,
senha ou PDFs enviados. Tudo fica salvo apenas no `localStorage` do
navegador usado. Limpar os dados do navegador (ou usar outro navegador/
dispositivo) apaga o cadastro e o progresso.
