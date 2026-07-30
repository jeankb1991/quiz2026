/* quiz.js — motor do questionário com atalhos de teclado, efeitos sonoros, confetes e filtros. */

(function(){
  const params = new URLSearchParams(location.search);
  const aulaId = params.get('aula');

  const el = {
    loading: document.getElementById('quiz-loading'),
    intro: document.getElementById('quiz-intro'),
    body: document.getElementById('quiz-body'),
    result: document.getElementById('quiz-result'),

    introEyebrow: document.getElementById('intro-eyebrow'),
    introTitulo: document.getElementById('intro-titulo'),
    introLeitura: document.getElementById('intro-leitura'),
    introContagem: document.getElementById('intro-contagem'),
    btnComecar: document.getElementById('btn-comecar'),

    progressFill: document.getElementById('progress-fill'),
    progressLabel: document.getElementById('progress-label'),
    progressScore: document.getElementById('progress-score'),

    qIcon: document.getElementById('q-icon'),
    qTag: document.getElementById('q-tag'),
    qLeitura: document.getElementById('q-leitura'),
    qPergunta: document.getElementById('q-pergunta'),
    qOpcoes: document.getElementById('q-opcoes'),
    qFeedback: document.getElementById('q-feedback'),
    qFeedbackTitle: document.getElementById('q-feedback-title'),
    qExplicacao: document.getElementById('q-explicacao'),
    btnConfirmar: document.getElementById('btn-confirmar'),
    btnProxima: document.getElementById('btn-proxima'),

    resultBadge: document.getElementById('result-badge'),
    resultScoreNum: document.getElementById('result-score-num'),
    resultTitle: document.getElementById('result-title'),
    resultMessage: document.getElementById('result-message'),
    btnRefazer: document.getElementById('btn-refazer'),
    btnRefazerErradas: document.getElementById('btn-refazer-erradas'),
    reviewList: document.getElementById('review-list'),

    countTodos: document.getElementById('count-todos'),
    countOk: document.getElementById('count-ok'),
    countNo: document.getElementById('count-no'),

    btnAudio: document.getElementById('btn-audio-toggle'),
    audioIcon: document.getElementById('audio-icon'),
    audioLabel: document.getElementById('audio-label'),
    confettiCanvas: document.getElementById('confetti-canvas')
  };

  let aulaData = null;
  let questoesOriginais = [];
  let questoes = [];
  let current = 0;
  let score = 0;
  let selecionada = null;
  let respondida = false;
  let respostas = []; // { questaoObj, pergunta, acertou, explicacao, escolhaTexto, corretaTexto }
  let activeFilter = 'todos';

  // Gerenciamento do Botão de Áudio
  function updateAudioUI() {
    if (!el.audioIcon || !el.audioLabel) return;
    const isMuted = AudioFX.isMuted();
    el.audioIcon.textContent = isMuted ? '🔇' : '🔊';
    el.audioLabel.textContent = isMuted ? 'Som OFF' : 'Som ON';
  }
  updateAudioUI();

  el.btnAudio?.addEventListener('click', () => {
    const muted = AudioFX.toggleMute();
    updateAudioUI();
    if (!muted) AudioFX.click();
  });

  async function boot() {
    if (!aulaId) {
      showError('Nenhum módulo foi especificado na URL. Escolha um módulo na página inicial.');
      return;
    }
    try {
      const idxRes = await fetch('data/aulas.json');
      const idx = await idxRes.json();
      const meta = (idx.aulas || []).find(a => a.id === aulaId);
      if (!meta) throw new Error('módulo não encontrado no índice');

      const dataRes = await fetch(meta.arquivo);
      aulaData = await dataRes.json();
      questoesOriginais = (aulaData.questoes || []).slice();
      questoes = shuffle(questoesOriginais.slice());

      renderIntro(meta);
    } catch (err) {
      console.error(err);
      showError('Não foi possível carregar este módulo. Verifique sua conexão e os arquivos do sistema.');
    }
  }

  function showError(msg) {
    el.loading.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <p style="color:var(--danger); font-family:var(--font-mono); margin-bottom: 20px;">${msg}</p>
        <a href="index.html" class="btn-primary">← Voltar para a página inicial</a>
      </div>
    `;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderIntro(meta) {
    el.loading.classList.add('hidden');
    el.introEyebrow.textContent = `// aula ${String(meta.numero).padStart(2,'0')}`;
    el.introTitulo.textContent = aulaData.titulo || meta.titulo;
    el.introLeitura.textContent = aulaData.leitura_inicial || '';
    el.introContagem.textContent = `${questoes.length} questões`;
    el.intro.classList.remove('hidden');
    document.title = `${aulaData.titulo || meta.titulo} · IoT Lab`;
  }

  el.btnComecar.addEventListener('click', () => {
    AudioFX.click();
    startQuiz(questoes);
  });

  function startQuiz(listaQuestoes) {
    el.intro.classList.add('hidden');
    el.result.classList.add('hidden');
    el.body.classList.remove('hidden');
    questoes = listaQuestoes;
    current = 0;
    score = 0;
    respostas = [];
    renderQuestion();
  }

  function renderQuestion() {
    respondida = false;
    selecionada = null;
    const q = questoes[current];

    el.progressFill.style.width = `${(current / questoes.length) * 100}%`;
    el.progressLabel.textContent = `Questão ${current + 1} de ${questoes.length}`;
    el.progressScore.textContent = `${score} acertos`;

    el.qIcon.innerHTML = getIcon(q.icone);
    el.qTag.textContent = q.tipo === 'vf' ? 'Verdadeiro ou Falso' : 'Múltipla escolha';
    el.qLeitura.textContent = q.leitura || '';
    el.qPergunta.textContent = q.pergunta;

    el.qFeedback.classList.add('hidden');
    el.qFeedback.classList.remove('ok', 'no');
    el.btnConfirmar.classList.remove('hidden');
    el.btnConfirmar.disabled = true;
    el.btnProxima.classList.add('hidden');

    const opcoesTexto = q.tipo === 'vf'
      ? ['Verdadeiro', 'Falso']
      : q.opcoes;

    el.qOpcoes.innerHTML = '';
    opcoesTexto.forEach((texto, i) => {
      const btn = document.createElement('button');
      btn.className = 'opcao';
      btn.type = 'button';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');

      const letra = q.tipo === 'vf' ? (i === 0 ? 'V' : 'F') : String.fromCharCode(65 + i);
      btn.innerHTML = `<span class="opcao-letra">${letra}</span><span>${texto}</span>`;
      btn.addEventListener('click', () => {
        AudioFX.click();
        selecionarOpcao(i, btn);
      });
      el.qOpcoes.appendChild(btn);
    });

    // Transição suave de entrada no card de pergunta
    const card = document.getElementById('question-card');
    card.classList.remove('question-anim');
    void card.offsetWidth; // Forçar reflow
    card.classList.add('question-anim');
  }

  function selecionarOpcao(i, btnEl) {
    if (respondida) return;
    [...el.qOpcoes.children].forEach(b => {
      b.classList.remove('selected');
      b.setAttribute('aria-checked', 'false');
    });
    btnEl.classList.add('selected');
    btnEl.setAttribute('aria-checked', 'true');
    selecionada = i;
    el.btnConfirmar.disabled = false;
  }

  el.btnConfirmar.addEventListener('click', () => {
    if (selecionada === null || respondida) return;
    respondida = true;
    const q = questoes[current];

    const corretaIndex = q.tipo === 'vf' ? (q.correta === true ? 0 : 1) : q.correta;
    const acertou = selecionada === corretaIndex;
    if (acertou) {
      score++;
      AudioFX.correct();
    } else {
      AudioFX.incorrect();
    }

    [...el.qOpcoes.children].forEach((b, i) => {
      b.disabled = true;
      if (i === corretaIndex) b.classList.add('correct');
      else if (i === selecionada) b.classList.add('incorrect');
    });

    el.qFeedback.classList.remove('hidden');
    el.qFeedback.classList.add(acertou ? 'ok' : 'no');
    el.qFeedbackTitle.textContent = acertou ? '✓ Resposta correta!' : '✕ Não foi dessa vez.';
    el.qExplicacao.textContent = q.explicacao;

    const opcoesTexto = q.tipo === 'vf' ? ['Verdadeiro', 'Falso'] : q.opcoes;
    respostas.push({
      questaoObj: q,
      pergunta: q.pergunta,
      acertou,
      explicacao: q.explicacao,
      escolhaTexto: opcoesTexto[selecionada],
      corretaTexto: opcoesTexto[corretaIndex]
    });

    el.progressScore.textContent = `${score} acertos`;
    el.btnConfirmar.classList.add('hidden');
    el.btnProxima.classList.remove('hidden');
    el.btnProxima.textContent = (current === questoes.length - 1) ? 'Ver resultado → [Enter]' : 'Próxima questão → [Enter]';
  });

  el.btnProxima.addEventListener('click', () => {
    AudioFX.click();
    current++;
    if (current >= questoes.length) {
      renderResult();
    } else {
      renderQuestion();
    }
  });

  function renderResult() {
    el.body.classList.add('hidden');
    el.result.classList.remove('hidden');

    const total = questoes.length;
    const pct = Math.round((score / total) * 100);

    // Salvar progresso
    StorageManager.saveResult(aulaId, score, total);

    // Atualizar badge em conic-gradient
    el.resultBadge.style.setProperty('--pct', pct);
    el.resultScoreNum.textContent = score;
    document.querySelector('.result-score-den').textContent = `/${total}`;

    let msg, titulo;
    if (pct >= 80) {
      titulo = 'Excelente domínio! 🎯';
      msg = 'Você demonstrou um entendimento exemplar sobre os conceitos desta aula.';
      AudioFX.complete();
      triggerConfetti();
    } else if (pct >= 50) {
      titulo = 'Bom trabalho! 🚀';
      msg = 'Você tem uma boa base. Revise os pontos abaixo para dominar 100% do assunto.';
      AudioFX.complete();
    } else {
      titulo = 'Vale revisar o conteúdo 📚';
      msg = 'Releia o texto de apoio da aula e tente novamente para reforçar seu aprendizado.';
    }

    el.resultTitle.textContent = titulo;
    el.resultMessage.textContent = `${msg} Você acertou ${score} de ${total} questões (${pct}%).`;

    // Configurar botão de refazer apenas as erradas
    const incorretas = respostas.filter(r => !r.acertou);
    if (incorretas.length > 0 && incorretas.length < total) {
      el.btnRefazerErradas.classList.remove('hidden');
      el.btnRefazerErradas.textContent = `Refazer apenas as ${incorretas.length} incorretas`;
    } else {
      el.btnRefazerErradas.classList.add('hidden');
    }

    // Contadores de filtros
    const acertosCount = respostas.filter(r => r.acertou).length;
    const errosCount = respostas.filter(r => !r.acertou).length;
    el.countTodos.textContent = respostas.length;
    el.countOk.textContent = acertosCount;
    el.countNo.textContent = errosCount;

    activeFilter = 'todos';
    updateFilterUI();
    renderReviewList();
  }

  function renderReviewList() {
    const filtradas = respostas.filter(r => {
      if (activeFilter === 'ok') return r.acertou;
      if (activeFilter === 'no') return !r.acertou;
      return true;
    });

    if (filtradas.length === 0) {
      el.reviewList.innerHTML = `<p style="text-align:center; padding: 20px; color: var(--text-faint);">Nenhuma questão nesta categoria.</p>`;
      return;
    }

    el.reviewList.innerHTML = filtradas.map(r => `
      <div class="review-item ${r.acertou ? 'review-ok' : 'review-no'}">
        <span class="review-icon ${r.acertou ? 'ok' : 'no'}"></span>
        <div>
          <p class="review-q">${r.pergunta}</p>
          ${r.acertou
            ? `<p>Sua resposta: <strong style="color:var(--success)">${r.escolhaTexto}</strong> — correta.</p>`
            : `<p>Sua resposta: <strong style="color:var(--danger)">${r.escolhaTexto}</strong> · Correta: <strong style="color:var(--success)">${r.corretaTexto}</strong></p>`}
          <p class="review-expl">${r.explicacao}</p>
        </div>
      </div>
    `).join('');
  }

  // Filtros de revisão
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      AudioFX.click();
      activeFilter = btn.getAttribute('data-filter');
      updateFilterUI();
      renderReviewList();
    });
  });

  function updateFilterUI() {
    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === activeFilter);
    });
  }

  el.btnRefazer.addEventListener('click', () => {
    AudioFX.click();
    startQuiz(shuffle(questoesOriginais));
  });

  el.btnRefazerErradas.addEventListener('click', () => {
    AudioFX.click();
    const incorretasQuestoes = respostas.filter(r => !r.acertou).map(r => r.questaoObj);
    if (incorretasQuestoes.length > 0) {
      startQuiz(shuffle(incorretasQuestoes));
    }
  });

  // Atalhos de teclado (Keyboard Shortcuts)
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Se estiver na tela de Intro e pressionar Enter
    if (!el.intro.classList.contains('hidden') && e.key === 'Enter') {
      el.btnComecar.click();
      return;
    }

    // Se estiver no Quiz Body
    if (!el.body.classList.contains('hidden')) {
      const q = questoes[current];
      if (!q) return;

      // Selecionar opções com 1-4 ou A-D ou V/F
      if (!respondida) {
        let targetIndex = null;
        if (e.key === '1' || e.key.toLowerCase() === 'a') targetIndex = 0;
        if (e.key === '2' || e.key.toLowerCase() === 'b') targetIndex = 1;
        if (q.tipo !== 'vf') {
          if (e.key === '3' || e.key.toLowerCase() === 'c') targetIndex = 2;
          if (e.key === '4' || e.key.toLowerCase() === 'd') targetIndex = 3;
        }
        if (q.tipo === 'vf') {
          if (e.key.toLowerCase() === 'v') targetIndex = 0;
          if (e.key.toLowerCase() === 'f') targetIndex = 1;
        }

        if (targetIndex !== null && el.qOpcoes.children[targetIndex]) {
          AudioFX.click();
          selecionarOpcao(targetIndex, el.qOpcoes.children[targetIndex]);
        }
      }

      // Enter para Confirmar ou Avançar
      if (e.key === 'Enter') {
        if (!respondida && selecionada !== null) {
          el.btnConfirmar.click();
        } else if (respondida) {
          el.btnProxima.click();
        }
      }
    }
  });

  // Efeito de Confete Sintonizado via Canvas
  function triggerConfetti() {
    const canvas = el.confettiCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00e5a8', '#7c8cff', '#ffb454', '#35d07f', '#ffffff'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 12,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25; // gravidade
          p.life -= p.decay;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (alive) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }

  boot();
})();
