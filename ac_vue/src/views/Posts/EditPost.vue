<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="editPost">
        <h3 class="text-success text-center">Edit Post</h3>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            v-model="title"
            placeholder="Title"
            :class="[
              'form-control', 
              errors.title ? 'is-invalid': ''
            ]"
          />
          <div class="invalid-feedback" v-if="errors.title">Title for the post is required.</div>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            rows="10"
            type="text"
            id="content"
            v-model="content"
            placeholder="Content"
            :class="[
              'form-control', 
              errors.content ? 'is-invalid': ''
            ]"
          ></textarea>
          <div class="invalid-feedback" v-if="errors.content">Content for the post is required.</div>
        </div>
        <div class="form-group">
          <button class="btn btn-success">Update Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import np from "nprogress";
import api from "@/services";

export default {
  data: () => ({
    id: "",
    title: "",
    content: "",
    errors: {
      title: false,
      content: false
    }
  }),
  methods: {
    editPost() {
      const { title, content, id } = this;
      title && content
        ? this.$store.dispatch("Post/editPost", { title, content, id })
        : this.setErrors();
    },

    async fetchActivePost() {
      np.start();
      try {
        const postId = this.$route.params.id;
        let { data } = await api.get(`/posts/${postId}`);
        this.id = data._id;
        this.title = data.title;
        this.content = data.content;
      } catch (err) {
        console.log("POST_ERR_DATA", err.message);
      }
      np.done();
    },

    setErrors() {
      const { title, content } = this;
      !title ? (this.errors.title = true) : null;
      !content ? (this.errors.content = true) : null;
      setTimeout(() => {
        this.errors.title = false;
        this.errors.content = false;
      }, 5000);
    }
  },
  async created() {
    this.fetchActivePost();
  }
};
</script>
