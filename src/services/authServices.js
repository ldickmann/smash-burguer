export const authService = {
  async login(credentials) {
    try {
      // Simular uma chamada à API
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const savedUser = JSON.parse(localStorage.getItem('user'));
          if (savedUser?.email === credentials.email &&
            savedUser?.password === credentials.password) {
            resolve({ ok: true, user: savedUser });
          } else {
            throw new Error('Credenciais inválidas');
          }
        }, 1000);
      });

      return response;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  },

  async register(userData) {
    try {
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('user', JSON.stringify(userData));
      return { ok: true };
    } catch (error) {
      throw new Error('Erro ao registrar usuário: ' + error.message);
    }
  },

  async updateProfile(userData) {
    try {
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { ok: true, user: updatedUser };
    } catch (error) {
      throw new Error('Erro ao atualizar perfil: ' + error.message);
    }
  },

  logout() {
    localStorage.removeItem('user');
  }
};
