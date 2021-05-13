<template>
  <div class="container">
    <div class="coments-list">
      <div v-for="(comment, index) in comments" :key="comment.id">
        <div class="comment">
          <h3>{{ comment.comment }}</h3>
          <p>{{ comment.author.firstName }}</p>
          <button @click.prevent="deleteComment(index, comment.id)">
            delete
          </button>
        </div>
      </div>
    </div>
    <div class="new-comment">
      <textarea
        rows="3"
        v-model="comment.comment"
        placeholder="type comment"
      ></textarea>
      <button @click.prevent="newComment">comment</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import { useStore } from "vuex";

export default {
  props: ["postId"],
  setup(props) {
    const { getSubItems, save, deleteById } = useCRUD();
    const store = useStore();

    const author = store.getters["getLoggedUser"];

    const comments = ref([]);

    const comment = reactive({
      comment: "",
      postId: props.postId,
      authorId: author.id,
    });

    const getComments = async () => {
      comments.value = await getSubItems("postComents", "post", props.postId);
    };

    onMounted(() => {
      getComments();
    });

    const newComment = async () => {
      let res = await save("postComents", comment);
      comments.value.push(res);
      comment.comment = "";
    };

    const deleteComment = async (index, id) => {
      comments.value.splice(index, 1); //brisanje iz liste
      await deleteById("postComents", id); //brisanje na bekendu
    };

    return { comment, comments, newComment, deleteComment };
  },
};
</script>

<style>
</style>