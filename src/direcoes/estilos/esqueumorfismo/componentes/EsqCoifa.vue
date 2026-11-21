<!-- A coifa de inox no topo: a placa da marca (o único elemento em placa, porque é clicável [E15]),
     os três links gravados à vista e o carrinho com o contador de tambor. Sem menu escondido: com
     três links, eles cabem numa linha fixa junto do carrinho [H14][H17]. Abaixo de md, a linha da
     marca sai ao rolar e a da nav com o carrinho fica presa no topo. -->
<template>
  <header class="esq-coifa">
    <div class="esq-coifa__interno container">
      <RouterLink :to="inicio" class="esq-coifa__marca">
        <span class="esq-coifa__marca-texto">{{ MARCA }}</span>
      </RouterLink>

      <nav class="esq-coifa__nav" aria-label="Principal">
        <ul class="esq-coifa__links" role="list">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="esq-coifa__link">{{ link.rotulo }}</RouterLink>
          </li>
        </ul>
      </nav>

      <RouterLink to="/cart" class="esq-coifa__carrinho" :aria-label="rotulo">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" class="esq-coifa__icone" aria-hidden="true" />
        <span class="esq-tambor tabular" aria-hidden="true">
          <span v-for="digito in digitos" :key="digito.chave" class="esq-tambor__janela">
            <Transition :name="`esq-tambor-${sentido}`">
              <span :key="digito.caractere" class="esq-tambor__digito">{{ digito.caractere }}</span>
            </Transition>
          </span>
        </span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { MARCA } from "../../../compartilhado/dados";
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

const links = useLinksPrincipais(props.inicio);
const { rotulo, digitos, sentido } = useContadorCarrinho();
</script>

<style scoped lang="scss">
@use "../scss/coifa";
</style>
