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

      <div v-if="hasAccount" id="aviso-conta-salva" class="auth-alert auth-alert--warning">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="auth-alert__icon"
          aria-hidden="true"
        />
        <p>Já existe uma conta salva neste navegador. Se você criar outra, a anterior será apagada.</p>
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

        <BaseButton
          type="submit"
          size="lg"
          block
          :loading="loading"
          :aria-describedby="hasAccount ? 'aviso-conta-salva' : undefined"
          class="auth-form__submit"
        >
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
import { hasSavedAccount } from "@/services/authServices";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateBirthDate,
  validatePhone,
  validateCEPFormat,
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

// O app guarda uma conta só: criar outra apaga a que já está salva
const hasAccount = hasSavedAccount();

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

// Consulta o CEP e guarda o endereço, se o campo ainda tiver esse CEP quando a resposta chegar
const lookupCep = async (value) => {
  const address = await cep.lookup(value);
  if (form.value.CEP === value) form.value.address = address;
};

// O CEP é consultado assim que tiver 8 dígitos; o endereço do CEP anterior sai na hora
watch(
  () => form.value.CEP,
  (value) => {
    form.value.address = null;
    lookupCep(value);
  }
);

const cepError = computed(() => errors.CEP || cep.error.value);
const cepHelper = computed(() => {
  if (cep.loading.value) return "Buscando endereço…";
  const address = form.value.address;
  return address
    ? `${address.street}, ${address.neighborhood} — ${address.city}/${address.state}`
    : "Consultamos o CEP no ViaCEP para preencher o endereço.";
});

const focusFirstError = async () => {
  await nextTick();
  // Sem erro nos campos, o que falta é o endereço do CEP (consulta com erro ou ainda em andamento)
  const field = firstInvalid() ?? (form.value.address ? null : "CEP");
  if (field) formRef.value?.querySelector(`#${field}`)?.focus();
};

// Envio em andamento, inclusive a espera pela consulta do CEP: um segundo envio é ignorado
let submitting = false;

const handleRegister = async () => {
  if (submitting) return;
  submitting = true;
  try {
    submitError.value = "";

    // Uma consulta do CEP em andamento termina antes da validação (e a que falhou é refeita)
    if (!form.value.address) await lookupCep(form.value.CEP);
    const isValid = validateAll();

    if (!isValid || !form.value.address) {
      await focusFirstError();
      return;
    }

    loading.value = true;
    const result = await authRegister(form.value, route.query.redirect);
    if (result?.error) submitError.value = result.error;
  } finally {
    loading.value = false;
    submitting = false;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/register";
</style>
