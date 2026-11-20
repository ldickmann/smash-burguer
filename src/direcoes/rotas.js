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
      // Linha de base: a Home real, dentro do MainLayout, com o alternador
      {
        path: "/direcoes/brasa",
        component: () => import("@/layouts/MainLayout.vue"),
        children: [
          {
            path: "",
            name: "direcao-brasa",
            component: () => import("./BrasaBase.vue"),
            meta: titulo("Brasa"),
          },
        ],
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
    ]
  : [];
