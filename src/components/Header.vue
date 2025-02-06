<template>
  <header>
    <h1>Reserva ON | Burguer</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/menu">Cardápio</router-link>
      <router-link to="/cart">Carrinho</router-link>
      <router-link to="/payment">Pagamento</router-link>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

h1 {
  margin: 0;
  color: #ffffff;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: #ffffff;
  text-decoration: none;
}
</style>
