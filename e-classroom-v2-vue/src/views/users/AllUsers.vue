<template>
  <div class="container">
    <h2>All users</h2>
    <nav>
      <router-link :to="{ name: 'AllUsers' }">All Users</router-link>/
      <router-link :to="{ name: 'AllTeachers' }">All Teachers</router-link>/
      <router-link :to="{ name: 'AllStudents' }">All Students</router-link>/
    </nav>
    <router-view />
    <!-- <all-teachers></all-teachers>
    <all-students></all-students> -->

    <!-- {{ users }} -->
  </div>
</template>

<script>
// import AllTeachers from "./AllTeachers.vue";
// import AllStudents from "./AllStudents.vue";
import { ref, onMounted } from "vue";
import useUsers from "../../composables/useUsers.js";

export default {
  //components: { AllTeachers, AllStudents },
  setup() {
    const { getAllUsers } = useUsers();

    const users = ref([]);
    const getUsers = async () => {
      users.value = await getAllUsers();
    };
    onMounted(getUsers);

    return { users };
  },
};
</script>

<style>
</style>