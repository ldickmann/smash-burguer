<!-- Rodapé afundado (N4) [87]: a marca, o endereço (que abre o mapa), o WhatsApp e o e-mail, a
     navegação repetida e os direitos. As redes ficam de fora: os links de REDES são genéricos [H25][H26]. -->
<template>
  <footer class="esc-rodape">
    <div class="container">
      <div class="esc-rodape__grade">
        <div class="esc-rodape__marca">
          <p class="esc-rodape__nome">{{ MARCA }}</p>
          <p class="esc-rodape__descricao">{{ DESCRICAO }}</p>
        </div>

        <div class="esc-rodape__coluna">
          <h2 class="esc-rodape__titulo">{{ RODAPE.endereco }}</h2>
          <EscLinkContato v-if="endereco" :contato="endereco" />
        </div>

        <div class="esc-rodape__coluna">
          <h2 class="esc-rodape__titulo">{{ TEXTOS.contatoTitulo }}</h2>
          <ul class="esc-rodape__lista" role="list">
            <li v-for="contato in contatos" :key="contato.chave">
              <EscLinkContato :contato="contato" />
            </li>
          </ul>
        </div>
      </div>

      <nav class="esc-rodape__nav" :aria-label="TEXTOS.rodapeNav">
        <ul class="esc-rodape__links" role="list">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="esc-rodape__link" :aria-current="null">{{ link.rotulo }}</RouterLink>
          </li>
        </ul>
      </nav>

      <p class="esc-rodape__direitos">{{ RODAPE.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { CONTATOS, DESCRICAO, EMAIL, ENDERECO, MARCA, RODAPE, TELEFONE } from "../../../compartilhado/dados";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import { TEXTOS } from "../textos";
import EscLinkContato from "./EscLinkContato.vue";

const props = defineProps({
  inicio: {
    type: String,
    default: "/direcoes/escuro",
  },
});

const links = useLinksPrincipais(props.inicio);

// Rótulo e valor separados: o valor real sozinho (sem o "·" do texto de CONTATOS)
const comValor = (chave, valor, rotulo = "") => {
  const contato = CONTATOS.find((c) => c.chave === chave);
  return contato ? { ...contato, texto: valor, rotulo } : null;
};

const endereco = comValor("endereco", ENDERECO);
const contatos = [comValor("whatsapp", TELEFONE, TEXTOS.whatsapp), comValor("email", EMAIL)].filter(Boolean);
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
