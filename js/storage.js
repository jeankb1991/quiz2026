/* storage.js — Progresso do aluno e aulas personalizadas no localStorage.
   O progresso e as aulas geradas via PDF são separados por CPF, para que
   cada aluno tenha seu próprio histórico neste mesmo navegador. */

const StorageManager = (function () {
  const PROGRESS_PREFIX = 'iot_lab_progress_v2::';
  const CUSTOM_PREFIX = 'iot_lab_custom_aulas_v1::';

  function cpfAtual() {
    if (typeof AuthManager !== 'undefined') {
      const u = AuthManager.getUsuarioAtual();
      if (u && u.cpf) return u.cpf;
    }
    return 'convidado';
  }

  function progressKey() { return PROGRESS_PREFIX + cpfAtual(); }
  function customKey() { return CUSTOM_PREFIX + cpfAtual(); }

  function getProgress() {
    try {
      const data = localStorage.getItem(progressKey());
      return data ? JSON.parse(data) : { modules: {} };
    } catch (e) {
      console.error('Erro ao ler progresso do localStorage:', e);
      return { modules: {} };
    }
  }

  function setProgress(p) {
    try {
      localStorage.setItem(progressKey(), JSON.stringify(p));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }

  return {
    saveResult(aulaId, score, total) {
      if (!aulaId || total <= 0) return;
      const current = getProgress();
      const prevModule = current.modules[aulaId] || {
        bestScore: 0,
        attempts: 0,
        completed: false
      };

      const pct = Math.round((score / total) * 100);
      const newBestScore = Math.max(prevModule.bestScore || 0, score);
      const isCompleted = prevModule.completed || pct >= 50;

      current.modules[aulaId] = {
        bestScore: newBestScore,
        lastScore: score,
        totalQuestoes: total,
        bestPct: Math.round((newBestScore / total) * 100),
        attempts: (prevModule.attempts || 0) + 1,
        completed: isCompleted,
        lastUpdated: new Date().toISOString()
      };

      setProgress(current);
    },

    getModuleData(aulaId) {
      const progress = getProgress();
      return progress.modules[aulaId] || null;
    },

    getGlobalStats(aulasList = []) {
      const progress = getProgress();
      const modules = progress.modules || {};

      let concluidos = 0;
      let totalPontos = 0;
      let totalPossivel = 0;

      aulasList.forEach(aula => {
        const data = modules[aula.id];
        if (data) {
          if (data.completed) concluidos++;
          totalPontos += data.bestScore || 0;
          totalPossivel += data.totalQuestoes || 0;
        }
      });

      const percentualGeral = totalPossivel > 0 ? Math.round((totalPontos / totalPossivel) * 100) : 0;

      return {
        modulosConcluidos: concluidos,
        totalModulos: aulasList.length,
        totalPontos,
        totalPossivel,
        percentualGeral
      };
    },

    resetAll() {
      try {
        localStorage.removeItem(progressKey());
      } catch (e) {
        console.error('Erro ao resetar progresso:', e);
      }
    },

    // ---------- Aulas personalizadas (geradas a partir de PDFs) ----------

    getCustomAulas() {
      try {
        const data = localStorage.getItem(customKey());
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error('Erro ao ler aulas personalizadas:', e);
        return [];
      }
    },

    addCustomAula(aula) {
      const lista = this.getCustomAulas();
      lista.unshift(aula);
      try {
        localStorage.setItem(customKey(), JSON.stringify(lista));
        return true;
      } catch (e) {
        console.error('Erro ao salvar aula personalizada:', e);
        return false;
      }
    },

    removeCustomAula(aulaId) {
      const lista = this.getCustomAulas().filter(a => a.id !== aulaId);
      try {
        localStorage.setItem(customKey(), JSON.stringify(lista));
      } catch (e) {
        console.error('Erro ao remover aula personalizada:', e);
      }
    },

    getCustomAulaById(aulaId) {
      return this.getCustomAulas().find(a => a.id === aulaId) || null;
    }
  };
})();
