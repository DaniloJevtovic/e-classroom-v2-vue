<template>
  <div class="files-container">
    <h3>Files</h3>
    <div class="files-list">
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

<style scoped>
.files-container {
  background: rgb(0, 255, 221);
  margin: 10px;
  padding: 10px;
  border: 1px solid darkblue;
}

.files-list {
  /* background: rgb(255, 160, 207); */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr;   */
}
</style>