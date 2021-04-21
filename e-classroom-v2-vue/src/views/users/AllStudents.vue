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
import useCRUD from "../../composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const students = ref([]);

    const getStudents = async () => {
      students.value = await getAll("students")
    };
    onMounted(getStudents);

    return { students };
  },
};
</script>

<style>
</style>