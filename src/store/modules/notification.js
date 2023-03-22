import mutations from "../mutations";

const { SHOW_TOAST_NOTIFY } = mutations;

const notificationStore = {
  state: {
    msgPool: [],
  },
  getters: {
    msgPool: ({ msgPool }) => msgPool[msgPool.length - 1],
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state, msg) {
      state.msgPool.push(msg);
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_TOAST_NOTIFY, msg);
    },
  },
};

export default notificationStore;
