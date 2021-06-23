import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { rutaProtegida: true }
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: () => import("../views/Editar.vue"),
    meta: { rutaProtegida: true }
  },
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue")
  },
  {
    path: "/ingreso",
    name: "Ingreso",
    component: () => import("../views/Ingreso.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.rutaProtegida) {
    if (store.getters.userAutenticado) {
      next();
    } else {
      next("/ingreso");
    }
  } else {
    next();
  }
});

export default router;
