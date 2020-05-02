<template>
  <footer>
    <p class="text-center text-white pt-3">
      &copy; {{ new Date().getFullYear() }} by Vue Posts App
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style>
footer {
  height: 50px;
  display: flex;
  background: #28b463;
  align-items: center;
  justify-content: center;
}
</style>
