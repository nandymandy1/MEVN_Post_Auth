<template>
  <form @submit.prevent="registerUser" class="login">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        v-model="name"
        placeholder="Name"
        :class="['form-control', err.name ? 'is-invalid' : '']"
      />
      <div v-if="err.name" class="invalid-feedback">
        {{ err.name }}
      </div>
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="form-control"
        placeholder="Username"
        :class="['form-control', err.username ? 'is-invalid' : '']"
      />
      <div v-if="err.username" class="invalid-feedback">
        {{ err.username }}
      </div>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Email"
        :class="['form-control', err.email ? 'is-invalid' : '']"
      />
      <div v-if="err.email" class="invalid-feedback">
        {{ err.email }}
      </div>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
        :class="['form-control', err.password ? 'is-invalid' : '']"
      />
      <div v-if="err.password" class="invalid-feedback">
        {{ err.password }}
      </div>
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        :class="['form-control', err.confirmPassword ? 'is-invalid' : '']"
      />
      <div v-if="err.confirmPassword" class="invalid-feedback">
        {{ err.confirmPassword }}
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-success mr-2">Register</button>
      <router-link to="/auth/login" class="link-success">
        Already have an account?
      </router-link>
    </div>
  </form>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    err: {
      email: "",
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  }),

  computed: {
    ...mapGetters({
      loading: "Auth/loading",
    }),
  },

  methods: {
    ...mapActions({
      register: "Auth/registerUser",
    }),

    async registerUser() {
      await this.validateUserData();
      let { name, username, email, password, confirmPassword } = this.err;

      if (!name && !username && !email && !password && !confirmPassword) {
        let userData = _.pick(this, ["name", "email", "password", "username"]);
        console.log("CREATING_USER_PROFILE", userData);
        this.register(userData);
      } else {
        console.log("ERR_VALIDATION", this.err);
      }
    },

    async validateUserData() {
      // eslint-disable-next-line
      let { name, username, email, password, confirmPassword } = this;

      this.err = {
        email: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      };

      if (name.length < 4) {
        this.err.name = "Name must be more than 4 Characters.";
      }
      if (username.length < 4) {
        this.err.username = "Username must be more than 4 Characters.";
      }
      if (password.length < 6) {
        this.err.password = "Password must be more than 6 Characters.";
      }
      if (confirmPassword.length < 6 && password !== confirmPassword) {
        this.err.confirmPassword = "Passwords don't match.";
      }
      // Email Validation
      if (email.length) {
        // eslint-disable-next-line
        const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        !emailReg.test(email)
          ? (this.err.email = "Please enter a valid email.")
          : null;
      } else {
        this.err.email = "Email is required.";
      }
      return;
    },
  },
};
</script>

<style></style>
