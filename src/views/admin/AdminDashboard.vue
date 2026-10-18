<template>
  <div class="dashboard">
    <h1 class="admin-page__title">Painel</h1>

    <ul class="dashboard__kpis" role="list">
      <li v-for="kpi in SALES_KPIS" :key="kpi.id">
        <AdminCard :title="kpi.label" variant="kpi">
          <p class="kpi__value tabular">{{ kpi.value }}</p>
          <p class="kpi__note">{{ kpi.note }}</p>
        </AdminCard>
      </li>
    </ul>

    <!-- O gráfico depende de uma biblioteca incompatível com o Chart.js 4 -->
    <section class="dashboard__chart" aria-label="Gráfico de vendas">
      <EmptyState
        icon="chart-line"
        title="Gráfico de vendas indisponível nesta versão"
        text="Os números acima trazem o resumo dos últimos 30 dias."
      />
    </section>
  </div>
</template>

<script setup>
import { SALES_KPIS } from "@/utils/salesSample";
import AdminCard from "@/components/admin/AdminCard.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/admin-dashboard';
</style>
