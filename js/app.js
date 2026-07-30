/* app.js — Monta a grade de módulos na página inicial e exibe o progresso do aluno. */

async function initHome() {
  const grid = document.getElementById('modulos-grid');
  const statModulos = document.getElementById('stat-modulos');
  const statConcluidos = document.getElementById('stat-concluidos');
  const statQuestoes = document.getElementById('stat-questoes');
  const statAproveitamento = document.getElementById('stat-aproveitamento');
  const userProgressCard = document.getElementById('user-progress-card');
  const overallProgressFill = document.getElementById('overall-progress-fill');
  const progressGeneralBadge = document.getElementById('progress-general-badge');

  // Audio Toggle
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

  // Reset Progress
  const btnReset = document.getElementById('btn-reset-progress');
  btnReset?.addEventListener('click', () => {
    AudioFX.click();
    if (confirm('Deseja realmente resetar todo o seu histórico de progresso?')) {
      StorageManager.resetAll();
      initHome();
    }
  });

  let indice;
  try {
    const res = await fetch('data/aulas.json');
    indice = await res.json();
  } catch (err) {
    grid.innerHTML = `<p style="color:var(--danger); font-family: var(--font-mono)">Não foi possível carregar os módulos (data/aulas.json). Verifique se o site está sendo servido via HTTP.</p>`;
    return;
  }

  const aulas = indice.aulas || [];
  statModulos.textContent = aulas.length;

  // Busca contagem de questões de cada aula em paralelo
  const detalhados = await Promise.all(aulas.map(async (aula) => {
    try {
      const r = await fetch(aula.arquivo);
      const d = await r.json();
      return { ...aula, totalQuestoes: (d.questoes || []).length };
    } catch (e) {
      return { ...aula, totalQuestoes: 0 };
    }
  }));

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

    return `
      <a class="chip-card" href="quiz.html?aula=${encodeURIComponent(aula.id)}" onclick="AudioFX.click()">
        <div class="chip-pins">
          <span style="top:8px;left:8px"></span><span style="top:8px;right:8px"></span>
          <span style="bottom:8px;left:8px"></span><span style="bottom:8px;right:8px"></span>
        </div>
        <div class="chip-header-row">
          <span class="chip-num">AULA ${String(aula.numero).padStart(2,'0')}</span>
          ${statusBadge}
        </div>
        <div class="chip-icon">${getIcon(aula.icone)}</div>
        <h3>${aula.titulo}</h3>
        <p>${aula.resumo}</p>
        <div class="chip-footer">
          <span>${scoreMeta}</span>
          <span class="chip-go">começar →</span>
        </div>
      </a>
    `;
  }).join('');
}

initHome();
