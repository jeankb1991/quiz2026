/* audio.js — Síntese de efeitos sonoros com Web Audio API sem arquivos externos */

const AudioFX = (function() {
  let ctx = null;
  let muted = localStorage.getItem('iot_lab_muted') === 'true';

  function getContext() {
    if (!ctx && typeof AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function playTone(freq, type, duration, startGain = 0.1, endGain = 0.001) {
    if (muted) return;
    try {
      const audioCtx = getContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(startGain, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(endGain, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Efeito sonoro ignorado:', e);
    }
  }

  return {
    isMuted() {
      return muted;
    },

    toggleMute() {
      muted = !muted;
      localStorage.setItem('iot_lab_muted', muted);
      return muted;
    },

    click() {
      playTone(600, 'sine', 0.04, 0.08);
    },

    correct() {
      if (muted) return;
      try {
        const audioCtx = getContext();
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);
          gain.gain.setValueAtTime(0.1, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.2);
        });
      } catch (e) {}
    },

    incorrect() {
      if (muted) return;
      try {
        const audioCtx = getContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        [220, 180].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
          gain.gain.setValueAtTime(0.08, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.2);
        });
      } catch (e) {}
    },

    complete() {
      if (muted) return;
      try {
        const audioCtx = getContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
          gain.gain.setValueAtTime(0.12, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.4);
        });
      } catch (e) {}
    }
  };
})();
