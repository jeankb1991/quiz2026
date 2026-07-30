/* storage.js — Gerenciamento do progresso do aluno no localStorage */

const STORAGE_KEY = 'iot_lab_progress_v1';

const StorageManager = {
  getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { modules: {} };
    } catch (e) {
      console.error('Erro ao ler progresso do localStorage:', e);
      return { modules: {} };
    }
  },

  saveResult(aulaId, score, total) {
    if (!aulaId || total <= 0) return;
    const current = this.getProgress();
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

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  },

  getModuleData(aulaId) {
    const progress = this.getProgress();
    return progress.modules[aulaId] || null;
  },

  getGlobalStats(aulasList = []) {
    const progress = this.getProgress();
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
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Erro ao resetar progresso:', e);
    }
  }
};
