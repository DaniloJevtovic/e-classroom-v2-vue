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
        <button @click.prevent="downloadFile(file.id)">
          <h3>{{ file.name }}</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import axios from "axios";

export default {
  props: ["matId"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();
    const materialInfo = ref("");
    const files = ref([]);

    const getMaterial = async () => {
      materialInfo.value = await getById("materials", props.matId);
    };

    const getFilesForMaterial = async () => {
      files.value = await getSubItems("files", "material", props.matId);
    };

    onMounted(() => {
      getMaterial();
      getFilesForMaterial();
    });

    const downloadFile = async (id) => {
      console.log(id);
      try {
        const response = await axios.get(
          "http://localhost:5555/api/files/downloadFile/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        console.log(response);

        return response.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    };

    return { materialInfo, files, downloadFile };
  },
};
</script>

<style>
</style>