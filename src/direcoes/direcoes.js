// Direções visuais da exploração (só em `yarn dev`): a ordem é a do índice e do alternador.
// `esquema` vai para o color-scheme do <html> enquanto a Home da direção está aberta.
export const DIRECOES = [
  { slug: "brasa", nome: "Brasa", apelido: "Linha de base", esquema: "dark" },
];

export const caminhoDirecao = (slug) => `/direcoes/${slug}`;
