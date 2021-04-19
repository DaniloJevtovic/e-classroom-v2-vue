<template>
  <div class="container">
    <h2>All students</h2>
    <p v-for="student in students" :key="student.id">
      {{ student.firstName }} {{ student.lastName }}
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useUsers from "../../composables/useUsers.js";

export default {
  setup() {
    const { getAllStudents } = useUsers();

    const students = ref([]);
    const getStudents = async () => {
      students.value = await getAllStudents();
    };
    onMounted(getStudents);

    return { students };
  },
};
</script>

<style>
</style>