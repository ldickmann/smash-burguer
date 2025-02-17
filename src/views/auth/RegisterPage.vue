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
          type="text"
          required
        />

        <ButtonComponent
          :buttons="[{ label: 'Criar Conta', id: 'register' }]"
          backgroundColor="#063520"
          fontColor="#ffffff"
          fontSize="16px"
          buttonSize="0.75rem 1.5rem"
          borderRadius="6px"
        />
        <ButtonComponent
          :buttons="[{ label: 'Já tem uma conta? Faça login', id: 'login' }]"
          backgroundColor="#063520"
          fontColor="#ffffff"
          fontSize="16px"
          buttonSize="0.75rem 1.5rem"
          borderRadius="6px"
          @click="() => router.push('/login')"
        />
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

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
@use "@/assets/styles/pages/auth/register";
</style>
