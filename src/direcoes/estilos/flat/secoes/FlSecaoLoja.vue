<!-- Quando abre e como chegar ou falar com a casa, com links reais [H29][H26][H32][H33]: o ladrilho de
     informações em versão quieta, o horário em texto absoluto [F28] e os links em linha. Nenhum
     "aberto agora": não há dado de feriado, e o horário passa da meia-noite [H31]. -->
<template>
  <section data-secao="loja" aria-labelledby="fl-loja-titulo" class="fl-loja container">
    <h2 id="fl-loja-titulo" class="fl-loja__titulo" tabindex="-1">{{ TEXTOS.loja.titulo }}</h2>
    <div class="fl-loja__grade">
      <p class="fl-loja__horario">{{ HORARIO }}</p>
      <ul class="fl-loja__lista" role="list">
        <li v-for="contato in contatos" :key="contato.chave">
          <FlLinkContato :contato="contato" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { CONTATOS, EMAIL, ENDERECO, HORARIO, TELEFONE } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";
import FlLinkContato from "../componentes/FlLinkContato.vue";

defineProps({});
defineEmits([]);

// Rótulo e valor separados, sem o "·" do texto de CONTATOS: só o WhatsApp precisa de rótulo
const VALOR = { endereco: ENDERECO, whatsapp: TELEFONE, email: EMAIL };
const ROTULO = { whatsapp: TEXTOS.loja.whatsapp };

const contatos = CONTATOS.map((contato) => ({
  ...contato,
  rotulo: ROTULO[contato.chave] ?? "",
  valor: VALOR[contato.chave] ?? contato.texto,
}));
</script>

<style scoped lang="scss">
@use "../scss/secao-loja";
</style>
