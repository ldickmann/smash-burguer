<!-- Vitrine: os lanches reais em grade estática de cards horizontais, sem carrossel [H6][H9][H20]. A
     vitrine abre num degrau visível: a caixa N12 sai da base N6, e os cards N17 saem da caixa; o card de
     um lanche que já está no pedido sobe mais um (N22) [87][83]. A legenda mostra a marca em tertiary
     antes do primeiro "Adicionar", para a regra do pedido aparecer logo abaixo do palco. O "Ver
     cardápio" daqui repete o do palco e fica neutro (on-surface sublinhado): o primary é só da ação
     principal [81]. Lista vazia: o estado vazio do MenuView. -->
<template>
  <section data-secao="vitrine" aria-labelledby="esc-vitrine-titulo" class="esc-vitrine">
    <div class="container">
      <div class="esc-vitrine__caixa">
        <div class="esc-vitrine__cabecalho">
          <h2 id="esc-vitrine-titulo" class="esc-vitrine__titulo">{{ lanches.rotulo }}</h2>
          <p class="esc-vitrine__legenda">
            <span class="esc-vitrine__marca">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="esc-vitrine__marca-icone" aria-hidden="true" />
              {{ TEXTOS.noPedido }}
            </span>
            {{ TEXTOS.noPedidoLegenda }}
          </p>
          <RouterLink to="/menu" class="esc-vitrine__link">{{ HERO.acao }}</RouterLink>
        </div>

        <ul v-if="lanches.itens.length" class="esc-vitrine__lista" role="list">
          <li v-for="produto in lanches.itens" :key="produto.id">
            <EscCartao :produto="produto" :quantidade-no-pedido="quantidadeNoPedido(produto)" />
          </li>
        </ul>
        <EscVazio v-else :titulo="REAIS.vazioTitulo" :texto="REAIS.vazioTexto" :nivel="3" plano />
      </div>
    </div>
  </section>
</template>

<script setup>
import { HERO } from "../../../compartilhado/dados";
import { useCardapio } from "../../../compartilhado/useCardapio";
import EscCartao from "../componentes/EscCartao.vue";
import EscVazio from "../componentes/EscVazio.vue";
import { REAIS, TEXTOS } from "../textos";
import { useNoPedido } from "../useNoPedido";

const { categoria } = useCardapio();
const lanches = categoria("foods");
const { quantidadeNoPedido } = useNoPedido();
</script>

<style scoped lang="scss">
@use "../scss/secao-vitrine";
</style>
