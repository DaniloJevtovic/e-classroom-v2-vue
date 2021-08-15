<template>
  <form @submit.prevent="handleSubmit">
    <h2>New material</h2>
    <input type="text" v-model="newMaterial.name" placeholder="Name" required />
    <textarea
      rows="3"
      v-model="newMaterial.description"
      placeholder="Description"
    >
    </textarea>

    <div class="mat-files">
      <input type="file" @change="addToList($event)" placeholder="select" />
      <p v-for="(file, index) in files" :key="file">
        {{ file.name }} <button @click.prevent="deleteFile(index)">delete</button>
      </p>
    </div>

    <button>Save</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import useCRUD from "@/composables/useCRUD.js";
import useUpDownFile from "@/composables/useUpDownFile.js";

export default {
  props: ["id"],
  setup(props) {
    const { save } = useCRUD();
    const { uploadFile } = useUpDownFile();
    const router = useRouter();
    
    const newMaterial = reactive({
      name: "",
      description: "",
      courseId: props.id,
    });

    const files = ref([]);

    const handleSubmit = async () => {
      //cuvam materijal
      let res = await save("materials", newMaterial, true, true);

      //upload fajlova za taj materjal
      await uploadFiles(res.id);

      // console.log(newMaterial);
      // router.go(-1);
    };

    const addToList = (event) => {
      //dodajem fajlove u listu
      console.log(event.target.files[0]);
      files.value.push(event.target.files[0]);
    };

    const deleteFile = (index) => {
      files.value.splice(index, 1);
    };

    const uploadFiles = async (matId) => {
      console.log(matId);

      for (let i = 0; i < files.value.length; i++) {
        console.log(files.value[i].name);

        let formData = new FormData();
        formData.append("file", files.value[i], files.value[i].name);

        await uploadFile(matId, formData);
      }

    };

    return { newMaterial, handleSubmit, addToList, files, deleteFile };
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