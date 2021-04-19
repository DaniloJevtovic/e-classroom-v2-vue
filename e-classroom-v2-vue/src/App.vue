<template>
  <navbar></navbar>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch("loginRefresh");
  },
  setup() {},
};
</script>

<style>
</style>
