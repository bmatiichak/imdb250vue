import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import store from "./store";
import "./plugins/bootstrap";

const routes = [
  {
    path: "/imdb250vue",
    component: App,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});

createApp(App).use(store).use(router).mount("#app");
