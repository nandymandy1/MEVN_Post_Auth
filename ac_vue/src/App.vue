<template>
  <div id="app">
    <Navbar />
    <div class="container mt-5">
      <router-view />
    </div>
    <button
      v-b-tooltip.hover
      title="Add new post"
      class="btn btn-success btn-fab"
      @click="$router.push('/dashboard/add-post')"
      v-if="$store.getters['Auth/isAuth'] && $router.currentRoute.name !== 'New Post'"
    >
      <b-icon icon="plus" variant="light"></b-icon>
    </button>
    <Footer />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("Auth/verifyUserToken");
  }
};
</script>

<style lang="scss">
.container {
  min-height: 80vh;
}

.btn-success.btn-fab {
  left: 87%;
  width: 50px;
  bottom: 10%;
  height: 50px;
  z-index: 1000;
  position: fixed;
  margin-top: 80vh;
  font-size: 1.2rem;
  border-radius: 25px !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15) !important;
}
</style>
