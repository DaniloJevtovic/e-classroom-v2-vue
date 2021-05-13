<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to materials</button>
    </div>
    <div class="container-body">
      <h3>Name: {{ materialInfo.name }}</h3>
      <h3>Descriptions: {{ materialInfo.description }}</h3>

      <hr />

      <h3>Files</h3>

      <div v-for="file in files" :key="file.id">
        <button @click.prevent="downFile(file)">
          <h3>{{ file.name }}</h3>
        </button>
      </div>

      <hr />
      <h3>Comments</h3>
      <div v-for="(comment, index) in comments" :key="comment.id">
        <div>
          <p>{{ comment.author.firstName }}: {{ comment.comment }}</p>
          <button @click.prevent="deleteComment(index, comment.id)">
            delete
          </button>
        </div>
      </div>
      <textarea rows="3" v-model="comment.comment"></textarea>
      <button @click.prevent="newComment">comment</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import useUpDownFile from "@/composables/useUpDownFile.js";

import { useStore } from "vuex";

export default {
  props: ["matId"],
  setup(props) {
    const { getById, getSubItems, save, deleteById } = useCRUD();
    const { downloadFile } = useUpDownFile();
    const store = useStore();

    const materialInfo = ref("");
    const files = ref([]);
    const comments = ref([]);

    const author = store.getters["getLoggedUser"];

    const comment = reactive({
      comment: "",
      materialId: props.matId,
      authorId: author.id,
    });

    const getMaterial = async () => {
      materialInfo.value = await getById("materials", props.matId);
    };

    const getFilesForMaterial = async () => {
      files.value = await getSubItems("files", "material", props.matId);
    };

    const getCommentsForMaterial = async () => {
      comments.value = await getSubItems(
        "matComments",
        "material",
        props.matId
      );
    };

    onMounted(() => {
      getMaterial();
      getFilesForMaterial();
      getCommentsForMaterial();
    });

    const downFile = async (file) => {
      await downloadFile(file);
    };

    const newComment = async () => {
      let res = await save("matComments", comment);
      comments.value.push(res);
      comment.comment = "";
    };

    const deleteComment = async (index, id) => {
      comments.value.splice(index, 1); //brisanje iz liste
      await deleteById("matComments", id); //brisanje na bekendu
    };

    return {
      materialInfo,
      files,
      comment,
      comments,
      downFile,
      newComment,
      deleteComment,
    };
  },
};
</script>

<style>
</style>