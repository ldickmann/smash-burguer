<!-- A ousadia: a impressora térmica presa ao balcão imprime o carrinho de verdade [E41][E43][E46].
     O papel sai da fenda para cima: o cabeçalho, impresso primeiro, fica no alto, e a linha mais nova
     junto da fenda. Adicionais e retiradas entram recuados, como os modificadores do ticket [E31][E33].
     Sem aria-live: o modal Personalizar real já anuncia a adição. -->
<template>
  <section data-secao="cupom" aria-labelledby="esq-cupom-titulo" class="esq-cupom">
    <EsqImpressora :aceso="!vazio" :impressao="impressao">
      <p class="esq-cupom__marca">{{ MARCA }}</p>
      <h2 id="esq-cupom-titulo" class="esq-cupom__titulo">
        {{ vazio ? TEXTOS.cupom.vazioTitulo : TEXTOS.cupom.titulo }}
      </h2>
      <p v-if="vazio" class="esq-cupom__vazio">{{ TEXTOS.cupom.vazioTexto }}</p>
      <template v-else>
        <p v-if="ocultos" class="esq-cupom__ocultos">+ {{ ocultos }} {{ TEXTOS.cupom.ocultos }}</p>
        <TransitionGroup
          tag="ul"
          name="esq-imprime"
          class="esq-cupom__linhas"
          role="list"
          :aria-label="TEXTOS.cupom.listaRotulo"
        >
          <li v-for="linha in linhas" :key="linha.chave" class="esq-cupom__linha">
            <p class="esq-cupom__item"><span class="tabular">{{ linha.quantidade }}×</span> {{ linha.nome }}</p>
            <p class="esq-cupom__unitario tabular">{{ unitario(linha) }}</p>
            <p v-for="detalhe in linha.detalhes" :key="detalhe" class="esq-cupom__detalhe">{{ detalhe }}</p>
          </li>
        </TransitionGroup>
        <dl class="esq-cupom__total">
          <dt>{{ TEXTOS.cupom.subtotal }}</dt>
          <dd class="tabular">{{ subtotal }}</dd>
        </dl>
      </template>
      <!-- Vazio, a impressora fica parada, sem botão: o "Ver cardápio" já está na chapa, na mesma tela
           de 1440, e as comandas estão ao lado. O botão só aparece com o que levar ao carrinho. -->
      <template v-if="!vazio" #acao>
        <EsqBotao to="/cart">{{ TEXTOS.cupom.acao }}</EsqBotao>
      </template>
    </EsqImpressora>
  </section>
</template>

<script setup>
import { MARCA } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";
import { useCupom } from "../useCupom";
import EsqBotao from "../componentes/EsqBotao.vue";
import EsqImpressora from "../componentes/EsqImpressora.vue";

const { vazio, linhas, ocultos, subtotal, impressao } = useCupom();

// O preço unitário, com "cada" quando a linha tem mais de uma unidade (a seção não multiplica)
const unitario = (linha) => (linha.cada ? `${linha.preco} ${TEXTOS.cupom.cada}` : linha.preco);
</script>

<style scoped lang="scss">
@use "../scss/secao-cupom";
</style>
