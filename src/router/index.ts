import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Surface from "../views/Surface.vue";
import Presence from "../views/Presence.vue";
import Conformite from "../views/Conformite.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/surface",
    name: "Surface",
    component: Surface,
  },
  {
    path: "/presence",
    name: "Presence",
    component: Presence,
  },
  {
    path: "/conformite",
    name: "Conformite",
    component: Conformite,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
