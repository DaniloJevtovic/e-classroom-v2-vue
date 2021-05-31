<template>
  <div class="container">
    <h2>All Student Classes</h2>
    <br />
    <div class="stClasses" v-for="stClass in stClasses" :key="stClass.id">
      <h2>Name: {{ stClass.name }}</h2>
      <h3>Descripion: {{ stClass.description }}</h3>
      <h4>Shool Class: {{ stClass.schoolClass.name }}</h4>
      <hr />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

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
.stClasses {
  display: inline;
}
</style>