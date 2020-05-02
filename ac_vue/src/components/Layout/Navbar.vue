<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="bg-my-theme">
      <router-link to="/" class="navbar-brand">Vue-Vuex</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <!-- Un Authenticated Routes -->
          <template v-if="!isAuth">
            <li class="nav-item">
              <router-link to="/auth/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/auth/register" class="nav-link">Register</router-link>
            </li>
          </template>
          <!-- Un Authenticated Routes -->
          <!-- Authenticated Routes -->
          <template v-else>
            <li class="nav-item">
              <router-link to="/dashboard/profile" class="nav-link">Profile</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/dashboard/my-posts" class="nav-link">My Posts</router-link>
            </li>-->
            <li class="nav-item">
              <router-link to="/dashboard/logout" class="nav-link">Logout</router-link>
            </li>
          </template>
          <!-- Authenticated Routes -->
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ isAuth: "Auth/isAuth" })
  }
};
</script>

<style lang="scss" scoped>
.bg-my-theme {
  background: #17202a !important;
}
</style>
