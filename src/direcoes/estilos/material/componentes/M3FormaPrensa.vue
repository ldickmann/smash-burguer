<!-- A prensa do smash [66][67][70]: o disco de 12 lobos em primary, centrado no conteúdo (o slot) e
     maior que ele, para o contêiner de fora cortar; quem usa a prensa pode mover o centro e repintar o
     conteúdo (o hero faz isso no celular). Na entrada, só com o movimento liberado, a bola (um círculo)
     é achatada e some, e o disco troca de forma até o lugar com a mola lenta, uma vez. O conteúdo nunca
     anima. Tudo posicionado por inset e margin, sem transform. -->
<template>
  <div class="m3-prensa">
    <div class="m3-prensa__disco" aria-hidden="true"></div>
    <div class="m3-prensa__bola" aria-hidden="true"></div>
    <div class="m3-prensa__conteudo">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../scss/forma-prensa";
</style>
