import { defineStore } from 'pinia';
import { authService } from '@/services/authServices';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    orderHistory: [],
  }),

  actions: {
    async login(credentials) {
      try {
        const { user } = await authService.login(credentials);
        this.setUser(user);
      } catch (error) {
        throw error;
      }
    },

    async register(userData) {
      try {
        await authService.register(userData);
        return true;
      } catch (error) {
        throw error;
      }
    },

    async updateProfile(userData) {
      try {
        const { user } = await authService.updateProfile(userData);
        this.setUser(user);
      } catch (error) {
        throw error;
      }
    },

    setUser(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },

    logout() {
      authService.logout();
      this.user = null;
      this.isAuthenticated = false;
      this.orderHistory = [];
    },
  },

  persist: true,
});
