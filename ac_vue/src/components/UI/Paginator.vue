<template>
  <nav aria-label>
    <ul class="pagination justify-content-center">
      <li
        :class="['page-item', !paginator.hasPrevPage ? 'disabled' : '']"
        @click="
          paginator.hasPrevPage ? navigate(paginator.currentPage - 1) : null
        "
      >
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
      </li>
      <li
        v-for="index in paginator.pageCount"
        :class="['page-item', paginator.currentPage === index ? 'active' : '']"
        @click="navigate(index)"
        aria-current="page"
        :key="index"
      >
        <a class="page-link" href="#">{{ index }}</a>
      </li>
      <li
        :class="['page-item', !paginator.hasNextPage ? 'disabled' : '']"
        @click="
          paginator.hasNextPage ? navigate(paginator.currentPage + 1) : null
        "
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    paginator: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigate(page) {
      this.$emit("navigate-page", page);
    }
  }
};
</script>

<style lang="scss" scoped>
$second-color: #28b463;
$disabled-link: #aab7b8;
$active-color: rgba(#28b463, 0.8);

.page-item {
  a.page-link {
    color: $second-color !important;
    border: 1px solid #dee2e6;
  }
}
.page-item.active {
  background-color: $second-color !important;
  a.page-link {
    background-color: $second-color !important;
    color: white !important;
  }
}
.page-item.disabled {
  a.page-link {
    color: $disabled-link !important;
  }
}
</style>
