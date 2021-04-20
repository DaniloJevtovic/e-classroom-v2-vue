<template>
  <div class="container">
    <h2>All SchoolClasses</h2>
    {{ scClasses }}
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

export default {
  setup() {
    const scClasses = ref([]);
    const { getAll } = useCRUD();

    const getAllScClasses = async () => {
      scClasses.value = await getAll("scClasses");
    };

    onMounted(getAllScClasses);

    return { scClasses };
  },
};
</script>

<style>
</style>