// Validação de email
export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: "O email é obrigatório" };
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? "" : "Email inválido",
  };
};

// Validação de senha
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Validação de nome
export const validateName = (name) => {
  return name.length >= 3;
};

//validação de número de celular
export const validatePhone = (phone) => {
  return phone.length >= 11;
};
