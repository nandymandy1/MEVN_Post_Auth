<template>
  <div class="post-view mb-5">
    <div class="row mb-3">
      <div class="col">
        <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div v-if="!loading && post">
              <h3 class="display-4">{{ post.title }}</h3>
              <p>{{ post.content }}</p>
              <p class="text-right font-size-sm font-weight-lighter text-muted">
                Posted On: {{ post.createdAt | dateTime }}
                <br />
                by {{ post.author.name }}
              </p>
              <div v-if="isAuth && $router.currentRoute.name === 'Post'" class="mb-2">
                <router-link class="btn btn-info mr-2" :to="`/dashboard/edit-post/${post._id}`">Edit</router-link>
                <button class="btn btn-danger" @click="deleteThisPost(post._id)">Delete</button>
              </div>
            </div>
            <div v-else-if="!loading && !post">
              <p>Sorry there is no post available with this name</p>
            </div>
            <vue-content-loading :width="300" :height="235" v-else>
              <rect x="0" rx="4" ry="4" width="100%" height="30" />
              <rect
                x="0"
                rx="4"
                ry="4"
                height="9"
                width="100%"
                v-for="index in 15"
                :key="index"
                :y="12 * index"
              />
              <rect x="60%" rx="4" ry="4" y="200" width="40%" height="12" />
              <rect x="60%" rx="4" ry="4" y="215" width="40%" height="12" />
            </vue-content-loading>
          </div>
        </div>
      </div>
      <div class="col-md-4 d-sm-none d-md-block"></div>
    </div>
  </div>
</template>

<script>
import api from "@/services";
import DateFilter from "@/Mixins/date.js";
import { mapGetters, mapActions } from "vuex";
import { VueContentLoading } from "vue-content-loading";

export default {
  data: () => ({
    post: null,
    loading: false
  }),
  mixins: [DateFilter],
  components: {
    VueContentLoading
  },
  computed: {
    ...mapGetters({
      isAuth: "Auth/isAuth"
    })
  },
  methods: {
    ...mapActions({
      deletePost: "Post/deletePost"
    }),
    async deleteThisPost(id) {
      await this.deletePost(id);
    },
    async getPost() {
      try {
        this.loading = true;
        const postId = this.$route.params.id;
        let { data } = await api.get(`/posts/${postId}`);
        this.loading = false;
        this.post = data;
        console.log("POST_DATA", data);
      } catch (err) {
        this.loading = false;
        console.log("POST_ERR_DATA", err.message);
      }
    }
  },
  created() {
    this.getPost();
  }
};
</script>

<style></style>
