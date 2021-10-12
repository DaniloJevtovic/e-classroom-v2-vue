<template>
  <div class="container">
    <div class="container-header">
      <child-navbar :links="links"></child-navbar>
    </div>

    <router-view />
  </div>
</template>

<script>
import ChildNavbar from "../../components/ChildNavbar.vue";

export default {
  components: { ChildNavbar },
  setup() {
    const links = [
      { name: "New Message", path: "NewMessageSelectUser" },
      { name: "Recived messages", path: "RecivedMessages" },
      { name: "Sent Messages", path: "SentMessages" },
    ];

    return { links };
  },
};
</script>

<style scoped>
</style>