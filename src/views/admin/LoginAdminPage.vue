<template>
  <div class="admin-login">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login Administrativo</h2>

      <FormGroup
        id="email"
        label="Email"
        v-model="credentials.email"
        type="email"
        required
      />

      <FormGroup
        id="password"
        label="Senha"
        v-model="credentials.password"
        type="password"
        required
      />

      <ButtonComponent
        :buttons="[{ label: 'Entrar', id: 'login' }]"
        type="submit"
        backgroundColor="#42b983"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const adminStore = useAdminStore();

const credentials = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await adminStore.login(credentials.value);
    router.push("/admin");
  } catch (error) {
    alert("Credenciais de administrador inválidas");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/login-admin";
</style>
