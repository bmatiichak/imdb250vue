import { createStore } from "vuex";
import moviesStore from "./modules/movies";
import loader from "./modules/loader";

const store = createStore({
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore,
    loader,
  },
});

export default store;
