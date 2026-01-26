<template>
  <div class="chart-container">
    <!-- <BarChart :chart-data="chartData" :chart-options="chartOptions" /> -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

// Variavéis
const chartData = ref(props.data);
const chartOptions = ref(props.options);

// Observadores
watch(
  () => props.data,
  (newData) => {
    chartData.value = newData;
  }
);
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
