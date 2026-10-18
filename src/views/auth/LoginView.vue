<template>
  <div class="auth-page container">
    <section class="auth-panel" aria-labelledby="entrar-titulo">
      <h1 id="entrar-titulo" class="auth-panel__title">Entrar</h1>

      <div v-if="authError" class="auth-alert" role="alert">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="auth-alert__icon"
          aria-hidden="true"
        />
        <p>E-mail ou senha incorretos.</p>
      </div>

      <form ref="formRef" class="auth-form" novalidate @submit.prevent="handleLogin">
        <FormGroup
          id="email"
          v-model="form.email"
          label="E-mail"
          type="email"
          autocomplete="email"
          :error="errors.email"
          required
          @blur="touch('email')"
        />

        <FormGroup
          id="password"
          v-model="form.password"
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

      <p class="auth-panel__footer">
        Não tem conta?
        <RouterLink :to="{ path: '/register', query: redirectQuery }" class="link-inline">
          Criar conta
        </RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthHandlers } from "@/handlers/authHandlers";
import { useFormValidation } from "@/composables/useFormValidation";
import { validateEmail, validatePassword } from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const route = useRoute();
const { handleLogin: authLogin } = useAuthHandlers();

const form = ref({
  email: "",
  password: "",
});

const { errors, touch, validateAll, firstInvalid } = useFormValidation(form, {
  email: validateEmail,
  password: validatePassword,
});

const formRef = ref(null);
const loading = ref(false);
const authError = ref(false);

// Mantém o destino ao trocar para o cadastro
const redirectQuery = computed(() =>
  route.query.redirect ? { redirect: route.query.redirect } : {}
);

/**
 * Um único handler, no submit do formulário: valida, entra e vai para o `redirect`.
 * Credenciais erradas mostram o banner em vez de um alert().
 */
const handleLogin = async () => {
  authError.value = false;

  if (!validateAll()) {
    await nextTick();
    formRef.value?.querySelector(`#${firstInvalid()}`)?.focus();
    return;
  }

  loading.value = true;
  const result = await authLogin(form.value, route.query.redirect);
  loading.value = false;

  if (result?.error) authError.value = true;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/login";
</style>
