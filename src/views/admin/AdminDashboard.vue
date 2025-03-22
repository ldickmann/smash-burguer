<template>
  <main class="dashboard-main">
    <div class="dashboard-container">
      <h1 class="dashboard-title">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
        Painel Administrativo
      </h1>

      <!-- Gráfico de vendas -->
      <ChartDashboard :data="salesData" :options="salesOptions" />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import ChartDashboard from "@/components/admin/ChartDashboard.vue";

const salesData = ref({
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
  datasets: [
    {
      label: "Vendas",
      backgroundColor: "#42b983",
      data: [150, 200, 170, 220, 190],
    },
  ],
});

const salesOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/admin-dashboard';
</style>
