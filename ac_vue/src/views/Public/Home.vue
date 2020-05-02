<template>
  <div class="home">
    <div class="row">
      <div class="mx-auto col-md-8 col-sm-12 mb-2">
        <PostListItems :posts="posts" />
        <Paginator
          :paginator="paginator"
          @navigate-page="getPosts"
          v-if="paginator.totalPosts > 10"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Paginator from "@/components/UI/Paginator.vue";
import PostListItems from "@/components/UI/PostListItems.vue";

export default {
  components: {
    Paginator,
    PostListItems
  },
  computed: {
    ...mapGetters({
      posts: "Post/posts",
      loading: "Post/loading",
      paginator: "Post/paginator"
    })
  },
  methods: {
    ...mapActions({
      getPosts: "Post/getPosts"
    })
  },
  created() {
    this.getPosts(1);
  }
};
</script>
