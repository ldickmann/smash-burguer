<template>
  <figure class="burger-stack">
    <!-- A pilha é ilustração: os controles acessíveis são os checkboxes e os steppers -->
    <div class="burger-stack__stage" aria-hidden="true">
      <TransitionGroup tag="div" name="layer" class="burger-stack__scene">
        <div
          v-for="(layer, index) in layers"
          :key="layer.key"
          class="burger-stack__slot"
          :style="{ '--i': index }"
        >
          <div
            class="burger-stack__layer"
            :class="`burger-stack__layer--${layer.shape}`"
            :style="{ '--layer-color': layer.color, '--layer-accent': layer.accent }"
            :data-ingredient="layer.name"
            :data-part="layer.part"
          ></div>
        </div>
      </TransitionGroup>
    </div>
    <figcaption class="burger-stack__legend">{{ legend }}</figcaption>
  </figure>
</template>

<script>
/*
 * Mapa de camadas (SPEC §7.4). As cores são ilustração, não tokens de UI:
 * são a única exceção ao critério 5 da §1.1.
 * `order` é a posição de baixo para cima.
 */
const LAYERS = {
  "Pão de hambúrguer": { shape: "bun", color: "#D9A05B", accent: "#E8B46A", order: 1 },
  Maionese: { shape: "sauce", color: "#F1E6C8", order: 2 },
  "Hambúrguer artesanal": { shape: "patty", color: "#5A2E1A", order: 3 },
  "Hambúrguer de picanha": { shape: "patty", color: "#5A2E1A", order: 3 },
  "Hambúrguer de frango": { shape: "chicken", color: "#C98A4B", order: 3 },
  "Hambúrguer de soja": { shape: "patty", color: "#7A5B3A", order: 3 },
  Ovo: { shape: "egg", color: "#FFF6E5", accent: "#F6B21B", order: 3.5 },
  Queijo: { shape: "cheese", color: "#F2B705", order: 4 },
  "Queijo Cheddar": { shape: "cheese", color: "#E8891B", order: 4 },
  Bacon: { shape: "bacon", color: "#B5452C", order: 5 },
  Cebola: { shape: "onion-rings", color: "#C9A3C8", order: 6 },
  "Cebola caramelizada": { shape: "onion-strips", color: "#C47A3D", order: 6 },
  Pepino: { shape: "pickles", color: "#8DB255", order: 7 },
  Pickles: { shape: "pickles", color: "#8DB255", order: 7 },
  Tomate: { shape: "tomato", color: "#E5383B", order: 8 },
  Alface: { shape: "lettuce", color: "#5DBB63", order: 9 },
  Ketchup: { shape: "sauce", color: "#C1272D", order: 10 },
};

// Adicional → camada (os nomes do catálogo nem sempre batem com os do ingrediente)
const ADDITIONAL_LAYER = {
  Bacon: "Bacon",
  Ovo: "Ovo",
  Queijo: "Queijo",
  "Queijo Cheddar": "Queijo Cheddar",
  "Cebola Caramelizada": "Cebola caramelizada",
};

const MAX_LAYERS = 16;
const MAX_PER_ADDITIONAL = 5;
const TOP_BUN_ORDER = 99;

/** O produto é um hambúrguer quando todos os ingredientes têm camada no mapa. */
export const isBurger = (product) =>
  product?.category === "foods" &&
  Boolean(product.ingredients?.length) &&
  product.ingredients.every((name) => name in LAYERS);
</script>

<script setup>
import { computed } from "vue";
import { formatAdditionals, formatRemovedIngredients } from "@/utils/formatters";

const props = defineProps({
  // { name, included }[]
  ingredients: {
    type: Array,
    required: true,
  },
  // { name, quantity }[]
  additionals: {
    type: Array,
    default: () => [],
  },
});

const layers = computed(() => {
  const list = [];
  const seen = {};
  const push = (name, extra = {}) => {
    const spec = LAYERS[name];
    if (!spec) return;
    const count = seen[name] ?? 0;
    seen[name] = count + 1;
    // Chave estável: tipo + índice
    list.push({ name, key: `${name}-${count}`, ...spec, ...extra });
  };

  props.ingredients
    .filter((ingredient) => ingredient.included)
    .forEach((ingredient) => {
      if (ingredient.name === "Pão de hambúrguer") {
        push(ingredient.name, { part: "base" });
        list.push({
          ...LAYERS[ingredient.name],
          name: ingredient.name,
          key: "Pão de hambúrguer-topo",
          shape: "bun-top",
          part: "top",
          order: TOP_BUN_ORDER,
        });
        return;
      }
      push(ingredient.name);
    });

  // Cada unidade de adicional acrescenta uma camada, até 5 por tipo
  props.additionals.forEach((additional) => {
    const layerName = ADDITIONAL_LAYER[additional.name];
    const units = Math.min(additional.quantity, MAX_PER_ADDITIONAL);
    for (let i = 0; i < units; i += 1) push(layerName, { fromAdditional: true });
  });

  list.sort((a, b) => a.order - b.order);

  // No máximo 16 camadas: corta adicionais excedentes, nunca o pão
  while (list.length > MAX_LAYERS) {
    const index = list.findLastIndex((layer) => layer.fromAdditional);
    if (index === -1) break;
    list.splice(index, 1);
  }

  return list;
});

const legend = computed(() => {
  const removed = props.ingredients
    .filter((ingredient) => !ingredient.included)
    .map((ingredient) => ingredient.name);
  const parts = [formatRemovedIngredients(removed), formatAdditionals(props.additionals)].filter(
    Boolean
  );
  return parts.length ? parts.join(" · ") : "Do jeito da casa";
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

// Ilustração do montador (SPEC §7.4). As cores ilustrativas vêm por --layer-color.

.burger-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.burger-stack__stage {
  width: 160px;
  aspect-ratio: 1;
  perspective: 900px;

  @include up(md) {
    width: 220px;
  }
}

.burger-stack__scene {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(58deg) rotateZ(-28deg);
}

// O slot recebe as transições de entrada e saída; a camada, a posição na pilha
.burger-stack__slot {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.burger-stack__layer {
  --gap: 9px;
  --edge: color-mix(in srgb, var(--layer-color) 70%, black);

  position: absolute;
  inset: 14%;
  border-radius: 50%;
  background: var(--layer-color);
  // Espessura simulada
  box-shadow:
    0 1px 0 var(--edge),
    0 2px 0 var(--edge);
  transform: translateZ(calc(var(--i) * var(--gap)));
  transition: transform var(--dur-base) var(--ease-out);
}

@include up(md) {
  .burger-stack__layer {
    --gap: 12px;
  }
}

// Formas
.burger-stack__layer--bun {
  inset: 12%;
  box-shadow:
    0 2px 0 var(--edge),
    0 4px 0 var(--edge),
    0 6px 0 var(--edge);
}

.burger-stack__layer--bun-top {
  inset: 11%;
  background: radial-gradient(circle at 40% 35%, var(--layer-accent) 0 30%, var(--layer-color) 70%);
  box-shadow:
    0 2px 0 var(--edge),
    0 4px 0 var(--edge),
    0 7px 0 var(--edge),
    0 10px 0 var(--edge);
}

.burger-stack__layer--sauce {
  inset: 15%;
  border-radius: 46% 54% 52% 48% / 50% 46% 54% 50%;
  box-shadow: none;
}

.burger-stack__layer--patty {
  inset: 10%;
  box-shadow:
    0 2px 0 var(--edge),
    0 4px 0 var(--edge),
    0 6px 0 var(--edge);
}

.burger-stack__layer--chicken {
  inset: 9%;
  border-radius: 44% 56% 48% 52% / 54% 44% 56% 46%;
  box-shadow:
    0 2px 0 var(--edge),
    0 5px 0 var(--edge);
}

.burger-stack__layer--egg {
  inset: 13%;
  border-radius: 48% 52% 40% 60% / 56% 44% 56% 44%;
  background: radial-gradient(circle at 50% 50%, var(--layer-accent) 0 22%, var(--layer-color) 24%);
}

// Fatia com um canto caído
.burger-stack__layer--cheese {
  inset: 9%;
  border-radius: 6px 6px 40% 6px;
}

// Fita ondulada
.burger-stack__layer--bacon {
  inset: 30% 6%;
  border-radius: 40% 20% 40% 20% / 50%;
  background: repeating-linear-gradient(
    90deg,
    var(--layer-color) 0 10px,
    color-mix(in srgb, var(--layer-color) 70%, white) 10px 14px
  );
}

.burger-stack__layer--onion-rings {
  inset: 18%;
  background: transparent;
  border: 5px solid var(--layer-color);
  box-shadow: inset 0 0 0 9px transparent, inset 0 0 0 13px var(--layer-color);
}

.burger-stack__layer--onion-strips {
  inset: 14%;
  background: repeating-linear-gradient(
    35deg,
    var(--layer-color) 0 6px,
    color-mix(in srgb, var(--layer-color) 60%, black) 6px 8px
  );
}

.burger-stack__layer--pickles {
  inset: 16%;
  background:
    radial-gradient(circle at 28% 32%, var(--layer-color) 0 13%, transparent 14%),
    radial-gradient(circle at 70% 30%, var(--layer-color) 0 13%, transparent 14%),
    radial-gradient(circle at 50% 70%, var(--layer-color) 0 13%, transparent 14%);
  box-shadow: none;
}

.burger-stack__layer--tomato {
  inset: 13%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--layer-color) 75%, white) 0 30%,
    var(--layer-color) 34%
  );
}

.burger-stack__layer--lettuce {
  inset: 5%;
  border-radius: 46% 54% 44% 56% / 52% 46% 54% 48%;
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--layer-color) 80%, white),
    0 3px 0 var(--edge);
}

// Entrada: parte de +80px no eixo Z; saída: sobe 60px e escorrega 40px
.layer-enter-active {
  transition: transform var(--dur-slow) var(--ease-spring);

  .burger-stack__layer {
    transition: opacity var(--dur-slow) var(--ease-out);
  }
}

.layer-leave-active {
  transition: transform var(--dur-slow) var(--ease-out);

  .burger-stack__layer {
    transition: opacity var(--dur-slow) var(--ease-out);
  }
}

.layer-enter-from {
  transform: translateZ(80px);

  .burger-stack__layer {
    opacity: 0;
  }
}

.layer-leave-to {
  transform: translateZ(60px) translateX(40px);

  .burger-stack__layer {
    opacity: 0;
  }
}

// Movimento reduzido: vista isométrica estática desenhada sem transform
// (elipses empilhadas) e camadas entrando/saindo só por opacidade.
@include motion-reduced {
  .burger-stack__scene {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    transform: none;
  }

  .burger-stack__slot {
    position: relative;
    inset: auto;
    width: 100%;
    height: 9%;
    transform: none;
  }

  .burger-stack__layer,
  .burger-stack__layer--bun,
  .burger-stack__layer--bun-top,
  .burger-stack__layer--patty,
  .burger-stack__layer--chicken,
  .burger-stack__layer--cheese,
  .burger-stack__layer--bacon,
  .burger-stack__layer--lettuce,
  .burger-stack__layer--tomato,
  .burger-stack__layer--egg,
  .burger-stack__layer--sauce,
  .burger-stack__layer--pickles,
  .burger-stack__layer--onion-rings,
  .burger-stack__layer--onion-strips {
    inset: auto 12%;
    bottom: 0;
    height: 220%;
    border-radius: 50%;
    transform: none;
    transition: opacity var(--dur-fast);
  }

  .burger-stack__layer--bun-top {
    height: 420%;
    border-radius: 50% 50% 46% 46% / 70% 70% 30% 30%;
  }

  .layer-enter-active,
  .layer-leave-active {
    transition: opacity var(--dur-fast);

    .burger-stack__layer {
      transition: opacity var(--dur-fast);
    }
  }

  .layer-enter-from,
  .layer-leave-to {
    transform: none;
  }
}

.burger-stack__legend {
  color: var(--color-ink-muted);
  font-size: var(--text-sm);
  line-height: var(--leading-compact);
  text-align: center;
}
</style>
