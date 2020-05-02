import Vue from "vue";
import Vuex from "vuex";
import Auth from "./auth";
import Post from "./posts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    Post,
    Auth,
  },
  actions: {},
  mutations: {},
});
