<template>
  <section class="admin-profile">
    <h1 class="admin-page__title admin-profile__title">Meu perfil</h1>

    <AdminCard title="Administrador">
      <dl class="admin-profile__info">
        <div>
          <dt>Nome</dt>
          <dd>{{ fullName }}</dd>
        </div>
        <div>
          <dt>E-mail</dt>
          <dd>{{ email }}</dd>
        </div>
        <div>
          <dt>Função</dt>
          <dd>Administrador</dd>
        </div>
      </dl>
      <p class="admin-profile__note">
        Os dados do administrador ficam neste navegador. Para trocar o nome, o e-mail ou a senha,
        crie o administrador de novo, como explica o README do projeto.
      </p>
      <template #footer>
        <BaseButton variant="secondary" icon-start="sign-out-alt" @click="handleLogout">Sair</BaseButton>
      </template>
    </AdminCard>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminLogout } from "@/composables/useAdminLogout";
import AdminCard from "@/components/admin/AdminCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const adminStore = useAdminStore();
const handleLogout = useAdminLogout();

// O admin vem do localStorage: campo que não é texto fica de fora
const text = (value) => (typeof value === "string" ? value : "");
const fullName = computed(() => {
  const admin = adminStore.admin ?? {};
  return (
    text(admin.name) ||
    [text(admin.firstName), text(admin.lastName)].filter(Boolean).join(" ") ||
    "Administrador"
  );
});
const email = computed(() => text(adminStore.admin?.email) || "—");
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/admin/admin-profile";
</style>
