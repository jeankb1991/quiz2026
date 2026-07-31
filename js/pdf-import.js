/* pdf-import.js — Lê um PDF enviado pelo usuário, extrai o texto (via PDF.js)
   e gera automaticamente uma aula com texto de apoio e questionário.
   A geração é feita inteiramente no navegador, por heurística simples
   (sem serviços externos): por isso as questões geradas são um rascunho
   automático e podem exigir revisão do professor antes de usar em sala. */

const PdfImport = (function () {
  const STOPWORDS = new Set([
    'a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
    'um', 'uma', 'uns', 'umas', 'e', 'ou', 'que', 'para', 'por', 'com', 'sem', 'sobre',
    'entre', 'se', 'como', 'mais', 'menos', 'muito', 'pouco', 'ao', 'aos', 'à', 'às',
    'é', 'são', 'foi', 'foram', 'ser', 'ter', 'tem', 'têm', 'está', 'estão', 'isso',
    'esse', 'essa', 'este', 'esta', 'isto', 'aquele', 'aquela', 'também', 'já', 'não',
    'sim', 'ainda', 'mesmo', 'cada', 'quando', 'onde', 'porque', 'pois', 'mas', 'assim',
    'todo', 'toda', 'todos', 'todas', 'seu', 'sua', 'seus', 'suas', 'pelo', 'pela',
    'nesta', 'neste', 'nessa', 'nesse', 'outros', 'outras', 'outro', 'outra'
  ]);

  const ICONES_DISPONIVEIS = ['network', 'chip', 'gear', 'lock', 'sensor', 'cloud', 'brain', 'factory', 'city', 'farm', 'home', 'clock', 'globe', 'target'];

  function limparTexto(txt) {
    return txt.replace(/\s+/g, ' ').replace(/-\s+/g, '').trim();
  }

  function splitSentences(txt) {
    return txt
      .split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú0-9])/)
      .map(s => s.trim())
      .filter(s => s.length >= 40 && s.length <= 240);
  }

  function palavrasSignificativas(sentence) {
    return sentence
      .replace(/[.,;:()"“”'’]/g, '')
      .split(' ')
      .filter(w => w.length >= 5 && !STOPWORDS.has(w.toLowerCase()));
  }

  function embaralhar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  async function extrairTextoPDF(file, onProgress) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('Não foi possível carregar o leitor de PDF. Verifique sua conexão com a internet e tente novamente.');
    }
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let textoCompleto = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(it => it.str).join(' ');
      textoCompleto += pageText + ' ';
      if (onProgress) onProgress(i, pdf.numPages);
    }

    return limparTexto(textoCompleto);
  }

  function gerarBancoDePalavras(sentences) {
    const banco = new Set();
    sentences.forEach(s => palavrasSignificativas(s).forEach(w => banco.add(w)));
    return Array.from(banco);
  }

  function gerarQuestaoMultipla(sentence, bancoPalavras, icone) {
    const palavras = palavrasSignificativas(sentence);
    if (palavras.length === 0) return null;

    for (const alvo of embaralhar(palavras)) {
      const regex = new RegExp('\\b' + alvo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (!regex.test(sentence)) continue;

      const distratores = embaralhar(
        bancoPalavras.filter(w => w.toLowerCase() !== alvo.toLowerCase())
      ).slice(0, 3);
      if (distratores.length < 3) continue;

      const pergunta = sentence.replace(regex, '_____');
      const opcoes = embaralhar([alvo, ...distratores]);
      const correta = opcoes.indexOf(alvo);

      return {
        tipo: 'multipla',
        icone,
        leitura: `"${sentence}"`,
        pergunta: `Qual palavra completa corretamente a lacuna? "${pergunta}"`,
        opcoes,
        correta,
        explicacao: `O trecho original do documento diz: "${sentence}"`
      };
    }
    return null;
  }

  function gerarQuestaoVF(sentence, todasSentences, icone) {
    const ehVerdadeira = Math.random() < 0.5;

    if (ehVerdadeira) {
      return {
        tipo: 'vf',
        icone,
        leitura: `"${sentence}"`,
        pergunta: 'A afirmação acima está de acordo com o texto do documento enviado.',
        correta: true,
        explicacao: `O trecho original confirma: "${sentence}"`
      };
    }

    const palavras = palavrasSignificativas(sentence);
    const outras = todasSentences
      .filter(s => s !== sentence)
      .flatMap(s => palavrasSignificativas(s));
    if (palavras.length === 0 || outras.length === 0) return null;

    for (const alvo of embaralhar(palavras)) {
      const candidatos = outras.filter(w => w.toLowerCase() !== alvo.toLowerCase());
      if (candidatos.length === 0) continue;
      const troca = candidatos[Math.floor(Math.random() * candidatos.length)];
      const regex = new RegExp('\\b' + alvo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (!regex.test(sentence)) continue;

      const alterada = sentence.replace(regex, troca);
      return {
        tipo: 'vf',
        icone,
        leitura: `"${alterada}"`,
        pergunta: 'A afirmação acima está de acordo com o texto do documento enviado.',
        correta: false,
        explicacao: `O trecho original diz: "${sentence}" — a frase apresentada foi alterada.`
      };
    }
    return null;
  }

  function gerarAulaAPartirDoTexto(texto, tituloPersonalizado) {
    const sentences = splitSentences(texto);
    if (sentences.length < 4) {
      throw new Error('Não foi possível extrair texto suficiente deste PDF. Tente um arquivo com mais conteúdo em texto (não apenas imagens escaneadas).');
    }

    const banco = gerarBancoDePalavras(sentences);
    const candidatas = embaralhar(sentences);
    const questoes = [];
    let i = 0;

    while (questoes.length < 8 && i < candidatas.length) {
      const sentence = candidatas[i];
      const icone = ICONES_DISPONIVEIS[questoes.length % ICONES_DISPONIVEIS.length];
      const preferirMultipla = questoes.length % 2 === 0;

      let q = preferirMultipla
        ? gerarQuestaoMultipla(sentence, banco, icone)
        : gerarQuestaoVF(sentence, sentences, icone);

      if (!q) {
        q = preferirMultipla
          ? gerarQuestaoVF(sentence, sentences, icone)
          : gerarQuestaoMultipla(sentence, banco, icone);
      }

      if (q) questoes.push(q);
      i++;
    }

    if (questoes.length < 3) {
      throw new Error('Não foi possível gerar questões suficientes a partir deste PDF. Tente outro arquivo.');
    }

    const leituraInicial = sentences.slice(0, 3).join(' ');
    const id = 'custom_' + Date.now();
    const titulo = (tituloPersonalizado || '').trim() || 'Aula personalizada';

    return {
      id,
      titulo,
      resumo: leituraInicial.length > 110 ? leituraInicial.slice(0, 110) + '…' : leituraInicial,
      icone: 'doc',
      leitura_inicial: leituraInicial,
      questoes,
      custom: true,
      criadaEm: new Date().toISOString()
    };
  }

  return {
    async processarArquivo(file, tituloPersonalizado, onProgress) {
      if (!file || file.type !== 'application/pdf') {
        throw new Error('Selecione um arquivo PDF válido.');
      }
      const texto = await extrairTextoPDF(file, onProgress);
      return gerarAulaAPartirDoTexto(texto, tituloPersonalizado);
    }
  };
})();
