<template>
  <section class="login-section">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <FormGroup id="email" label="E-mail" v-model="form.email" type="email" required />

        <FormGroup
          id="password"
          label="Senha"
          v-model="form.password"
          type="password"
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useAuthHandlers } from "@/handlers/authHandlers";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const userStore = useUserStore();
const { handleLogin: authLogin } = useAuthHandlers();

const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const result = await authLogin(form.value);
    if (result?.error) {
      alert(result.error);
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Email ou senha inválidos");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/login";
</style>
