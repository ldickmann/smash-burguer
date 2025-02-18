<template>
  <section class="admin-section">
    <div class="admin-login">
      <form novalidate @submit.prevent="handleLogin" class="login-form">
        <h2>Login Administrativo</h2>

        <FormGroup
          id="email"
          label="Email"
          v-model="credentials.email"
          type="email"
          :error="error.email"
          required
        />

        <FormGroup
          id="password"
          label="Senha"
          v-model="credentials.password"
          type="password"
          :error="error.password"
          required
        />

        <ButtonComponent
          :buttons="[{ label: 'Entrar', id: 'login' }]"
          type="submit"
          backgroundColor="#42b983"
          @click="handleLogin"
        />
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
import { useRouter } from "vue-router";
import { validateEmail, validatePassword } from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const adminStore = useAdminStore();

const credentials = ref({
  email: "",
  password: "",
});

const error = ref({
  email: "",
  password: "",
});

const validateForm = () => {
  const emailValidation = validateEmail(credentials.value.email);
  const passwordValidation = validatePassword(credentials.value.password);

  error.value.email = emailValidation.message;
  error.value.password = passwordValidation.message;

  return emailValidation.isValid && passwordValidation.isValid;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    const result = await adminStore.login(credentials.value);
    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/admin");
    }
  } catch (error) {
    alert("Erro ao realizar login");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/login-admin";
</style>
