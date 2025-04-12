<script setup lang="ts">
import Head from "./components/Head.vue";
import Nav from "./components/Nav.vue";
import Popup from "./components/Popup.vue";
import MyUser from "./components/MyUser.vue";
import Filter from "./components/Filter.vue";

</script>

<template>
  <Nav />
  <Popup />
  <div class="table">
    <Head />
    <div class="body">
      <MyUser />
    </div>
  </div>
  <Filter/>
</template>

<style scoped>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.table {
  width: 100%;
  height: 500px;
  margin-top: 30px;
}
</style>
