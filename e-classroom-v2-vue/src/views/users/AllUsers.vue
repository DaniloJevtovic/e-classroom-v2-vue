<template>
  <div class="container">
    <div class="container-header">
      <h2>All users</h2>
      <router-link :to="{ name: 'AllTeachers' }">
        <button>All Teachers</button>
      </router-link>
      <router-link :to="{ name: 'AllStudents' }">
        <button>All Students</button>
      </router-link>
    </div>
    <div class="container-body">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

export default {
  //components: { AllTeachers, AllStudents },
  setup() {
    const { getAll } = useCRUD();

    const users = ref([]);

    const getUsers = async () => {
      users.value = await getAll("users");
    };
    onMounted(getUsers);

    return { users };
  },
};
</script>

<style>
</style>