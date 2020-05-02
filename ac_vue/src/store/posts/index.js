/* eslint-disable */
import api from "@/services";
import router from "@/router";
const state = {
  posts: [],
  myPosts: [],
  paginator: {},
  loading: false,
};

const getters = {
  posts: (state) => state.posts,
  loading: (state) => state.loading,
  paginator: (state) => state.paginator,
};

const actions = {
  async getPosts({ commit }, page) {
    commit("SET_LOADING");
    try {
      const { data } = await api.get(`/posts?page=${page}`);
      commit("SET_POSTS_PAGINATOR", data);
    } catch (err) {
      console.log("POSTS_FETCH_ERR", err.response.data);
    } finally {
      commit("SET_LOADING");
    }
  },

  async getMyPosts({ commit }, page) {
    commit("SET_LOADING");
    try {
      page = page || 1;
      const { data } = await api.get(`/posts/my-posts?page=${page}`);
      commit("SET_POSTS_PAGINATOR", data);
    } catch (err) {
      console.log("POSTS_FETCH_ERR", err.response.data);
    } finally {
      commit("SET_LOADING");
    }
  },

  async deletePost({ commit }, id) {
    try {
      let confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmation.value) {
        commit("SET_LOADING");
        const { data } = await api.delete(`/posts/${id}`);
        Toast.fire({ icon: "success", title: data.message });
        router.go(-1);
      }
    } catch (err) {
      console.log("POSTS_FETCH_ERR", err.response.data);
    }
    commit("SET_LOADING");
  },

  async addPost({ commit }, post) {
    commit("SET_LOADING");
    try {
      let { data } = await api.post("/posts", post);
      console.log("POST_ADDED", data);
      // eslint-disable-next-line
      Toast.fire({ title: data.message, icon: "success" });
      router.push("/");
    } catch (err) {
      // eslint-disable-next-line
      Toast.fire({ title: err.response.data.message, icon: "error" });
      console.log("ADD_POST_ERR", err.response.data);
    }
    commit("SET_LOADING");
  },

  async editPost({ commit }, post) {
    commit("SET_LOADING");
    try {
      console.log(post);
      let { data } = await api.put(`/posts/${post.id}`, post);
      // eslint-disable-next-line
      Toast.fire({ title: data.message, icon: "success" });
      router.push("/");
    } catch (err) {
      // eslint-disable-next-line
      Toast.fire({ title: err.response.data.message, icon: "error" });
      console.log("EDIT_POST_ERR", err.response.data);
    }
    commit("SET_LOADING");
  },
};

const mutations = {
  SET_POSTS_PAGINATOR(state, { posts, paginator }) {
    state.posts = posts;
    state.paginator = paginator;
  },

  SET_MY_POSTS(state, { posts, paginator }) {
    state.myPosts = posts;
    state.paginator = paginator;
  },

  SET_LOADING(state) {
    state.loading = !state.loading;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true,
};
