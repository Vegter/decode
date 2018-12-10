import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: {},
    username: null,
    onboardingRequest: null,
    disclosureRequest: null,
    debug: false
  },
  mutations: {
    session(state, session) {
      state.session = session;
    },
    username(state, username) {
      state.username = username;
    },
    request(state, request) {
      state.request = request
    }
  },
  actions: {
    setSession(store, session) {
      store.commit("session", session);
    },
    setUsername(store, username) {
      store.commit("username", username);
    },
    setOnboardingRequest(store, request) {
      store.commit("onboardingRequest", request);
    },
    setDisclosureRequest(store, request) {
      store.commit("disclosureRequest", request);
    }
  },
  getters: {
    session: state => {
      return state.session;
    },
    username: state => {
      return state.username;
    },
    onboardingRequest: state => {
      return state.onboardingRequest;
    },
    disclosureRequest: state => {
      return state.disclosureRequest;
    },
    debug: state => {
      return state.debug;
    }
  }
});
