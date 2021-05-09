<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to materials</button>
    </div>
    <div class="container-body">
      <h3>Name: {{ materialInfo.name }}</h3>
      <h3>Description: {{ materialInfo.description }}</h3>

      <hr />

      <h3>Files</h3>

      <div v-for="file in files" :key="file.id">
        <button @click.prevent="downFile(file)">
          <h3>{{ file.name }}</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import useUpDownFile from "@/composables/useUpDownFile.js";

export default {
  props: ["id", "matId"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();
    const { downloadFile } = useUpDownFile();

    const materialInfo = ref("");
    const files = ref([]);

    const getMaterial = async () => {
      materialInfo.value = await getById("materials", props.id);
    };

    const getFilesForMaterial = async () => {
      files.value = await getSubItems("files", "material", props.matId);
    };

    onMounted(() => {
      getMaterial();
      getFilesForMaterial();
    });

    const downFile = async (file) => {
      await downloadFile(file);
    };

    return { materialInfo, files, downFile };
  },
};
</script>

<style>
</style>