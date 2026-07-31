/* accessibility.js — Alto contraste e tamanho de fonte ajustável.
   Aplica as preferências assim que o script carrega (antes da renderização
   completa da página) e expõe controles reutilizáveis em qualquer página
   que tenha os botões com os atributos data-a11y correspondentes. */

const A11y = (function () {
  const KEY = 'iot_lab_a11y_v1';
  const FONT_STEPS = [1, 2, 3]; // 1 = normal, 2 = grande, 3 = extra-grande
  const DEFAULT_CFG = { contraste: false, fonte: 1 };

  function getConfig() {
    try {
      const salvo = JSON.parse(localStorage.getItem(KEY));
      return Object.assign({}, DEFAULT_CFG, salvo || {});
    } catch (e) {
      return Object.assign({}, DEFAULT_CFG);
    }
  }

  function saveConfig(cfg) {
    try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {}
  }

  function aplicar(cfg) {
    const root = document.documentElement;
    root.classList.toggle('alto-contraste', !!cfg.contraste);
    root.classList.remove('fonte-grande', 'fonte-extra-grande');
    if (cfg.fonte === 2) root.classList.add('fonte-grande');
    if (cfg.fonte === 3) root.classList.add('fonte-extra-grande');
  }

  // Aplica imediatamente ao carregar o script, para evitar "flash" sem estilo.
  let cfgAtual = getConfig();
  aplicar(cfgAtual);

  function atualizarBotoesUI() {
    document.querySelectorAll('[data-a11y="contraste"]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(!!cfgAtual.contraste));
      btn.classList.toggle('active', !!cfgAtual.contraste);
    });
    document.querySelectorAll('[data-a11y-fonte-label]').forEach(el => {
      el.textContent = ({ 1: 'A', 2: 'A+', 3: 'A++' })[cfgAtual.fonte];
    });
  }

  function attachControls() {
    document.querySelectorAll('[data-a11y="contraste"]').forEach(btn => {
      btn.addEventListener('click', () => {
        cfgAtual.contraste = !cfgAtual.contraste;
        saveConfig(cfgAtual);
        aplicar(cfgAtual);
        atualizarBotoesUI();
      });
    });
    document.querySelectorAll('[data-a11y="fonte-mais"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = FONT_STEPS.indexOf(cfgAtual.fonte);
        cfgAtual.fonte = FONT_STEPS[Math.min(FONT_STEPS.length - 1, idx + 1)];
        saveConfig(cfgAtual);
        aplicar(cfgAtual);
        atualizarBotoesUI();
      });
    });
    document.querySelectorAll('[data-a11y="fonte-menos"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = FONT_STEPS.indexOf(cfgAtual.fonte);
        cfgAtual.fonte = FONT_STEPS[Math.max(0, idx - 1)];
        saveConfig(cfgAtual);
        aplicar(cfgAtual);
        atualizarBotoesUI();
      });
    });
    atualizarBotoesUI();
  }

  document.addEventListener('DOMContentLoaded', attachControls);

  return { getConfig, attachControls };
})();
