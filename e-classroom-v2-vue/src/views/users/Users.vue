<template>
  <div class="container">
    <div class="container-header">
      <child-navbar :links="usersLinks"></child-navbar>
    </div>
    <div class="container-body">
       <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ChildNavbar from "../../components/ChildNavbar.vue";

export default {
  components: { ChildNavbar },
  setup() {
    const usersLinks = ref([
      { name: "All Users", path: "AllUsers" },
      { name: "All Teachers", path: "AllTeachers" },
      { name: "All Students", path: "AllStudents" },
    ]);
    return { usersLinks };
  },
};
</script>

<style>
</style>