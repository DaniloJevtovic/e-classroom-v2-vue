<template>
  <div class="container">
    <h2>All teachers</h2>
    <p v-for="teacher in teachers" :key="teacher.id">
      {{ teacher.firstName }} {{ teacher.lastName }}
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useUsers from "../../composables/useUsers.js";

export default {
  setup() {
    const { getAllTeachers } = useUsers();

    const teachers = ref([]);
    const getTeachers = async () => {
      teachers.value = await getAllTeachers();
    };
    onMounted(getTeachers);

    return { teachers };
  },
};
</script>

<style>
</style>