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
import { useUserStore } from "@/stores/userStore";
import { useAuthHandlers } from "@/handlers/authHandlers";
import { validateEmail, validatePassword } from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const userStore = useUserStore();
const { handleLogin: authLogin } = useAuthHandlers();

const form = ref({
  email: "",
  password: "",
});

const error = ref({
  email: "",
  password: "",
});

const validateForm = () => {
  const emailValidation = validateEmail(form.value.email);
  const passwordValidation = validatePassword(form.value.password);

  error.value.email = emailValidation.message;
  error.value.password = passwordValidation.message;

  return emailValidation.isValid && passwordValidation.isValid;
};

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
