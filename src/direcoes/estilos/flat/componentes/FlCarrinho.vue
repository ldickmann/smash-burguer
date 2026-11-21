<!-- Carrinho: link para /cart com o selo quadrado em cheddar, a área de contagem do ladrilho [F28].
     Cada dígito sobe ou desce quando a contagem muda (useContadorCarrinho). -->
<template>
  <RouterLink to="/cart" class="fl-carrinho" :aria-label="rotulo">
    <font-awesome-icon :icon="['fas', 'shopping-cart']" class="fl-carrinho__icone" aria-hidden="true" />
    <span v-if="quantidade > 0" class="fl-carrinho__selo tabular" aria-hidden="true">
      <span v-for="digito in digitos" :key="digito.chave" class="fl-carrinho__janela">
        <Transition :name="`fl-numero-${sentido}`">
          <span :key="digito.caractere" class="fl-carrinho__digito">{{ digito.caractere }}</span>
        </Transition>
      </span>
    </span>
  </RouterLink>
</template>

<script setup>
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";

defineProps({});
defineEmits([]);

const { quantidade, rotulo, digitos, sentido } = useContadorCarrinho();
</script>

<style scoped lang="scss">
@use "../scss/carrinho";
</style>
