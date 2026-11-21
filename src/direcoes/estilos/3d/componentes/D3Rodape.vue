<!-- Rodapé em maionese lisa, sem argila: a marca, o endereço e os contatos reais (Maps, wa.me e
     mailto:), o horário e os direitos [H29][H30][H33]. O WhatsApp mostra o rótulo e o número
     separados. Links externos avisam que abrem em nova aba [H34]. As redes ficaram fora: os links são
     genéricos, não levam ao perfil da loja [H25][H26]. -->
<template>
  <footer class="d3-rodape">
    <div class="container d3-rodape__grade">
      <div class="d3-rodape__marca">
        <p class="d3-rodape__nome">{{ MARCA }}</p>
        <p class="d3-rodape__texto">{{ DESCRICAO }}</p>
      </div>

      <div class="d3-rodape__coluna">
        <h2 class="d3-rodape__titulo">{{ RODAPE.endereco }}</h2>
        <ul class="d3-rodape__lista" role="list">
          <li v-for="contato in contatos" :key="contato.chave">
            <a
              class="d3-rodape__link"
              :href="contato.href"
              :target="contato.externo ? '_blank' : undefined"
              :rel="contato.externo ? 'noopener noreferrer' : undefined"
            >
              <font-awesome-icon :icon="contato.icone" class="d3-rodape__icone" aria-hidden="true" />
              <span class="d3-rodape__rotulo">
                <span v-if="contato.rotulo" class="d3-rodape__tipo">{{ contato.rotulo }}</span>
                <span>{{ contato.valor }}</span>
                <span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div class="d3-rodape__coluna">
        <h2 class="d3-rodape__titulo">{{ RODAPE.horario }}</h2>
        <p class="d3-rodape__texto">{{ HORARIO }}</p>
      </div>
    </div>
    <div class="container">
      <p class="d3-rodape__copy">{{ RODAPE.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { CONTATOS, DESCRICAO, EMAIL, ENDERECO, HORARIO, MARCA, NOVA_ABA, RODAPE, TELEFONE } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";

// O link e o ícone de CONTATOS; o texto separado em rótulo e valor, sem o "·"
const VALORES = {
  endereco: { valor: ENDERECO },
  whatsapp: { rotulo: TEXTOS.whatsapp, valor: TELEFONE },
  email: { valor: EMAIL },
};

const contatos = CONTATOS.map((contato) => ({ ...contato, ...(VALORES[contato.chave] ?? { valor: contato.texto }) }));
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
