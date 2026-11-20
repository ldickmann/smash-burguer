import { defineStore } from 'pinia';
import { adminAuthService } from '@/services/adminAuthServices';
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

    logout() {
      adminAuthService.logout();
      this.admin = null;
      this.isAuthenticated = false;
    }
  },

  getters: {
    isAdmin: (state) => state.isAuthenticated && state.admin?.role === 'admin'
  },

  persist: {
    // A sessão do painel salva é editável no navegador: `admin` precisa ser um objeto, e sem
    // ele a sessão não vale. O cadastro do admin criado à mão na mesma chave não muda
    afterHydrate: ({ store }) => {
      const admin = isPlainObject(store.admin) ? store.admin : null;
      const isAuthenticated = store.isAuthenticated === true && admin !== null;
      if (admin === store.admin && isAuthenticated === store.isAuthenticated) return;
      store.admin = admin;
      store.isAuthenticated = isAuthenticated;
      store.$persist();
    },
  },
});
