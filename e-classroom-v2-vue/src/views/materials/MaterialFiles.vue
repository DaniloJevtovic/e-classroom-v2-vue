<template>
  <div>
    <h2>Files</h2>
    <div v-for="file in files" :key="file.id">
      <button @click.prevent="downFile(file)">
        <h3>{{ file.name }}</h3>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import useUpDownFile from "@/composables/useUpDownFile.js";

export default {
  props: ["matId"],
  setup(props) {
    const { getSubItems } = useCRUD();
    const { downloadFile } = useUpDownFile();

    const files = ref([]);

    const getFilesForMaterial = async () => {
      files.value = await getSubItems("files", "material", props.matId);
    };

    onMounted(() => {
      getFilesForMaterial();
    });

    const downFile = async (file) => {
      await downloadFile(file);
    };

    return { files, downFile };
  },
};
</script>

<style>
</style>