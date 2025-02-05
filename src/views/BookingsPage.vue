<template>
  <div>
    <h1>Escolha uma data para sua reserva</h1>
    <input type="date" v-model="dataSelecionada" />
    <button @click="confirmarReserva">Avançar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dataSelecionada = ref('')

const confirmarReserva = () => {
  if (dataSelecionada.value) {
    router.push('/payment')
  } else {
    alert('Escolha uma data!')
  }
}
</script>
