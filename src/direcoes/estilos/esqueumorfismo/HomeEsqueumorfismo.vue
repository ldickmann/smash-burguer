<!-- Home em esqueumorfismo, "O passe da cozinha" (só desenvolvimento): a coifa de inox, o lanche na
     chapa, os mais pedidos como comandas presas no trilho e o rodapé como o cupom. -->
<template>
  <MolduraDirecao estilo="esqueumorfismo">
    <template #topo>
      <header ref="cabecalho" class="esq-coifa">
        <div class="esq-coifa__interno container">
          <RouterLink :to="INICIO" class="esq-placa">
            <span class="esq-placa__texto">{{ MARCA }}</span>
          </RouterLink>

          <nav
            id="esq-menu"
            ref="menu"
            class="esq-menu"
            :class="{ 'is-aberto': aberto }"
            aria-label="Principal"
          >
            <ul class="esq-menu__lista" role="list">
              <li v-for="link in links" :key="link.to">
                <RouterLink :to="link.to" class="esq-gravado">{{ link.rotulo }}</RouterLink>
              </li>
            </ul>
          </nav>

          <div class="esq-coifa__acoes">
            <RouterLink to="/cart" class="esq-carrinho" :aria-label="rotulo">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="esq-carrinho__icone" aria-hidden="true" />
              <span class="esq-tambor tabular" aria-hidden="true">
                <span v-for="digito in digitos" :key="digito.chave" class="esq-tambor__janela">
                  <Transition :name="`esq-tambor-${sentido}`">
                    <span :key="digito.caractere" class="esq-tambor__digito">{{ digito.caractere }}</span>
                  </Transition>
                </span>
              </span>
            </RouterLink>
            <button
              ref="botaoMenu"
              type="button"
              class="esq-cromado esq-coifa__menu"
              aria-controls="esq-menu"
              :aria-expanded="String(aberto)"
              aria-label="Menu principal"
              @click="alternar"
            >
              <font-awesome-icon :icon="['fas', aberto ? 'xmark' : 'bars']" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </template>

    <template #default="{ personalizar }">
      <section class="esq-chapa" aria-labelledby="esq-titulo">
        <div class="esq-chapa__interno container">
          <div class="esq-chapa__texto">
            <h1 id="esq-titulo" class="esq-chapa__titulo">{{ HERO.titulo }}</h1>
            <div class="esq-etiqueta">
              <p class="esq-etiqueta__texto">{{ HERO.texto }}</p>
            </div>
            <RouterLink to="/menu" class="esq-botao esq-botao--grande">{{ HERO.acao }}</RouterLink>
          </div>

          <div class="esq-chapa__midia">
            <picture class="esq-chapa__foto">
              <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
              <img
                class="esq-chapa__img"
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

      <section class="esq-passe" aria-labelledby="mais-pedidos">
        <div class="container">
          <div class="esq-passe__cabecalho">
            <h2 id="mais-pedidos" class="esq-placa esq-placa--titulo">
              <span class="esq-placa__texto">{{ SECAO.titulo }}</span>
            </h2>
            <div class="esq-passe__setas">
              <button type="button" class="esq-cromado" :aria-label="SECAO.anterior" @click="carrossel?.prev()">
                <font-awesome-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
              </button>
              <button type="button" class="esq-cromado" :aria-label="SECAO.proximo" @click="carrossel?.next()">
                <font-awesome-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div class="esq-trilho">
            <Carousel ref="carrossel" v-bind="config" class="esq-carrossel">
              <Slide v-for="produto in productsStore.foods" :key="produto.id" class="esq-carrossel__slide">
                <CartaoProduto v-slot="cartao" :produto="produto">
                  <article class="esq-comanda" :class="{ 'is-carimbada': cartao.adicionado }">
                    <div class="esq-comanda__papel">
                      <div class="esq-comanda__foto">
                        <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                          <source
                            v-if="cartao.imagem.srcset"
                            type="image/webp"
                            :srcset="cartao.imagem.srcset"
                            :sizes="cartao.imagem.sizes"
                          />
                          <img
                            class="esq-comanda__img"
                            :src="cartao.imagem.src"
                            :alt="produto.name"
                            width="960"
                            height="720"
                            loading="lazy"
                            decoding="async"
                            @error="cartao.aoFalharImagem"
                          />
                        </picture>
                        <div v-else class="esq-comanda__reserva">
                          <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                        </div>
                      </div>

                      <h3 class="esq-comanda__nome">{{ produto.name }}</h3>
                      <p class="esq-comanda__descricao">{{ produto.description }}</p>
                      <div class="esq-comanda__total">
                        <p class="esq-comanda__preco tabular">{{ cartao.preco }}</p>
                        <button
                          type="button"
                          class="esq-botao"
                          :aria-label="`Adicionar ${produto.name}`"
                          @click="personalizar(produto, cartao.contexto)"
                        >
                          Adicionar
                        </button>
                      </div>
                      <span class="esq-carimbo" aria-hidden="true">Adicionado</span>
                    </div>
                  </article>
                </CartaoProduto>
              </Slide>

              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </div>
      </section>
    </template>

    <template #rodape>
      <footer class="esq-rodape">
        <div class="container">
          <div class="esq-cupom">
            <p class="esq-cupom__marca">{{ MARCA }}</p>
            <p class="esq-cupom__descricao">{{ DESCRICAO }}</p>

            <section class="esq-cupom__bloco" aria-labelledby="esq-rodape-endereco">
              <h2 id="esq-rodape-endereco" class="esq-cupom__titulo">{{ RODAPE.endereco }}</h2>
              <ul class="esq-cupom__lista" role="list">
                <li v-for="contato in CONTATOS" :key="contato.chave">
                  <a
                    class="esq-cupom__link"
                    :href="contato.href"
                    :target="contato.externo ? '_blank' : undefined"
                    :rel="contato.externo ? 'noopener noreferrer' : undefined"
                  >
                    <font-awesome-icon :icon="contato.icone" class="esq-cupom__icone" aria-hidden="true" />
                    <span>
                      {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section class="esq-cupom__bloco" aria-labelledby="esq-rodape-horario">
              <h2 id="esq-rodape-horario" class="esq-cupom__titulo">{{ RODAPE.horario }}</h2>
              <p>{{ HORARIO }}</p>
            </section>

            <section class="esq-cupom__bloco" aria-labelledby="esq-rodape-redes">
              <h2 id="esq-rodape-redes" class="esq-cupom__titulo">{{ RODAPE.redes }}</h2>
              <ul class="esq-cupom__redes" role="list">
                <li v-for="rede in REDES" :key="rede.nome">
                  <a
                    class="esq-cupom__link"
                    :href="rede.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="rede.rotulo"
                  >
                    <font-awesome-icon :icon="rede.icone" class="esq-cupom__icone" aria-hidden="true" />
                    <span>{{ rede.nome }}</span>
                  </a>
                </li>
              </ul>
            </section>

            <p class="esq-cupom__copy">{{ RODAPE.copyright }}</p>
          </div>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource/courier-prime/400.css";
import "@fontsource/courier-prime/700.css";
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
  useLinksPrincipais,
} from "../../compartilhado/conteudo";

const INICIO = "/direcoes/esqueumorfismo";

useEstiloAtivo("esqueumorfismo", { esquema: "light" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { rotulo, digitos, sentido } = useContadorCarrinho();
const { cabecalho, menu, botaoMenu, aberto, alternar } = useMenuPrincipal();

const carrossel = ref(null);
const config = configCarrossel({ espaco: 28 });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 560px, 340px",
});
</script>

<style scoped lang="scss">
@use "./home";
</style>
