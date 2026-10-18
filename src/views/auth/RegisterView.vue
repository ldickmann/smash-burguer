<template>
  <div class="auth-page container">
    <section class="auth-panel auth-panel--wide" aria-labelledby="cadastro-titulo">
      <h1 id="cadastro-titulo" class="auth-panel__title">Criar conta</h1>

      <div v-if="submitError" class="auth-alert" role="alert">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="auth-alert__icon"
          aria-hidden="true"
        />
        <p>{{ submitError }}</p>
      </div>

      <form ref="formRef" novalidate class="auth-form" @submit.prevent="handleRegister">
        <div class="auth-form__names">
          <FormGroup
            id="firstName"
            v-model="form.firstName"
            label="Nome"
            type="text"
            autocomplete="given-name"
            placeholder="Seu nome"
            :error="errors.firstName"
            required
            @blur="touch('firstName')"
          />

          <FormGroup
            id="lastName"
            v-model="form.lastName"
            label="Sobrenome"
            type="text"
            autocomplete="family-name"
            placeholder="Sobrenome"
            :error="errors.lastName"
            required
            @blur="touch('lastName')"
          />
        </div>

        <FormGroup
          id="email"
          v-model="form.email"
          label="E-mail"
          type="email"
          autocomplete="email"
          placeholder="voce@exemplo.com"
          :error="errors.email"
          required
          @blur="touch('email')"
        />

        <FormGroup
          id="password"
          v-model="form.password"
          label="Senha"
          type="password"
          autocomplete="new-password"
          placeholder="Mínimo de 6 caracteres, com letra e número"
          :error="errors.password"
          required
          @blur="touch('password')"
        />

        <FormGroup
          id="dateOfBirth"
          v-model="form.dateOfBirth"
          label="Data de nascimento"
          type="date"
          autocomplete="bday"
          :error="errors.dateOfBirth"
          required
          @blur="touch('dateOfBirth')"
        />

        <FormGroup
          id="phone"
          v-model="form.phone"
          label="Celular"
          type="tel"
          mask="phone"
          inputmode="tel"
          autocomplete="tel-national"
          placeholder="(47) 99999-9999"
          :error="errors.phone"
          required
          @blur="touch('phone')"
        />

        <FormGroup
          id="CEP"
          v-model="form.CEP"
          label="CEP"
          type="text"
          mask="cep"
          inputmode="numeric"
          autocomplete="postal-code"
          placeholder="00000-000"
          :error="cepError"
          :helper="cepHelper"
          :loading="cep.loading.value"
          required
          @blur="touch('CEP')"
        />

        <BaseButton type="submit" size="lg" block :loading="loading" class="auth-form__submit">
          {{ loading ? "Criando conta…" : "Criar conta" }}
        </BaseButton>
      </form>

      <p class="auth-panel__footer">
        Já tem conta?
        <RouterLink :to="{ path: '/login', query: redirectQuery }" class="link-inline">
          Entrar
        </RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthHandlers } from "@/handlers/authHandlers";
import { useFormValidation } from "@/composables/useFormValidation";
import { useCepLookup } from "@/composables/useCepLookup";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateBirthDate,
  validatePhone,
} from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const route = useRoute();
const { handleRegister: authRegister } = useAuthHandlers();
const cep = useCepLookup();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dateOfBirth: "",
  phone: "",
  CEP: "",
  address: null, // Armazena os dados do endereço retornados pela API viaCEP
});

const validateCEPFormat = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return { isValid: false, message: "O CEP é obrigatório" };
  if (digits.length !== 8) return { isValid: false, message: "CEP inválido. Devem conter 8 dígitos" };
  return { isValid: true, message: "" };
};

const { errors, touch, validateAll, firstInvalid } = useFormValidation(form, {
  firstName: validateFirstName,
  lastName: validateLastName,
  email: validateEmail,
  password: validatePassword,
  dateOfBirth: validateBirthDate,
  phone: validatePhone,
  CEP: validateCEPFormat,
});

const formRef = ref(null);
const loading = ref(false);
const submitError = ref("");

const redirectQuery = computed(() =>
  route.query.redirect ? { redirect: route.query.redirect } : {}
);

// O CEP é consultado assim que tiver 8 dígitos
watch(
  () => form.value.CEP,
  async (value) => {
    form.value.address = await cep.lookup(value);
  }
);

const cepError = computed(() => errors.CEP || cep.error.value);
const cepHelper = computed(() => {
  if (cep.loading.value) return "Buscando endereço…";
  const address = form.value.address;
  return address ? `${address.street}, ${address.neighborhood} — ${address.city}/${address.state}` : "";
});

const focusFirstError = async () => {
  await nextTick();
  const field = firstInvalid() ?? (cepError.value ? "CEP" : null);
  if (field) formRef.value?.querySelector(`#${field}`)?.focus();
};

const handleRegister = async () => {
  submitError.value = "";
  const isValid = validateAll();

  // Garante o endereço antes de criar a conta
  if (isValid && !form.value.address) {
    form.value.address = await cep.lookup(form.value.CEP);
  }

  if (!isValid || !form.value.address) {
    await focusFirstError();
    return;
  }

  loading.value = true;
  const result = await authRegister(form.value, route.query.redirect);
  loading.value = false;

  if (result?.error) submitError.value = result.error;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/register";
</style>
