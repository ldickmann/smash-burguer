// Rotas da exploração de direções visuais. Tudo fica dentro do `import.meta.env.DEV`: no build,
// a condição vira `false`, o ramo some e nenhuma página daqui (nem as fontes que elas importam)
// vira arquivo no dist/. O router ainda repete a condição.
const titulo = (nome) => ({ title: `${nome} · Direções` });

export const rotasDirecoes = import.meta.env.DEV
  ? [
      {
        path: "/direcoes",
        name: "direcoes",
        component: () => import("./DirecoesIndice.vue"),
        meta: { title: "Direções visuais" },
      },
      // Homes dos estilos: página inteira, sem o MainLayout
      {
        path: "/direcoes/material",
        name: "direcao-material",
        component: () => import("./estilos/material/HomeMaterial.vue"),
        meta: titulo("Material 3 Expressive"),
      },
      {
        path: "/direcoes/esqueumorfismo",
        name: "direcao-esqueumorfismo",
        component: () => import("./estilos/esqueumorfismo/HomeEsqueumorfismo.vue"),
        meta: titulo("Esqueumorfismo"),
      },
      {
        path: "/direcoes/neumorfismo",
        name: "direcao-neumorfismo",
        component: () => import("./estilos/neumorfismo/HomeNeumorfismo.vue"),
        meta: titulo("Neumorfismo"),
      },
      {
        path: "/direcoes/3d",
        name: "direcao-3d",
        component: () => import("./estilos/3d/Home3D.vue"),
        meta: titulo("3D e gradientes suaves"),
      },
      {
        path: "/direcoes/flat",
        name: "direcao-flat",
        component: () => import("./estilos/flat/HomeFlat.vue"),
        meta: titulo("Flat"),
      },
      {
        path: "/direcoes/minimalismo",
        name: "direcao-minimalismo",
        component: () => import("./estilos/minimalismo/HomeMinimalismo.vue"),
        meta: titulo("Minimalismo"),
      },
      {
        path: "/direcoes/escuro",
        name: "direcao-escuro",
        component: () => import("./estilos/escuro/HomeEscuro.vue"),
        meta: titulo("Dark mode"),
      },
    ]
  : [];
