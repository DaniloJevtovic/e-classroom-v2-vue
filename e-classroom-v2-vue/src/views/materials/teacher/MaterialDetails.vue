<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to materials</button>
    </div>
    <div class="container-body">
      <h2>Name: {{ materialInfo.name }}</h2>
      <h3>Descriptions: {{ materialInfo.description }}</h3>
      <router-link :to="{ name: 'EditMaterial', params: { id: matId } }">
        <button>Edit</button>
      </router-link>
      <button @click.prevent="deleteMaterial">Delete</button>

      <div class="mats-coms">
        <!-- fajlovi za materijal -->
        <material-files :matId="matId"></material-files>

        <!-- komentari za material -->
        <material-comments :matId="matId"></material-comments>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

import MaterialFiles from "../MaterialFiles.vue";
import MaterialComments from "./../MaterialComments.vue";

export default {
  props: ["matId"],
  components: { MaterialFiles, MaterialComments },
  setup(props) {
    const { getById, deleteById } = useCRUD();
    const router = useRouter();

    const materialInfo = ref("");

    const getMaterial = async () => {
      materialInfo.value = await getById("materials", props.matId);
    };

    const deleteMaterial = async () => {
      await deleteById("materials", props.matId);
      router.go(-1);
    };

    onMounted(() => {
      getMaterial();
    });

    return {
      materialInfo,
      deleteMaterial,
    };
  },
};
</script>

<style scoped>
.mats-coms {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>