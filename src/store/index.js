import { createStore } from "vuex";
import moviesStore from "./modules/movies";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore,
  },
});

store.dispatch("initMoviesStore");

export default store;
