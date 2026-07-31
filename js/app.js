/* app.js — Controlador da página inicial:
   - Gate de cadastro/login (CPF + senha)
   - Grade de módulos (fixos + personalizados via upload de PDF)
   - Estatísticas e progresso do aluno logado
   - Modal de upload de PDF para gerar novas aulas/questionários
   - Logout */

(function () {
  const authGate = document.getElementById('auth-gate');
  const appContent = document.getElementById('app-content');
  const headerUserName = document.getElementById('header-user-name');

  // ---------------- Auth Gate ----------------

  const tabLogin = document.getElementById('btn-tab-login');
  const tabCadastro = document.getElementById('btn-tab-cadastro');
  const formLogin = document.getElementById('form-login');
  const formCadastro = document.getElementById('form-cadastro');
  const authErro = document.getElementById('auth-erro');

  function mostrarErro(msg) {
    authErro.textContent = msg;
    authErro.classList.remove('hidden');
  }
  function limparErro() {
    authErro.textContent = '';
    authErro.classList.add('hidden');
  }

  function mostrarAba(aba) {
    limparErro();
    const ehLogin = aba === 'login';
    formLogin.classList.toggle('hidden', !ehLogin);
    formCadastro.classList.toggle('hidden', ehLogin);
    tabLogin.classList.toggle('active', ehLogin);
    tabCadastro.classList.toggle('active', !ehLogin);
  }

  tabLogin?.addEventListener('click', () => { AudioFX.click(); mostrarAba('login'); });
  tabCadastro?.addEventListener('click', () => { AudioFX.click(); mostrarAba('cadastro'); });

  // Máscara simples de CPF nos campos
  document.querySelectorAll('.input-cpf').forEach(input => {
    input.addEventListener('input', () => {
      input.value = AuthManager.formatarCPF(input.value);
    });
  });

  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparErro();
    const cpf = document.getElementById('input-cpf-login').value;
    const senha = document.getElementById('input-senha-login').value;
    const resultado = await AuthManager.login(cpf, senha);
    if (!resultado.ok) {
      AudioFX.incorrect();
      mostrarErro(resultado.erro);
      return;
    }
    AudioFX.correct();
    entrarNoApp();
  });

  formCadastro?.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparErro();
    const cpf = document.getElementById('input-cpf-cadastro').value;
    const senha = document.getElementById('input-senha-cadastro').value;
    const nome = document.getElementById('input-nome-cadastro').value;
    const resultado = await AuthManager.cadastrar(cpf, senha, nome);
    if (!resultado.ok) {
      AudioFX.incorrect();
      mostrarErro(resultado.erro);
      return;
    }
    AudioFX.complete();
    entrarNoApp();
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    AudioFX.click();
    AuthManager.logout();
    location.reload();
  });

  function entrarNoApp() {
    const user = AuthManager.getUsuarioAtual();
    authGate.classList.add('hidden');
    appContent.classList.remove('hidden');
    if (headerUserName && user) headerUserName.textContent = user.nome;
    initHome();
  }

  // ---------------- Modal de Upload de PDF ----------------

  const uploadModal = document.getElementById('upload-modal');
  const btnNovaAula = document.getElementById('btn-nova-aula');
  const btnFecharModal = document.getElementById('btn-fechar-modal');
  const formUpload = document.getElementById('form-upload');
  const inputPdfFile = document.getElementById('input-pdf-file');
  const inputTituloAula = document.getElementById('input-titulo-aula');
  const uploadStatus = document.getElementById('upload-status');
  const btnProcessarPdf = document.getElementById('btn-processar-pdf');

  function abrirModal() {
    AudioFX.click();
    uploadModal.classList.remove('hidden');
    uploadStatus.textContent = '';
    uploadStatus.className = 'upload-status';
    formUpload.reset();
  }
  function fecharModal() {
    AudioFX.click();
    uploadModal.classList.add('hidden');
  }

  btnNovaAula?.addEventListener('click', abrirModal);
  btnFecharModal?.addEventListener('click', fecharModal);
  uploadModal?.addEventListener('click', (e) => {
    if (e.target === uploadModal) fecharModal();
  });

  formUpload?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = inputPdfFile.files[0];
    if (!file) {
      uploadStatus.textContent = 'Selecione um arquivo PDF.';
      uploadStatus.className = 'upload-status error';
      return;
    }

    btnProcessarPdf.disabled = true;
    uploadStatus.className = 'upload-status loading';

    try {
      const aula = await PdfImport.processarArquivo(
        file,
        inputTituloAula.value,
        (pagina, total) => {
          uploadStatus.textContent = `Lendo o PDF... página ${pagina} de ${total}`;
        }
      );
      StorageManager.addCustomAula(aula);
      uploadStatus.textContent = `Aula "${aula.titulo}" criada com ${aula.questoes.length} questões!`;
      uploadStatus.className = 'upload-status success';
      AudioFX.complete();
      setTimeout(() => {
        fecharModal();
        initHome();
      }, 1200);
    } catch (err) {
      console.error(err);
      uploadStatus.textContent = err.message || 'Não foi possível processar o PDF.';
      uploadStatus.className = 'upload-status error';
      AudioFX.incorrect();
    } finally {
      btnProcessarPdf.disabled = false;
    }
  });

  // ---------------- Página inicial (grade de módulos) ----------------

  async function initHome() {
    const grid = document.getElementById('modulos-grid');
    const statModulos = document.getElementById('stat-modulos');
    const statConcluidos = document.getElementById('stat-concluidos');
    const statQuestoes = document.getElementById('stat-questoes');
    const statAproveitamento = document.getElementById('stat-aproveitamento');
    const userProgressCard = document.getElementById('user-progress-card');
    const overallProgressFill = document.getElementById('overall-progress-fill');
    const progressGeneralBadge = document.getElementById('progress-general-badge');

    let indice;
    try {
      if (typeof AULAS_INDEX === 'undefined') throw new Error('AULAS_INDEX não encontrado');
      indice = AULAS_INDEX;
    } catch (err) {
      grid.innerHTML = `<p style="color:var(--danger); font-family: var(--font-mono)">Não foi possível carregar os módulos. Verifique se o arquivo data/lessons-data.js foi incluído na página.</p>`;
      return;
    }

    const aulasFixas = (indice.aulas || []).map(a => ({ ...a, custom: false }));
    const aulasCustom = StorageManager.getCustomAulas().map((a, i) => ({
      id: a.id,
      numero: null,
      titulo: a.titulo,
      resumo: a.resumo,
      icone: a.icone || 'doc',
      arquivo: null,
      custom: true,
      totalQuestoes: (a.questoes || []).length
    }));

    statModulos.textContent = aulasFixas.length + aulasCustom.length;

    // Busca contagem de questões de cada aula fixa (dados já embutidos, sem fetch)
    const detalhadosFixos = aulasFixas.map((aula) => {
      const d = AULAS_CONTEUDO[aula.id];
      return { ...aula, totalQuestoes: d ? (d.questoes || []).length : 0 };
    });

    const detalhados = [...detalhadosFixos, ...aulasCustom];

    const totalQuestoes = detalhados.reduce((acc, a) => acc + a.totalQuestoes, 0);
    statQuestoes.textContent = totalQuestoes;

    // Estatísticas globais do aluno
    const stats = StorageManager.getGlobalStats(detalhados);
    statConcluidos.textContent = stats.modulosConcluidos;
    statAproveitamento.textContent = `${stats.percentualGeral}%`;

    if (stats.modulosConcluidos > 0 || stats.totalPontos > 0) {
      userProgressCard.classList.remove('hidden');
      const pctConclusao = Math.round((stats.modulosConcluidos / stats.totalModulos) * 100);
      overallProgressFill.style.width = `${pctConclusao}%`;
      progressGeneralBadge.textContent = `${stats.modulosConcluidos} de ${stats.totalModulos} concluídos (${pctConclusao}%)`;
    } else {
      userProgressCard.classList.add('hidden');
    }

    // Renderizar chips dos módulos
    grid.innerHTML = detalhados.map(aula => {
      const userMod = StorageManager.getModuleData(aula.id);
      let statusBadge = '<span class="status-badge status-new">Novo</span>';
      let scoreMeta = `${aula.totalQuestoes} questões`;

      if (userMod) {
        if (userMod.completed) {
          statusBadge = `<span class="status-badge status-done">🏆 ${userMod.bestScore}/${aula.totalQuestoes}</span>`;
          scoreMeta = `Melhor: ${userMod.bestScore}/${aula.totalQuestoes} (${userMod.bestPct}%)`;
        } else if (userMod.attempts > 0) {
          statusBadge = `<span class="status-badge status-in-progress">⏳ ${userMod.bestScore}/${aula.totalQuestoes}</span>`;
          scoreMeta = `Tentativa: ${userMod.bestScore}/${aula.totalQuestoes}`;
        }
      }

      const numeroLabel = aula.custom
        ? '<span class="chip-num chip-num-custom">PERSONALIZADA</span>'
        : `<span class="chip-num">AULA ${String(aula.numero).padStart(2, '0')}</span>`;

      const btnExcluir = aula.custom
        ? `<button type="button" class="chip-delete" data-del-aula="${aula.id}" title="Excluir aula personalizada" aria-label="Excluir aula personalizada">${getIcon('trash')}</button>`
        : '';

      return `
        <a class="chip-card" href="quiz.html?aula=${encodeURIComponent(aula.id)}" onclick="AudioFX.click()">
          <div class="chip-pins">
            <span style="top:8px;left:8px"></span><span style="top:8px;right:8px"></span>
            <span style="bottom:8px;left:8px"></span><span style="bottom:8px;right:8px"></span>
          </div>
          <div class="chip-header-row">
            ${numeroLabel}
            ${statusBadge}
          </div>
          <div class="chip-icon">${getIcon(aula.icone)}</div>
          <h3>${aula.titulo}</h3>
          <p>${aula.resumo}</p>
          <div class="chip-footer">
            <span>${scoreMeta}</span>
            <span class="chip-go">começar →</span>
          </div>
          ${btnExcluir}
        </a>
      `;
    }).join('');

    // Botões de excluir aula personalizada (precisam impedir a navegação do link pai)
    grid.querySelectorAll('[data-del-aula]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        AudioFX.click();
        const id = btn.getAttribute('data-del-aula');
        if (confirm('Excluir esta aula personalizada? Essa ação não pode ser desfeita.')) {
          StorageManager.removeCustomAula(id);
          initHome();
        }
      });
    });
  }

  // ---------------- Audio Toggle & Reset ----------------

  function wireAudioAndReset() {
    const btnAudio = document.getElementById('btn-audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');

    function updateAudioUI() {
      const isMuted = AudioFX.isMuted();
      audioIcon.textContent = isMuted ? '🔇' : '🔊';
      audioLabel.textContent = isMuted ? 'Som OFF' : 'Som ON';
    }
    updateAudioUI();

    btnAudio?.addEventListener('click', () => {
      const muted = AudioFX.toggleMute();
      updateAudioUI();
      if (!muted) AudioFX.click();
    });

    const btnReset = document.getElementById('btn-reset-progress');
    btnReset?.addEventListener('click', () => {
      AudioFX.click();
      if (confirm('Deseja realmente resetar todo o seu histórico de progresso?')) {
        StorageManager.resetAll();
        initHome();
      }
    });
  }

  // ---------------- Inicialização ----------------

  wireAudioAndReset();

  if (AuthManager.estaLogado()) {
    entrarNoApp();
  } else {
    mostrarAba('login');
  }
})();
