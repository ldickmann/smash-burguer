import { defineStore } from 'pinia';
import { adminAuthService } from '@/services/adminAuthServices';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      try {
        const { user } = await adminAuthService.login(credentials);
        this.setAdmin(user);
      } catch (error) {
        throw error;
      }
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

  persist: true,
});
