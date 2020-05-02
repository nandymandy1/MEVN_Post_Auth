/* eslint-disable */
import api from "@/services";
import router from "@/router";
import { setAuthToken } from "@/services";

const state = {
  user: null,
  loading: false,
  authError: null,
  token: localStorage.getItem("token") || null,
};

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  loading: (state) => state.loading,
  isAuth: (state) => (state.token ? true : false),
};

const actions = {
  async loginUser({ commit, dispatch }, user) {
    commit("SET_LOADING");
    try {
      let { data } = await api.post("/users/auth", user);
      await dispatch("authenticateUser", data);
    } catch (err) {
      console.log("LOGIN_ERR", err.response.data);
    }
  },

  async logoutUser({ commit }) {
    localStorage.clear();
    commit("LOGOUT_USER");
  },

  async registerUser({ commit, dispatch }, user) {
    commit("SET_LOADING");
    try {
      let { data } = await api.post("/users/register", user);
      await dispatch("authenticateUser", data);
    } catch (err) {
      if (err.response.data.message.startsWith("users")) {
        dispatch("serializeAuthErr", err.response.data);
      } else {
        console.log("SOME_OTHER_TYPE_OF_ERR", err.response.data);
      }
    }
  },

  async verifyUserToken({ commit, dispatch, state }) {
    if (state.token) {
      commit("SET_LOADING");
      await dispatch("authenticateUser", {
        noRedirect: true,
        token: state.token,
      });
    }
  },

  async authenticateUser({ commit }, { token, noRedirect }) {
    try {
      // Set the token to the axios
      await setAuthToken(token);
      // get the current user profile
      let { data } = await api.get("/users/auth");
      // Store the token in localstorage
      await localStorage.setItem("token", token);
      commit("SET_AUTH_USER", { data, token });
      if (!noRedirect) {
        Toast.fire({
          icon: "success",
          title: "Hurray! You are now logged in successfully.",
        });
        router.push("/dashboard");
      }
    } catch (err) {
      commit("LOGOUT_USER");
      console.log("USER_REQ_ERR", err);
    } finally {
      commit("SET_LOADING");
    }
    return;
  },

  async serializeAuthErr({ commit }, { message }) {
    message = message.replace("users validation failed: ", "");
    let errs = message.split(",");
    let mainErrorObj = {};
    let toastString = "";
    await errs.forEach((err) => {
      err = err.split(": ");
      // If Toast String is empty
      !toastString.length
        ? (toastString = `<p>${err[1]}</p>`)
        : (toastString = `<p>${toastString} ${err[1]}</p>`);
      mainErrorObj[`${err[0].trim()}`] = err[1];
    });
    // eslint-disable-next-line
    Swal.fire({
      icon: "error",
      html: toastString,
      title: "Registeration Error",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
    commit("SET_AUTH_ERROR", mainErrorObj);
  },
};

const mutations = {
  SET_LOADING(state) {
    state.loading = !state.loading;
  },

  SET_AUTH_USER(state, { data, token }) {
    state.user = data;
    state.token = token;
    state.isAuth = true;
  },

  SET_AUTH_ERROR(state, payload) {
    state.authError = payload;
  },

  LOGOUT_USER(state) {
    state.user = null;
    state.token = null;
    state.loading = false;
    state.authError = null;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true,
};
