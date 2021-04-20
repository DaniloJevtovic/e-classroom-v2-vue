<template>
  <div class="container">
    <h2>All Student Classes</h2>
    {{ stClasses }}
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

export default {
  setup() {
    const stClasses = ref([]);
    const { getAll } = useCRUD();

    const getAllStClasses = async () => {
      stClasses.value = await getAll("stClasses");
    };

    onMounted(getAllStClasses);

    return { stClasses };
  },
};
</script>

<style>
</style>