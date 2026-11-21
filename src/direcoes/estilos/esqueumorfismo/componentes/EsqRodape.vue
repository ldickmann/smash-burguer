<!-- O rodapé: a placa de horário de inox escovado, parafusada com quatro rebites na parede de chapa
     [G2]. Marca e descrição, horário, endereço e contatos reais; os direitos ficam na parede. Sem as
     redes: os links de REDES são genéricos e não levam ao perfil da loja [H25][H26]. -->
<template>
  <footer class="esq-rodape">
    <div class="container">
      <div class="esq-rodape__placa">
        <span class="esq-rodape__rebites" aria-hidden="true"></span>

        <div class="esq-rodape__bloco esq-rodape__bloco--marca">
          <p class="esq-rodape__marca">{{ MARCA }}</p>
          <p class="esq-rodape__descricao">{{ DESCRICAO }}</p>
        </div>

        <div class="esq-rodape__bloco">
          <h2 class="esq-rodape__titulo">{{ RODAPE.horario }}</h2>
          <p class="esq-rodape__texto">{{ HORARIO }}</p>
        </div>

        <div class="esq-rodape__bloco">
          <h2 class="esq-rodape__titulo">{{ RODAPE.endereco }}</h2>
          <ul class="esq-rodape__contatos" role="list">
            <li v-for="contato in contatos" :key="contato.chave" class="esq-rodape__contato">
              <span v-if="contato.rotulo" class="esq-rodape__rotulo">{{ contato.rotulo }}</span>
              <a
                class="esq-rodape__link"
                :href="contato.href"
                :target="contato.externo ? '_blank' : undefined"
                :rel="contato.externo ? 'noopener noreferrer' : undefined"
              >
                <font-awesome-icon :icon="contato.icone" class="esq-rodape__icone" aria-hidden="true" />
                <span>
                  {{ contato.valor }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p class="esq-rodape__direitos">{{ RODAPE.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { CONTATOS, DESCRICAO, EMAIL, ENDERECO, HORARIO, MARCA, NOVA_ABA, RODAPE, TELEFONE } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";

// Rótulo e valor separados, sem o "·" do texto de CONTATOS; o link e o ícone vêm de CONTATOS
const VALORES = {
  endereco: { rotulo: "", valor: ENDERECO },
  whatsapp: { rotulo: TEXTOS.rodape.whatsapp, valor: TELEFONE },
  email: { rotulo: TEXTOS.rodape.email, valor: EMAIL },
};

const contatos = CONTATOS.filter((contato) => VALORES[contato.chave]).map((contato) => ({
  ...contato,
  ...VALORES[contato.chave],
}));
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
