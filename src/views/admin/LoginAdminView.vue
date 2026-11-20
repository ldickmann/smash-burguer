<template>
  <main id="conteudo" class="admin-login" tabindex="-1">
    <!-- Ilustração em giz com uma camada escura por cima -->
    <picture class="admin-login__bg">
      <source v-if="background.srcset" type="image/webp" :srcset="background.srcset" :sizes="background.sizes" />
      <img class="admin-login__img" :src="background.src" alt="" width="1920" height="1280" decoding="async" />
    </picture>

    <section class="auth-panel admin-login__panel" aria-labelledby="admin-login-titulo">
      <h1 id="admin-login-titulo" class="auth-panel__title">Painel administrativo</h1>

      <div v-if="authError" class="auth-alert" role="alert">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="auth-alert__icon"
          aria-hidden="true"
        />
        <p>{{ authError }}</p>
      </div>

      <form ref="formRef" novalidate class="auth-form" @submit.prevent="handleLogin">
        <FormGroup
          id="email"
          v-model="credentials.email"
          label="E-mail"
          type="email"
          autocomplete="email"
          :error="errors.email"
          required
          @blur="touch('email')"
        />

        <FormGroup
          id="password"
          v-model="credentials.password"
          label="Senha"
          type="password"
          autocomplete="current-password"
          :error="errors.password"
          required
          @blur="touch('password')"
        />

        <BaseButton type="submit" size="lg" block :loading="loading" class="auth-form__submit">
          {{ loading ? "Entrando…" : "Entrar" }}
        </BaseButton>
      </form>

      <!-- Só no `yarn dev`: no build, devTestAdmin() devolve null -->
      <div v-if="testAdmin" class="admin-login__dev">
        <p>Desenvolvimento: o admin de teste entra sem cadastro.</p>
        <BaseButton variant="secondary" size="sm" @click="fillTestAdmin">
          Usar admin de teste
        </BaseButton>
      </div>

      <p class="auth-panel__footer">
        <RouterLink to="/" class="link-inline">Voltar à loja</RouterLink>
      </p>
    </section>
  </main>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
import { devTestAdmin } from "@/services/adminAuthServices";
import { NO_WEBCRYPTO } from "@/utils/password";
import { NO_WEBCRYPTO_MESSAGE } from "@/handlers/authHandlers";
import { useRouter } from "vue-router";
import { validateEmail, validatePassword } from "@/utils/validators";
import { useFormValidation } from "@/composables/useFormValidation";
import { responsiveImage } from "@/composables/useResponsiveImage";
import FormGroup from "@/components/FormGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();
const adminStore = useAdminStore();

const background = responsiveImage("/images/fundos/background-admin-login", {
  widths: [1440, 1920],
  fallbackWidth: 1440,
  sizes: "100vw",
});

const credentials = ref({
  email: "",
  password: "",
});

const { errors, touch, validateAll } = useFormValidation(credentials, {
  email: validateEmail,
  password: validatePassword,
});

const loading = ref(false);
// Mensagem do erro de login ("" sem erro)
const authError = ref("");
const formRef = ref(null);

// Preenche o formulário com o admin de teste e leva o foco ao "Entrar"
const testAdmin = devTestAdmin();
const fillTestAdmin = async () => {
  credentials.value = { email: testAdmin.email, password: testAdmin.password };
  authError.value = "";
  await nextTick();
  formRef.value?.querySelector('button[type="submit"]')?.focus();
};

// Um único handler, no submit
const handleLogin = async () => {
  authError.value = "";
  if (!validateAll()) return;

  loading.value = true;
  try {
    await adminStore.login(credentials.value);
    router.push("/admin");
  } catch (error) {
    authError.value = String(error?.message).includes(NO_WEBCRYPTO)
      ? NO_WEBCRYPTO_MESSAGE
      : "E-mail ou senha incorretos.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/login-admin";
</style>
