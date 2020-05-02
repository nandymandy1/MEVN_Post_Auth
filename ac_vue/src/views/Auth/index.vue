<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 mx-auto">
      <div class="card">
        <div class="card-body">
          <h4 class="text-center text-success">
            {{ $router.currentRoute.name }}
          </h4>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
