import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: {},
    sessionId: null,
    username: null,
    debug: false
  },
  mutations: {
    session(state, session) {
      state.session = session;
    },
    username(state, username) {
      state.username = username;
    }
  },
  actions: {
    setSession(store, session) {
      store.commit("session", session);
    },
    setUsername(store, username) {
      store.commit("username", username);
    }
  },
  getters: {
    session: state => {
      return state.session;
    },
    username: state => {
      return state.username;
    },
    debug: state => {
      return state.debug;
    }
  }
});
