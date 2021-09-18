<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>New material</h3>

        <div class="mat-txt-files">
          <div class="text-mat">
            <input
              type="text"
              v-model="newMaterial.name"
              placeholder="Name"
              required
            />
            <textarea
              rows="3"
              v-model="newMaterial.description"
              placeholder="Description"
            >
            </textarea>
          </div>

          <div class="mat-files">
            <input
              type="file"
              @change="addToList($event)"
              placeholder="select"
            />
            <p v-for="(file, index) in files" :key="file">
              {{ file.name }}
              <button @click.prevent="deleteFile(index)">delete</button>
            </p>
          </div>
        </div>

        <button>Save</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import useCRUD from "@/composables/useCRUD.js";
import useUpDownFile from "@/composables/useUpDownFile.js";

export default {
  props: ["id"],
  setup(props, context) {
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
      let res = await save("materials", newMaterial, false, true);

      //upload fajlova za taj materjal
      await uploadFiles(res.id);

      context.emit("dodajUListu", res);
      closeModal();
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

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return {
      newMaterial,
      handleSubmit,
      addToList,
      files,
      deleteFile,
      closeModal,
    };
  },
};
</script>

<style scoped>
.mat-txt-files {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.text-mat,
.mat-files {
  margin: 10px;
  color: rgb(40, 55, 190);
  border: 1px solid indigo;
  padding: 20px;
  border-radius: 5px;
}

/* .mat-files {
  border: 1px solid indigo;
  padding: 8px;
  margin-bottom: 10px;
} */

.modal {
  width: 900px;
}

form {
  max-width: 900px;
}
</style>