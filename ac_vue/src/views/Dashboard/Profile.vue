<template>
  <div class="profile-view">
    <div class="card" v-if="!loading">
      <div class="card-body">
        <h5 class="card-title">{{ user.username }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ user.email }}</h6>
        <p class="card-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
          impedit, laudantium quas consequuntur ab labore dolorem dolores
          consequatur odit dolor!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "Auth/user",
      loading: "Auth/loading"
    })
  }
};
</script>
