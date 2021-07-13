<template>
  <div class="coments-container">
    <div class="coments-list" v-if="comments.length">
      <div v-for="(comment, index) in comments" :key="comment.id">
        <div class="comment">
          <div class="comment-text">
            <p>
              {{ comment.author.firstName }} {{ comment.author.lastName }} -
              {{ comment.date }}
            </p>
            <h3>{{ comment.comment }}</h3>
          </div>

          <div
            class="comment-button"
            v-if="
              author.id == comment.author.id ||
              author.authorities[0].authority == 'ROLE_TEACHER'
            "
          >
            <button @click.prevent="deleteComment(index, comment.id)">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="new-comment">
      <textarea
        rows="3"
        v-model="comment.comment"
        placeholder="type comment"
        required
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

    return { author, comment, comments, newComment, deleteComment };
  },
};
</script>

<style scoped>
.coments-container {
  background: hotpink;
  margin-left: 180px;
  margin-right: 10px;
}

.coments-list {
  background: rgb(170, 230, 245);
  padding: 5px;
  border: 1px solid oldlace;
}

.comment {
  background: rgb(83, 83, 148);
  color: aqua;
  margin: 5px;
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 3px;
}

.comment-text {
  text-align: left;
}

.comment-button {
  margin-left: auto;
}

.new-comment {
  background: rgb(6, 202, 209);
  display: flex;
  padding: 8px;
}

.new-comment textarea {
  margin: 0px;
}
</style>