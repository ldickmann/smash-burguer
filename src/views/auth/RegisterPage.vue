<template>
  <section class="register-section">
    <div class="register-container">
      <h1>Criar Conta</h1>
      <form novalidate @submit.prevent="handleRegister" class="register-form">
        <div class="form-name-container">
          <FormGroup
            id="firstName"
            label="Primeiro Nome"
            v-model="form.firstName"
            type="text"
            :error="error.firstName"
            placeholder="First Name"
            required
          />

          <FormGroup
            id="lastName"
            label="Sobrenome"
            v-model="form.lastName"
            type="text"
            :error="error.lastName"
            placeholder="Last Name"
            required
          />
        </div>

        <FormGroup
          id="email"
          label="E-mail"
          v-model="form.email"
          type="email"
          :error="error.email"
          placeholder="ldickmann12@gmail.com"
          required
        />

        <FormGroup
          id="password"
          label="Senha"
          v-model="form.password"
          type="password"
          :error="error.password"
          placeholder="Password"
          required
        />

        <FormGroup
          id="dateOfBirth"
          label="Data de Nascimento"
          v-model="form.dateOfBirth"
          type="date"
          :error="error.dateOfBirth"
          required
        />

        <FormGroup
          id="phone"
          label="Celular"
          v-model="form.phone"
          type="tel"
          mask="phone"
          :error="error.phone"
          placeholder="11 99999 9999"
          required
        />

        <FormGroup
          id="CEP"
          label="CEP"
          v-model="form.CEP"
          type="text"
          mask="cep"
          :error="error.CEP"
          placeholder="00000-000"
          required
        />

        <ButtonComponent
          :buttons="[{ label: 'Criar Conta', id: 'register' }]"
          backgroundColor="#063520"
          fontColor="#ffffff"
          fontSize="16px"
          buttonSize="0.75rem 1.5rem"
          borderRadius="6px"
          type="submit"
        />

        <p class="login-link">
          Já tem uma conta?
          <router-link to="/login">Faça login</router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateBirthDate,
  validatePhone,
  validateCEP,
} from "@/utils/validators";
import FormGroup from "@/components/FormGroup.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const userStore = useUserStore();

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

const error = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dateOfBirth: "",
  phone: "",
  CEP: "",
});

const validateForm = async () => {
  const firstNameValidation = validateFirstName(form.value.firstName);
  const lastNameValidation = validateLastName(form.value.lastName);
  const emailValidation = validateEmail(form.value.email);
  const passwordValidation = validatePassword(form.value.password);
  const dateOfBirthValidation = validateBirthDate(form.value.dateOfBirth);
  const phoneValidation = validatePhone(form.value.phone);
  const CEPValidation = await validateCEP(form.value.CEP);

  error.value = {
    firstName: firstNameValidation.message,
    lastName: lastNameValidation.message,
    email: emailValidation.message,
    password: passwordValidation.message,
    dateOfBirth: dateOfBirthValidation.message,
    phone: phoneValidation.message,
    CEP: CEPValidation.message,
  };

  if (CEPValidation.isValid) {
    form.value.address = CEPValidation.address;
  }

  return (
    firstNameValidation.isValid &&
    lastNameValidation.isValid &&
    emailValidation.isValid &&
    passwordValidation.isValid &&
    dateOfBirthValidation.isValid &&
    phoneValidation.isValid &&
    CEPValidation.isValid
  );
};

const handleRegister = async () => {
  try {
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    await userStore.register(form.value);
    router.push("/login");
  } catch (error) {
    console.error("Erro ao criar a conta", error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Erro ao criar a conta. Por favor, tente novamente.");
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/auth/register";
</style>
