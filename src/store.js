import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: {
      message: "nothing"
    }
  },
  mutations: {
    session(state, session) {
      state.session = session;
    }
  },
  actions: {
    setSession(store, session) {
      store.commit("session", session);
    }
  },
  getters: {
    session: state => {
      return state.session;
    }
  }
});
