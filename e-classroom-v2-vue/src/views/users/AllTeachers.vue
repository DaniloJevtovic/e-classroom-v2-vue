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
import useCRUD from "../../composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const teachers = ref([]);

    const getTeachers = async () => {
      teachers.value = await getAll("teachers");
    };
    onMounted(getTeachers);

    return { teachers };
  },
};
</script>

<style>
</style>