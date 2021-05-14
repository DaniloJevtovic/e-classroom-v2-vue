<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to materials</button>
    </div>
    <div class="container-body">
      <h3>Name: {{ materialInfo.name }}</h3>
      <h3>Descriptions: {{ materialInfo.description }}</h3>

      <material-files :matId="matId"></material-files>

      <material-comments :matId="matId"></material-comments>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import MaterialFiles from "../MaterialFiles.vue";
import MaterialComments from "./../MaterialComments.vue";

export default {
  props: ["matId"],
  components: { MaterialFiles, MaterialComments },
  setup(props) {
    const { getById } = useCRUD();

    const materialInfo = ref("");

    const getMaterial = async () => {
      materialInfo.value = await getById("materials", props.matId);
    };

    onMounted(() => {
      getMaterial();
    });

    return {
      materialInfo,
    };
  },
};
</script>

<style>
</style>