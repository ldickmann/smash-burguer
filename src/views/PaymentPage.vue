<template>
  <div>
    <h1>Pagamento</h1>
    <button @click="realizarPagamento">Pagar</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const realizarPagamento = () => {
  alert('Pagamento realizado com sucesso!')
  router.push('/confirmation')
}
</script>
