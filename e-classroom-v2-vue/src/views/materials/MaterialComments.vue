<template>
  <div>
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
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";

export default {
  props: ["matId"],
  setup(props) {
    const { getById, getSubItems, save, deleteById } = useCRUD();
    const store = useStore();

    const comments = ref([]);

    const author = store.getters["getLoggedUser"];

    const comment = reactive({
      comment: "",
      materialId: props.matId,
      authorId: author.id,
    });

    const getCommentsForMaterial = async () => {
      comments.value = await getSubItems(
        "matComments",
        "material",
        props.matId
      );
    };

    onMounted(() => {
      getCommentsForMaterial();
    });

    const newComment = async () => {
      let res = await save("matComments", comment);
      comments.value.push(res);
      comment.comment = "";
    };

    const deleteComment = async (index, id) => {
      comments.value.splice(index, 1); //brisanje iz liste
      await deleteById("matComments", id); //brisanje na bekendu
    };

    return { comment, comments, newComment, deleteComment };
  },
};
</script>

<style>
</style>