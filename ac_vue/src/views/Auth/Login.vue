<template>
  <form @submit.prevent="authenticateUser" class="login">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="form-control"
        placeholder="Username"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        class="form-control"
        placeholder="Password"
      />
    </div>
    <div class="form-group">
      <button class="btn btn-success mr-2">Login</button>
      <router-link to="/auth/register" class="link-success">
        Need an account?
      </router-link>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    async authenticateUser() {
      // TODO: Validate Fields functions to be implemented here
      let { username, password } = this;
      this.$store.dispatch("Auth/loginUser", { username, password });
    },
  },
};
</script>

<style></style>
