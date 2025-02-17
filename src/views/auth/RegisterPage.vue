<template>
  <section class="register-section">
    <div class="register-container">
      <h1>Criar Conta</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <FormGroup
          id="fullName"
          label="Nome Completo"
          v-model="form.fullName"
          type="text"
          required
        />

        <FormGroup id="email" label="E-mail" v-model="form.email" type="email" required />

        <FormGroup
          id="password"
          label="Senha"
          v-model="form.password"
          type="password"
          required
        />

        <FormGroup id="phone" label="Celular" v-model="form.phone" type="tel" required />

        <FormGroup
          id="address"
          label="Endereço"
          v-model="form.address"
          type="textarea"
          required
        />

        <button type="submit" class="submit-button">Criar Conta</button>
        <p class="login-link">
          Já tem uma conta?
          <router-link to="/login">Fazer Login</router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import FormGroup from "@/components/FormGroup.vue";

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  fullName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
});

const handleRegister = async () => {
  try {
    // Implementar a chamada à API aqui
    await userStore.register(form.value);
    router.push("/login");
  } catch (error) {
    console.error("Erro no registro:", error);
    alert("Erro ao criar conta");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/register";
</style>
