/* auth.js — Cadastro e login simples via CPF + senha.
   Armazenamento 100% local (localStorage) — não há servidor/backend.
   A senha nunca é guardada em texto puro: é transformada com SHA-256
   antes de ser salva. */

const AuthManager = (function () {
  const USERS_KEY = 'iot_lab_users_v1';
  const SESSION_KEY = 'iot_lab_session_v1';

  function apenasDigitos(v) {
    return (v || '').replace(/\D/g, '');
  }

  function isValidCPF(cpfRaw) {
    const cpf = apenasDigitos(cpfRaw);
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // todos os dígitos iguais (inválido)

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i], 10) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9], 10)) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i], 10) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10], 10)) return false;

    return true;
  }

  function formatarCPF(cpfRaw) {
    const cpf = apenasDigitos(cpfRaw).slice(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  async function hashSenha(senha) {
    try {
      const enc = new TextEncoder().encode(senha);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fallback bem simples caso Web Crypto não esteja disponível
      let hash = 0;
      for (let i = 0; i < senha.length; i++) {
        hash = ((hash << 5) - hash) + senha.charCodeAt(i);
        hash |= 0;
      }
      return 'fallback_' + String(hash);
    }
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Erro ao salvar usuários:', e);
    }
  }

  const api = {
    isValidCPF,
    formatarCPF,
    apenasDigitos,

    async cadastrar(cpfRaw, senha, nome) {
      const cpf = apenasDigitos(cpfRaw);
      if (!isValidCPF(cpf)) {
        return { ok: false, erro: 'CPF inválido. Confira os números digitados.' };
      }
      if (!senha || senha.length < 4) {
        return { ok: false, erro: 'A senha deve ter pelo menos 4 caracteres.' };
      }

      const users = getUsers();
      if (users[cpf]) {
        return { ok: false, erro: 'Este CPF já está cadastrado. Faça login.' };
      }

      users[cpf] = {
        cpf,
        nome: (nome || '').trim() || 'Aluno(a)',
        senhaHash: await hashSenha(senha),
        criadoEm: new Date().toISOString()
      };
      saveUsers(users);
      api.criarSessao(cpf);
      return { ok: true };
    },

    async login(cpfRaw, senha) {
      const cpf = apenasDigitos(cpfRaw);
      const users = getUsers();
      const user = users[cpf];
      if (!user) {
        return { ok: false, erro: 'CPF não encontrado. Cadastre-se primeiro.' };
      }
      const hash = await hashSenha(senha);
      if (hash !== user.senhaHash) {
        return { ok: false, erro: 'Senha incorreta.' };
      }
      api.criarSessao(cpf);
      return { ok: true };
    },

    criarSessao(cpf) {
      try { localStorage.setItem(SESSION_KEY, cpf); } catch (e) {}
    },

    logout() {
      try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
    },

    getUsuarioAtual() {
      let cpf;
      try { cpf = localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
      if (!cpf) return null;
      const users = getUsers();
      return users[cpf] || null;
    },

    estaLogado() {
      return !!api.getUsuarioAtual();
    }
  };

  return api;
})();
