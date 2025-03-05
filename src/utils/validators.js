/*
 * Verifica se um email é fornecido e se segue o formato esperado.
 *
 * @param {string} email - email para ser validado
 * @returns {object} - objeto com isValid e uma mensagem de erro se aplicável.
 */
export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: "O email é obrigatório" };
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? "" : "Email inválido",
  };
};

/**
 * Valida se uma senha é fornecida e se atende aos requisitos mínimos.
 *
 * @param {string} password - A senha a ser validada.
 * @returns {Object} Objeto com isValid e mensagem de erro, se necessário.
 */
export const validatePassword = (password) => {
  if (!password) return { isValid: false, message: "A senha é obrigatória" };
  const hasMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  const isValid = hasMinLength && hasNumber && hasLetter;
  return {
    isValid,
    message: isValid
      ? ""
      : "A senha deve conter no mínimo 6 caracteres, uma letra e um número",
  };
};

/**
 * Valida se o primeiro nome é fornecido e se contém no mínimo 3 letras e está sem números.
 *
 * @param {string} firstName - O primeiro nome a ser validado.
 * @returns {Object} Objeto com isValid e mensagem de erro, se aplicável.
 */
export const validateFirstName = (firstName) => {
  if (!firstName) return { isValid: false, message: "O primeiro nome é obrigatório" };
  const nameRegex = /^[a-zA-ZÀ-ÿ]{3,}$/;
  return {
    isValid: nameRegex.test(firstName),
    message: nameRegex.test(firstName) ? "" : "Nome inválido. Devem conter no mínimo 3 letras e não conter números",
  };
};

/**
 * Valida se o sobrenome é fornecido e se contém no mínimo 2 letras (permitindo espaços) e se está sem números.
 *
 * @param {string} lastName - O sobrenome a ser validado.
 * @returns {Object} Objeto com isValid e mensagem de erro, se aplicável.
 */
export const validateLastName = (lastName) => {
  if (!lastName) return { isValid: false, message: "O sobrenome é obrigatório" };
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  return {
    isValid: nameRegex.test(lastName),
    message: nameRegex.test(lastName) ? "" : "Sobrenome inválido. Devem conter no mínimo 2 letras e não conter números",
  };
};

/**
 * Valida uma data de nascimento, garantindo que a data seja válida e lógica.
 *
 * @param {string} birthDate - A data de nascimento em formato compatível com Date.
 * @returns {Object} Objeto com isValid e mensagem de erro, se aplicável.
 */
export const validateBirthDate = (birthDate) => {
  if (!birthDate) return { isValid: false, message: "A data de nascimento é obrigatória" };

  const date = new Date(birthDate);

  // Varifica se a idade é válida
  if (isNaN(date.getTime())) {
    return { isValid: false, message: "Data de nascimento inválida" };
  }

  // Componentes da data
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Verifica se o ano é anterior a 1900
  if (year < 1900) {
    return { isValid: false, message: "O ano deve ser superior a 1900" };
  }

  // Verifica se o mês é válido
  if (month < 1 || month > 12) {
    return { isValid: false, message: "Mês inválido" };
  }

  // Verifica se o dia é válido
  if (day < 1 || day > 31) {
    return { isValid: false, message: "Dia inválido" };
  }

  return {
    isValid: true,
    message: "",
  };
};

/**
 * Valida um número de celular, removendo caracteres não numéricos e verificando padrões específicos.
 *
 * @param {string} phone - O número de telefone a ser validado.
 * @returns {Object} Objeto com isValid e mensagem de erro, se aplicável.
 */
export const validatePhone = (phone) => {
  if (!phone) return { isValid: false, message: "O número é obrigatório" };

  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length !== 11) {
    return {
      isValid: false,
      message: "Número inválido. O número deve conter 11 dígitos (Ex.: 11999999999)",
    };
  }

  const ddd = cleanPhone.substring(0, 2);
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
    return {
      isValid: false,
      message: "DDD inválido",
    };
  }

  // Verificação para número de celular iniciar com 9
  if (cleanPhone[2] !== "9") {
    return {
      isValid: false,
      message: "Número inválido. O número deve começar com 9.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

/**
 * Valida o CEP, realizando requisição à API ViaCEP para buscar o endereço correspondente.
 *
 * @param {string} cep - O CEP a ser validado (pode conter formatação).
 * @returns {Promise<Object>} Objeto promissor contendo isValid, mensagem e o endereço (se aplicável).
 */
export const validateCEP = async (cep) => {
  if (!cep) return { isValid: false, message: "O CEP é obrigatório" };

  // Remove caracteres não numéricos
  const cleanCEP = cep.replace(/\D/g, "");

  if (cleanCEP.length !== 8) {
    return {
      isValid: false,
      message: "CEP inválido. Devem conter 8 dígitos",
      address: null,
    };
  }

  // Busca o CEP (endereço) na API ViaCEP
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    const data = await response.json();

    console.log('Resposta da API:', data); // Debug

    if (data.erro) {
      return {
        isValid: false,
        message: "CEP não encontrado",
        address: null,
      };
    }

    return {
      isValid: true,
      message: "",
      address: {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      }
    };
  } catch (error) {
    console.error('Erro de requisição:', error);
    return {
      isValid: false,
      message: "Erro ao buscar CEP",
      address: null,
    };
  }
};
