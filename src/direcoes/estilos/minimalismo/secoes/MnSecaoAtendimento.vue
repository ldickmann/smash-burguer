<!-- Atendimento: quando abre, onde fica e como falar, num bloco próprio e não só no rodapé [H29][H26].
     Rótulo e valor separados, sem o "·" de CONTATOS. Mapa e WhatsApp abrem outro app (nova aba, com
     aviso [H34]); o e-mail, não. Os links ficam fora de frase, com alvo de 44 px [M36]. -->
<template>
  <section data-secao="atendimento" aria-labelledby="mn-atendimento" class="mn-atendimento">
    <div class="mn-atendimento__interno">
      <h2 id="mn-atendimento" class="mn-atendimento__titulo" tabindex="-1">{{ TEXTOS.atendimento }}</h2>
      <dl class="mn-atendimento__lista">
        <dt class="mn-atendimento__rotulo">{{ RODAPE.horario }}</dt>
        <dd class="mn-atendimento__valor">{{ HORARIO }}</dd>

        <dt class="mn-atendimento__rotulo">{{ RODAPE.endereco }}</dt>
        <dd class="mn-atendimento__valor">
          <a class="mn-atendimento__link" :href="endereco.href" target="_blank" rel="noopener noreferrer">
            {{ ENDERECO }}<span class="visually-hidden">{{ NOVA_ABA }}</span>
          </a>
        </dd>

        <dt class="mn-atendimento__rotulo">{{ TEXTOS.contato }}</dt>
        <dd class="mn-atendimento__valor">
          <ul class="mn-atendimento__contatos" role="list">
            <li>
              <a class="mn-atendimento__link" :href="whatsapp.href" target="_blank" rel="noopener noreferrer">
                <span>{{ TEXTOS.whatsapp }} <span class="tabular">{{ TELEFONE }}</span></span>
                <span class="visually-hidden">{{ NOVA_ABA }}</span>
              </a>
            </li>
            <li>
              <a class="mn-atendimento__link" :href="email.href">{{ EMAIL }}</a>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { CONTATOS, EMAIL, ENDERECO, HORARIO, NOVA_ABA, RODAPE, TELEFONE } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";

// Os links (mapa com api=1, wa.me só com os dígitos, mailto:) são os de CONTATOS
const contato = (chave) => CONTATOS.find((c) => c.chave === chave);
const endereco = contato("endereco");
const whatsapp = contato("whatsapp");
const email = contato("email");
</script>

<style scoped lang="scss">
@use "../scss/secao-atendimento";
</style>
