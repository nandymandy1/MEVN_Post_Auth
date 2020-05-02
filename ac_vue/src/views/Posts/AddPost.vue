<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="addPost">
        <h3 class="text-success text-center">Add Post</h3>
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
          <button class="btn btn-success">Add Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "",
    content: "",
    errors: {
      title: false,
      content: false
    }
  }),
  methods: {
    addPost() {
      const { title, content } = this;
      title && content
        ? this.$store.dispatch("Post/addPost", { title, content })
        : this.setErrors();
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
  }
};
</script>
