<!-- Home em minimalismo, "Só o que importa" (só desenvolvimento): preto e branco, a cor só nas fotos,
     navegação sempre visível (inclusive no celular) e a tipografia larga e pesada no lugar do enfeite. -->
<template>
  <MolduraDirecao estilo="minimalismo">
    <template #topo>
      <header class="mn-topo">
        <div class="mn-topo__interno mn-largura">
          <RouterLink :to="INICIO" class="mn-marca">{{ MARCA }}</RouterLink>
          <nav class="mn-nav" aria-label="Principal">
            <ul class="mn-nav__lista" role="list">
              <li v-for="link in links" :key="link.to">
                <RouterLink :to="link.to" class="mn-link">{{ link.rotulo }}</RouterLink>
              </li>
              <li>
                <!-- Nome acessível começa pelo texto visível: "Carrinho 3 itens" -->
                <RouterLink to="/cart" class="mn-link mn-carrinho">
                  Carrinho
                  <span class="mn-carrinho__numero tabular">
                    <Transition name="mn-troca" mode="out-in">
                      <span :key="quantidade">{{ quantidade }}</span>
                    </Transition>
                  </span>
                  <span class="visually-hidden">{{ quantidade === 1 ? " item" : " itens" }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </template>

    <template #default="{ personalizar }">
      <section class="mn-hero" aria-labelledby="mn-titulo">
        <div class="mn-hero__grade mn-largura">
          <div class="mn-hero__texto">
            <h1 id="mn-titulo" class="mn-hero__titulo">{{ HERO.titulo }}</h1>
            <p class="mn-hero__descricao">{{ HERO.texto }}</p>
            <RouterLink to="/menu" class="mn-botao">{{ HERO.acao }}</RouterLink>
          </div>
          <picture class="mn-hero__foto">
            <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
            <img
              class="mn-hero__img"
              :src="imagemHero.src"
              :alt="HERO.alt"
              :width="HERO.largura"
              :height="HERO.altura"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </section>

      <section class="mn-populares" aria-labelledby="mais-pedidos">
        <div class="mn-largura">
          <div class="mn-populares__cabecalho">
            <h2 id="mais-pedidos" class="mn-populares__titulo">{{ SECAO.titulo }}</h2>
            <div class="mn-populares__setas">
              <button type="button" class="mn-seta" :aria-label="SECAO.anterior" @click="carrossel?.prev()">
                <font-awesome-icon :icon="faArrowLeft" aria-hidden="true" />
              </button>
              <button type="button" class="mn-seta" :aria-label="SECAO.proximo" @click="carrossel?.next()">
                <font-awesome-icon :icon="faArrowRight" aria-hidden="true" />
              </button>
            </div>
          </div>

          <Carousel ref="carrossel" v-bind="config" class="mn-carrossel">
            <Slide v-for="produto in productsStore.foods" :key="produto.id" class="mn-carrossel__slide">
              <CartaoProduto v-slot="cartao" :produto="produto">
                <article class="mn-card">
                  <div class="mn-card__foto">
                    <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                      <source
                        v-if="cartao.imagem.srcset"
                        type="image/webp"
                        :srcset="cartao.imagem.srcset"
                        :sizes="cartao.imagem.sizes"
                      />
                      <img
                        class="mn-card__img"
                        :src="cartao.imagem.src"
                        :alt="produto.name"
                        width="960"
                        height="720"
                        loading="lazy"
                        decoding="async"
                        @error="cartao.aoFalharImagem"
                      />
                    </picture>
                    <div v-else class="mn-card__reserva">
                      <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                    </div>
                  </div>

                  <div class="mn-card__linha">
                    <h3 class="mn-card__nome">{{ produto.name }}</h3>
                    <p class="mn-card__preco tabular">{{ cartao.preco }}</p>
                  </div>
                  <p class="mn-card__descricao">{{ produto.description }}</p>
                  <button
                    type="button"
                    class="mn-adicionar"
                    :class="{ 'is-adicionado': cartao.adicionado }"
                    v-bind="cartao.atributosAdicionar"
                    @click="personalizar(produto, cartao.contexto)"
                  >
                    <span class="mn-adicionar__face mn-adicionar__face--frente">Adicionar</span>
                    <span class="mn-adicionar__face mn-adicionar__face--verso" aria-hidden="true">
                      <font-awesome-icon :icon="['fas', 'check']" /> Adicionado
                    </span>
                  </button>
                </article>
              </CartaoProduto>
            </Slide>

            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </section>
    </template>

    <template #rodape>
      <footer class="mn-rodape">
        <div class="mn-largura">
          <div class="mn-rodape__grade">
            <div class="mn-rodape__marca">
              <p class="mn-rodape__nome">{{ MARCA }}</p>
              <p class="mn-rodape__texto">{{ DESCRICAO }}</p>
            </div>

            <section class="mn-rodape__coluna" aria-labelledby="mn-rodape-endereco">
              <h2 id="mn-rodape-endereco" class="mn-rodape__titulo">{{ RODAPE.endereco }}</h2>
              <ul class="mn-rodape__lista" role="list">
                <li v-for="contato in CONTATOS" :key="contato.chave">
                  <a
                    class="mn-rodape__link"
                    :href="contato.href"
                    :target="contato.externo ? '_blank' : undefined"
                    :rel="contato.externo ? 'noopener noreferrer' : undefined"
                  >
                    {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                  </a>
                </li>
              </ul>
            </section>

            <section class="mn-rodape__coluna" aria-labelledby="mn-rodape-horario">
              <h2 id="mn-rodape-horario" class="mn-rodape__titulo">{{ RODAPE.horario }}</h2>
              <p class="mn-rodape__texto">{{ HORARIO }}</p>
            </section>

            <section class="mn-rodape__coluna" aria-labelledby="mn-rodape-redes">
              <h2 id="mn-rodape-redes" class="mn-rodape__titulo">{{ RODAPE.redes }}</h2>
              <ul class="mn-rodape__lista" role="list">
                <li v-for="rede in REDES" :key="rede.nome">
                  <a
                    class="mn-rodape__link"
                    :href="rede.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="rede.rotulo"
                  >
                    {{ rede.nome }}
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <p class="mn-rodape__copy">{{ RODAPE.copyright }}</p>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/archivo/wdth.css";
import "vue3-carousel/carousel.css";
import "./_tokens.scss";
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
// Ícones novos importados aqui, sem mexer no registro global de src/plugins/fontawesome.js
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useProductsStore } from "@/stores/products";
import { responsiveImage } from "@/composables/useResponsiveImage";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import CartaoProduto from "../../compartilhado/CartaoProduto.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import { useContadorCarrinho } from "../../compartilhado/useContadorCarrinho";
import { configCarrossel } from "../../compartilhado/carrossel";
import {
  CONTATOS,
  DESCRICAO,
  HERO,
  HORARIO,
  IMAGEM_HERO,
  MARCA,
  NOVA_ABA,
  REDES,
  RODAPE,
  SECAO,
} from "../../compartilhado/dados";
import { useLinksPrincipais } from "../../compartilhado/useLinksPrincipais";

const INICIO = "/direcoes/minimalismo";

useEstiloAtivo("minimalismo", { esquema: "light" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { quantidade } = useContadorCarrinho();

const carrossel = ref(null);
// Agrupamento só por espaço: muito branco entre os itens
const config = configCarrossel({ espaco: 40 });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 340px, 260px",
});
</script>

<style scoped lang="scss">
@use "./home";

// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.moldura :deep(.moldura__conteudo) {
  flex: 1;
  min-width: 0;
}
</style>
