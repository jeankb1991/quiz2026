# IoT Lab — Questionários de Internet das Coisas

Site estático de questionários interativos sobre **Internet das Coisas (IoT)**, feito para os alunos do Curso Técnico de Desenvolvimento de Sistemas. Cada módulo corresponde a uma aula (baseada nos textos de aprofundamento em PDF) e apresenta perguntas de múltipla escolha e verdadeiro/falso, cada uma com um pequeno trecho de leitura de apoio, um ícone ilustrativo e explicação da resposta correta.

Não usa nenhum framework ou processo de build — é HTML, CSS e JavaScript puros, então funciona direto no **GitHub Pages**.

## Estrutura do projeto

```
iot-quiz/
├── index.html          → página inicial (lista de módulos)
├── quiz.html            → motor do questionário (recebe ?aula=ID na URL)
├── css/
│   └── style.css        → todo o visual do site
├── js/
│   ├── icons.js          → biblioteca de ícones SVG usados nas questões
│   ├── app.js             → carrega e monta a lista de módulos na home
│   └── quiz.js             → lógica do questionário (perguntas, pontuação, revisão)
├── data/
│   ├── aulas.json         → índice de todos os módulos disponíveis
│   ├── aula1.json          → banco de questões da Aula 1
│   ├── aula2.json          → banco de questões da Aula 2
│   ├── aula3.json          → banco de questões da Aula 3
│   ├── aula4.json          → banco de questões da Aula 4
│   └── aula5.json          → banco de questões da Aula 5
└── README.md
```

## Como testar localmente

Como o site usa `fetch()` para carregar os arquivos `.json`, ele precisa ser servido por um servidor HTTP (abrir o `index.html` direto como arquivo local, com `file://`, não funciona no Chrome/Firefox por causa de CORS).

Rode um servidor simples na pasta do projeto:

```bash
cd iot-quiz
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `iot-quiz`).
2. Envie todos os arquivos desta pasta para a raiz do repositório:
   ```bash
   git init
   git add .
   git commit -m "Site de questionários de IoT"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/iot-quiz.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**.
4. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
5. Salve. Em alguns minutos o site estará em:
   `https://SEU-USUARIO.github.io/iot-quiz/`

Não é preciso nenhuma configuração adicional, chave de API ou servidor — é 100% estático.

## Como adicionar um novo módulo (a partir de um novo PDF)

O sistema foi pensado para crescer facilmente conforme novos textos de aprofundamento forem disponibilizados.

**Passo 1 — Crie o arquivo de questões.**
Copie um dos arquivos existentes (ex: `data/aula5.json`) como modelo e salve como `data/aula6.json` (ou outro nome). Preencha os campos seguindo este esquema:

```json
{
  "id": "aula6",
  "numero": 6,
  "titulo": "Título da nova aula",
  "leitura_inicial": "Um resumo curto (3-5 frases) do conteúdo da aula, mostrado antes de começar o quiz.",
  "questoes": [
    {
      "tipo": "multipla",
      "icone": "network",
      "leitura": "Um trecho curto (uma citação ou paráfrase) do PDF que dá contexto para a pergunta.",
      "pergunta": "Texto da pergunta?",
      "opcoes": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
      "correta": 0,
      "explicacao": "Por que essa é a resposta certa, citando o raciocínio do texto."
    },
    {
      "tipo": "vf",
      "icone": "lock",
      "leitura": "Outro trecho de apoio.",
      "pergunta": "Afirmação a ser julgada como verdadeira ou falsa.",
      "correta": true,
      "explicacao": "Explicação da resposta."
    }
  ]
}
```

Regras importantes:
- `tipo` aceita `"multipla"` (usa o campo `opcoes` + `correta` como índice, começando em `0`) ou `"vf"` (usa `correta` como `true`/`false`, sem o campo `opcoes`).
- `icone` pode ser qualquer uma das chaves definidas em `js/icons.js`: `network`, `chip`, `gear`, `lock`, `sensor`, `cloud`, `brain`, `factory`, `city`, `farm`, `home`, `clock`, `globe`, `target`. Para adicionar um ícone novo, basta incluir mais uma entrada no objeto `ICONS` em `js/icons.js` com um SVG próprio.
- Recomenda-se de 6 a 10 questões por módulo, variando os tipos e ícones para manter a experiência diversificada.

**Passo 2 — Registre o módulo no índice.**
Abra `data/aulas.json` e adicione uma nova entrada:

```json
{ "id": "aula6", "numero": 6, "titulo": "Título da nova aula", "resumo": "Frase curta de apresentação.", "icone": "network", "arquivo": "data/aula6.json" }
```

Pronto — o novo módulo aparece automaticamente na página inicial, com contagem de questões calculada dinamicamente, sem precisar mexer em nenhum HTML ou CSS.

**Passo 3 (opcional) — extrair as questões do PDF com auxílio de IA.**
Se quiser agilizar a criação de um novo bloco de questões a partir de um PDF novo, você pode colar o texto do PDF em uma ferramenta de IA e pedir algo como:
> "Gere de 6 a 10 questões (múltipla escolha e verdadeiro/falso) sobre este texto, no formato JSON usado pelo arquivo `aula5.json` do meu projeto, incluindo para cada questão um pequeno trecho literal do texto como campo `leitura` e uma explicação da resposta correta."

## Personalização visual

Todas as cores, fontes e espaçamentos ficam centralizados nas variáveis CSS no topo de `css/style.css` (bloco `:root`). Para trocar a paleta de cores do site, basta editar esses valores — o resto do layout se adapta automaticamente.

## Licença de uso

Material de apoio educacional. Sinta-se livre para adaptar, expandir e reutilizar em outras turmas ou disciplinas.
