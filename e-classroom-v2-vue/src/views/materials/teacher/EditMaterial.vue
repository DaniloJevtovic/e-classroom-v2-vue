<template>
  <form @submit.prevent="handleSubmit">
    <h2>Edit material</h2>
    <input type="text" v-model="material.name" placeholder="Name" required />
    <textarea rows="3" v-model="material.description" placeholder="Description">
    </textarea>

    <div class="mat-files">
      <input type="file" @change="addToList($event)" placeholder="select" />
      <p v-for="(file, index) in files" :key="file">
        {{ file.name }}
        <button @click.prevent="deleteFile(index, file)">delete</button>
      </p>
    </div>

    <button>Save</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import useCRUD from "@/composables/useCRUD.js";
import useUpDownFile from "@/composables/useUpDownFile.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById, editById, getSubItems, deleteById } = useCRUD();
    const { uploadFile } = useUpDownFile();
    const router = useRouter();

    const material = reactive({});
    const files = ref([]);

    const listToAdd = ref([]); //lista fajlova koju cu upload-ujem - novi fajlovi koji ne postoje
    const listIdsFilesToDelete = ref([]); //lista id-eva fajlova koje trebam obrisati

    const getMaterial = async () => {
      let mat = await getById("materials", props.id);
      material.name = mat.name;
      material.description = mat.description;
    };

    const getFilesForMaterial = async () => {
      files.value = await getSubItems("files", "material", props.id);
    };

    onMounted(() => {
      getMaterial();
      getFilesForMaterial();
    });

    const handleSubmit = async () => {
      uploadNewFiles(props.id);
      deleteFilesFromBe();
      await editById("materials", props.id, material, true, true);

      //router.go(-1);
    };

    const addToList = (event) => {
      files.value.push(event.target.files[0]);
      listToAdd.value.push(event.target.files[0]);
    };

    const deleteFile = (index, file) => {
      console.log("index:", index);
      console.log("id: ", file.id);
      //ako fajl postoji na bekendu - nije dodavan u ovu listu za dodavanje
      if (file.id != undefined) {
        files.value.splice(index, 1);
        listIdsFilesToDelete.value.push(file.id);
      } else {
        //ako fajl ne postoji na bekendu vec samo u listi za dodavanje
        files.value.splice(index, 1);

        //indeki files i listToAdd NISU ISTI!

        let indOfListToAdd = listToAdd.value.indexOf(file);
        console.log("ssss:", indOfListToAdd);
        if (indOfListToAdd !== -1) {
          listToAdd.value.splice(indOfListToAdd, 1); //obrisati ga iz liste za dodavanje
        }
      }
    };

    const uploadNewFiles = async (matId) => {
      console.log(matId);

      for (let i = 0; i < listToAdd.value.length; i++) {
        let formData = new FormData();
        formData.append("file", listToAdd.value[i], listToAdd.value[i].name);

        await uploadFile(matId, formData);
      }
    };

    const deleteFilesFromBe = async () => {
      for (let i = 0; i < listIdsFilesToDelete.value.length; i++) {
        await deleteById("files", listIdsFilesToDelete.value[i]);
      }
    };

    return { material, handleSubmit, files, addToList, deleteFile };
  },
};
</script>

<style scoped>
.mat-files {
  border: 1px solid indigo;
  padding: 8px;
  margin-bottom: 10px;
}
</style>
