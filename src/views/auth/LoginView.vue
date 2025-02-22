<template>
  <section class="login-section">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <FormGroup
          id="email"
          label="E-mail"
          v-model="form.email"
          type="email"
          :error="error.email"
          required
        />

        <FormGroup
          id="password"
          label="Senha"
          v-model="form.password"
          type="password"
          :error="error.password"
          required
        />

        <ButtonComponent
          :buttons="[{ label: 'Entrar' }]"
          backgroundColor="#42b983"
          fontColor="#ffffff"
          fontSize="16px"
          buttonSize="1rem 9rem"
          borderRadius="4px"
          :gap="16"
          @click="handleLogin"
        />

        <p class="register-link">
          Não tem uma conta?
          <router-link to="/register">Criar conta</router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useAuthHandlers } from "@/handlers/authHandlers";
import { validateEmail, validatePassword } from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const { handleLogin: authLogin } = useAuthHandlers();

const form = ref({
  email: "",
  password: "",
});

const error = ref({
  email: "",
  password: "",
});

/**
 * Valida o formulário de login verificando os campos de e-mail e senha.
 *
 * @returns {boolean} - Retorna true se e-mail e senha forem válidos, caso contrário, false.
 */
const validateForm = () => {
  const emailValidation = validateEmail(form.value.email);
  const passwordValidation = validatePassword(form.value.password);

  error.value.email = emailValidation.message;
  error.value.password = passwordValidation.message;

  return emailValidation.isValid && passwordValidation.isValid;
};

/**
 * Lida com o processo de login.
 *
 * Esta função primeiro valida o formulário. Se o formulário não for válido, ele retorna antes.
 * Se o formulário for válido, ele tenta fazer login usando a função `authLogin` com os dados do formulário.
 * Se a tentativa de login retornar um erro, ele alerta o usuário com a mensagem de erro.
 * Se ocorrer uma exceção durante a tentativa de login, ele alerta o usuário com uma mensagem de erro genérica.
 *
 * @async
 * @function handleLogin
 * @returns {Promise<void>}
 */
const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    const result = await authLogin(form.value);
    if (result?.error) {
      alert(result.error);
    }
  } catch (error) {
    alert("Erro ao fazer login", error);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/login";
</style>
