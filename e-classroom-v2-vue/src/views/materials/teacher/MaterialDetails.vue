<template>
  <div class="container">
    <div class="container-header">
      <h3>Details</h3>
      <button @click="$router.go(-1)">Back</button>
    </div>
    <div class="container-body">
      <h3>Name: {{ materialInfo.name }}</h3>
      <h3>Description: {{ materialInfo.description }}</h3>

      <hr />

      <h3>Files</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById } = useCRUD();
    const materialInfo = ref("");

    const getMaterial = async () => {
      materialInfo.value = await getById("materials", props.id);
    };

    onMounted(() => {
      getMaterial();
    });

    return { materialInfo };
  },
};
</script>

<style>
</style>