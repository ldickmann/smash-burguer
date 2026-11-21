<!-- Home em neumorfismo, "Kraft prensado" (só desenvolvimento): tudo extrudado do mesmo kraft,
     e o que se aperta afunda, como o smash. -->
<template>
  <MolduraDirecao estilo="neumorfismo">
    <template #topo>
      <header ref="cabecalho" class="neu-topo">
        <div class="container">
          <div class="neu-barra">
            <RouterLink :to="INICIO" class="neu-marca">{{ MARCA }}</RouterLink>

            <nav
              id="neu-menu"
              ref="menu"
              class="neu-menu"
              :class="{ 'is-aberto': aberto }"
              aria-label="Principal"
            >
              <ul class="neu-menu__lista" role="list">
                <li v-for="link in links" :key="link.to">
                  <RouterLink :to="link.to" class="neu-link">{{ link.rotulo }}</RouterLink>
                </li>
              </ul>
            </nav>

            <div class="neu-barra__acoes">
              <RouterLink to="/cart" class="neu-redondo neu-carrinho" :aria-label="rotulo">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" aria-hidden="true" />
                <Transition name="neu-badge">
                  <span v-if="quantidade > 0" class="neu-badge tabular" aria-hidden="true">{{ texto }}</span>
                </Transition>
              </RouterLink>
              <button
                ref="botaoMenu"
                type="button"
                class="neu-redondo neu-barra__menu"
                aria-controls="neu-menu"
                :aria-expanded="String(aberto)"
                aria-label="Menu principal"
                @click="alternar"
              >
                <font-awesome-icon :icon="['fas', aberto ? 'xmark' : 'bars']" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </template>

    <template #default="{ personalizar }">
      <section class="neu-hero" aria-labelledby="neu-titulo">
        <div class="neu-hero__interno container">
          <div class="neu-hero__texto">
            <h1 id="neu-titulo" class="neu-hero__titulo">{{ HERO.titulo }}</h1>
            <p class="neu-hero__descricao">{{ HERO.texto }}</p>
            <RouterLink to="/menu" class="neu-acao">{{ HERO.acao }}</RouterLink>
          </div>

          <div class="neu-prato">
            <picture class="neu-prato__foto">
              <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
              <img
                class="neu-prato__img"
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
        </div>
      </section>

      <section class="neu-populares" aria-labelledby="mais-pedidos">
        <div class="container">
          <div class="neu-populares__cabecalho">
            <h2 id="mais-pedidos" class="neu-populares__titulo">{{ SECAO.titulo }}</h2>
            <div class="neu-populares__setas">
              <button type="button" class="neu-redondo" :aria-label="SECAO.anterior" @click="carrossel?.prev()">
                <font-awesome-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
              </button>
              <button type="button" class="neu-redondo" :aria-label="SECAO.proximo" @click="carrossel?.next()">
                <font-awesome-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
              </button>
            </div>
          </div>

          <Carousel ref="carrossel" v-bind="config" class="neu-carrossel">
            <Slide v-for="produto in productsStore.foods" :key="produto.id" class="neu-carrossel__slide">
              <CartaoProduto v-slot="cartao" :produto="produto">
                <article class="neu-card">
                  <div class="neu-card__moldura">
                    <div class="neu-card__foto">
                      <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                        <source
                          v-if="cartao.imagem.srcset"
                          type="image/webp"
                          :srcset="cartao.imagem.srcset"
                          :sizes="cartao.imagem.sizes"
                        />
                        <img
                          class="neu-card__img"
                          :src="cartao.imagem.src"
                          :alt="produto.name"
                          width="960"
                          height="720"
                          loading="lazy"
                          decoding="async"
                          @error="cartao.aoFalharImagem"
                        />
                      </picture>
                      <div v-else class="neu-card__reserva">
                        <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <h3 class="neu-card__nome">{{ produto.name }}</h3>
                  <p class="neu-card__descricao">{{ produto.description }}</p>
                  <div class="neu-card__rodape">
                    <p class="neu-card__preco tabular">{{ cartao.preco }}</p>
                    <button
                      type="button"
                      class="neu-adicionar"
                      :class="{ 'is-adicionado': cartao.adicionado }"
                      v-bind="cartao.atributosAdicionar"
                      @click="personalizar(produto, cartao.contexto)"
                    >
                      <span class="neu-adicionar__face neu-adicionar__face--frente">Adicionar</span>
                      <span class="neu-adicionar__face neu-adicionar__face--verso" aria-hidden="true">
                        <font-awesome-icon :icon="['fas', 'check']" /> Adicionado
                      </span>
                    </button>
                  </div>
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
      <footer class="neu-rodape">
        <div class="container">
          <div class="neu-rodape__painel">
            <div class="neu-rodape__marca">
              <p class="neu-rodape__nome">{{ MARCA }}</p>
              <p class="neu-rodape__texto">{{ DESCRICAO }}</p>
            </div>

            <section class="neu-rodape__coluna" aria-labelledby="neu-rodape-endereco">
              <h2 id="neu-rodape-endereco" class="neu-rodape__titulo">{{ RODAPE.endereco }}</h2>
              <ul class="neu-rodape__lista" role="list">
                <li v-for="contato in CONTATOS" :key="contato.chave">
                  <a
                    class="neu-rodape__link"
                    :href="contato.href"
                    :target="contato.externo ? '_blank' : undefined"
                    :rel="contato.externo ? 'noopener noreferrer' : undefined"
                  >
                    <font-awesome-icon :icon="contato.icone" class="neu-rodape__icone" aria-hidden="true" />
                    <span>
                      {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section class="neu-rodape__coluna" aria-labelledby="neu-rodape-horario">
              <h2 id="neu-rodape-horario" class="neu-rodape__titulo">{{ RODAPE.horario }}</h2>
              <p class="neu-rodape__texto">{{ HORARIO }}</p>
            </section>

            <section class="neu-rodape__coluna" aria-labelledby="neu-rodape-redes">
              <h2 id="neu-rodape-redes" class="neu-rodape__titulo">{{ RODAPE.redes }}</h2>
              <ul class="neu-rodape__redes" role="list">
                <li v-for="rede in REDES" :key="rede.nome">
                  <a
                    class="neu-redondo"
                    :href="rede.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="rede.rotulo"
                  >
                    <font-awesome-icon :icon="rede.icone" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </section>

            <p class="neu-rodape__copy">{{ RODAPE.copyright }}</p>
          </div>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/nunito";
import "vue3-carousel/carousel.css";
import "./_tokens.scss";
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { useProductsStore } from "@/stores/products";
import { responsiveImage } from "@/composables/useResponsiveImage";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import CartaoProduto from "../../compartilhado/CartaoProduto.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import { useMenuPrincipal } from "../../compartilhado/useMenuPrincipal";
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

const INICIO = "/direcoes/neumorfismo";

useEstiloAtivo("neumorfismo", { esquema: "light" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { quantidade, rotulo, texto } = useContadorCarrinho();
const { cabecalho, menu, botaoMenu, aberto, alternar } = useMenuPrincipal();

const carrossel = ref(null);
// Espaço largo entre os cards: a sombra dupla precisa de ar para ler como relevo
const config = configCarrossel({ espaco: 32 });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 420px, 280px",
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
