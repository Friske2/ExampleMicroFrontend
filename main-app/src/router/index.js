import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Vue3View from "../views/Vue3View.vue";
import ReactView from "../views/ReactView.vue";
import Vue2View from "../views/Vue2View.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/vue3",
    name: "vue3",
    component: Vue3View,
  },
  {
    path: "/react",
    name: "react",
    component: ReactView,
  },
  {
    path: "/vue2",
    name: "vue2",
    component: Vue2View,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
