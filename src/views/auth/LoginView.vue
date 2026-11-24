<template>
  <div class="auth-page container">
    <section class="auth-panel" aria-labelledby="entrar-titulo">
      <h1 id="entrar-titulo" class="auth-panel__title">Entrar</h1>

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

        <!-- O banner fica junto do botão, onde a pessoa agiu. A região do alerta existe desde o
             carregamento (vazia, sem caixa), para o leitor de tela anunciar o erro -->
        <div ref="envioRef" class="auth-form__envio">
          <div class="auth-form__anuncio" role="alert" aria-atomic="true">
            <div v-if="authError" class="auth-alert">
              <span class="auth-alert__icon" aria-hidden="true">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
              </span>
              <p>{{ authError }}</p>
            </div>
          </div>

          <BaseButton type="submit" size="lg" block :loading="loading" class="auth-form__submit">
            {{ loading ? "Entrando…" : "Entrar" }}
          </BaseButton>
        </div>
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
const envioRef = ref(null);
const loading = ref(false);
// Mensagem do erro de login ("" sem erro)
const authError = ref("");

// Mantém o destino ao trocar para o cadastro
const redirectQuery = computed(() =>
  route.query.redirect ? { redirect: route.query.redirect } : {}
);

/**
 * Um único handler, no submit do formulário: valida, entra e vai para o `redirect`.
 * Credenciais erradas mostram o banner em vez de um alert().
 */
const handleLogin = async () => {
  authError.value = "";

  if (!validateAll()) {
    await nextTick();
    formRef.value?.querySelector(`#${firstInvalid()}`)?.focus();
    return;
  }

  loading.value = true;
  const result = await authLogin(form.value, route.query.redirect);
  loading.value = false;

  if (result?.error) {
    authError.value = result.error;
    // O foco fica onde estava (no botão, ou no campo do Enter); o banner e o botão vêm para a vista.
    // O jsdom não tem scrollIntoView
    await nextTick();
    envioRef.value?.scrollIntoView?.({ block: "nearest" });
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/login";
</style>
