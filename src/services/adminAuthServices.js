// Simula a autenticação de um administrador

export const adminAuthService = {
  async login(credentials) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const savedAdmin = JSON.parse(localStorage.getItem('admin'));
          if (savedAdmin?.email === credentials.email &&
            savedAdmin?.password === credentials.password) {
            resolve({ ok: true, user: savedAdmin });
          } else {
            reject(new Error('Credenciais de administrador inválidas'));
          }
        }, 1000);
      });

      return response;
    } catch (error) {
      throw new Error('Erro ao fazer login de administrador: ' + error.message);
    }
  },

  logout() {
    localStorage.removeItem('admin');
  }
};
