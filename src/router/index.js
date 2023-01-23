import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "App",
    component: () => import("@/Layout/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/PreInscripcion/index.vue"),
      },
      {
        path: "/datos-postulante/:id",
        name: "Datos",
        component: () => import("@/views/PreInscripcion/DatosPostulante.vue"),
      },
    ]
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
