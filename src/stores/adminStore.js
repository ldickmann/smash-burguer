import { defineStore } from 'pinia';
import { adminAuthService, pickAdminProfile } from '@/services/adminAuthServices';
import { isPlainObject } from '@/utils/storedState';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      const { user } = await adminAuthService.login(credentials);
      this.setAdmin(user);
    },

    setAdmin(adminData) {
      this.admin = adminData;
      this.isAuthenticated = true;
    },

    // Sair encerra só a sessão; o cadastro do admin, na chave `admin`, continua
    logout() {
      this.admin = null;
      this.isAuthenticated = false;
    }
  },

  getters: {
    isAdmin: (state) => state.isAuthenticated && state.admin?.role === 'admin'
  },

  persist: {
    // A sessão tem chave própria: antes ela dividia a chave `admin` com o cadastro, e o
    // primeiro login podia regravá-la sem o cadastro
    key: 'smash-burger:admin-session',
    // A sessão do painel salva é editável no navegador: `admin` precisa ser um objeto, e sem
    // ele a sessão não vale. Uma sessão gravada com a senha perde a senha
    afterHydrate: ({ store }) => {
      const admin = isPlainObject(store.admin) ? pickAdminProfile(store.admin) : null;
      const isAuthenticated = store.isAuthenticated === true && admin !== null;
      if (
        JSON.stringify(admin) === JSON.stringify(store.admin) &&
        isAuthenticated === store.isAuthenticated
      ) {
        return;
      }
      store.admin = admin;
      store.isAuthenticated = isAuthenticated;
      store.$persist();
    },
  },
});
