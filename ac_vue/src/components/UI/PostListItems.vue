<template>
  <ul class="list-group">
    <li class="list-group-item mb-3" v-for="post in posts" :key="post._id">
      <h4 class="mb-3">{{ post.title }}</h4>
      <p class="font-size-sm font-weight-lighter">{{ post.content.substring(0, 100) }}...</p>
      <router-link :to="`/post/${post._id}`" class="link-success">Read More</router-link>
      <p class="text-right font-size-sm font-weight-lighter text-muted">
        Posted On: {{ post.createdAt | dateTime }}
        <br />
        by {{ post.author.name }}
      </p>
    </li>
  </ul>
</template>

<script>
/* eslint-disable */
import DateFilter from "@/Mixins/date.js";

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  mixins: [DateFilter]
};
</script>

<style></style>
