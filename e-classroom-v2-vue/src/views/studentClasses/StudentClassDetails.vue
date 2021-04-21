<template>
  <div class="container">
    <div class="container-header">
      <h2>Detalji razreda: {{ stClassId }}</h2>
      <br />
      <h2>Name: {{ stClassInfo.name }}</h2>
      <br />
      <h2>Description: {{ stClassInfo.description }}</h2>
    </div>

    <h1>ucenici</h1>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["stClassId"],
  setup(props) {
    const stClassInfo = ref("");
    const { getById } = useCRUD();

    const getStClassDetails = async () => {
      stClassInfo.value = await getById("stClasses", props.stClassId);
    };

    onMounted(getStClassDetails);

    return { stClassInfo };
  },
};
</script>

<style>
</style>