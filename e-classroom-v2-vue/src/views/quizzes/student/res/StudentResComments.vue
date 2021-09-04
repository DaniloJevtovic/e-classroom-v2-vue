<template>
  <div class="res-comms">
    <h3>Comments</h3>

    <!-- lista komentara za rezultat -->
    <div class="res-com-list" v-if="comments.length">
      <div v-for="(comment, index) in comments" :key="comment.di">
        <div class="comment">
          <div class="comment-text">
            <p>{{ comment.author.firstName }} - {{ comment.date }}</p>
            <h3>{{ comment.comment }}</h3>
          </div>

          <div v-if="author.id == comment.author.id" class="comment-button">
            <button @click="deleteComment(index, comment.id)">
              Delete &#10007;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- novi komentar za taj rezultat -->
    <div class="res-new-comment">
      <textarea
        rows="5"
        v-model="newComment.comment"
        placeholder="comment"
      ></textarea>
      <button @click.prevent="addComment">Comment</button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["resId"],
  setup(props) {
    const { getSubItems, save, deleteById } = useCRUD();
    const store = useStore();

    const comments = ref([]);
    const author = store.getters["getLoggedUser"];

    const newComment = reactive({
      comment: "",
      resultId: props.resId,
      authorId: author.id,
    });

    const getComments = async () => {
      comments.value = await getSubItems("stResComms", "result", props.resId);
    };

    const addComment = async () => {
      let res = await save("stResComms", newComment, false, false);

      //ubacujem komentar u listu komentara
      comments.value.push(res);
      newComment.comment = ""; //resetujem vrjednost komentara
    };

    const deleteComment = async (index, id) => {
      comments.value.splice(index, 1); //brisanje iz liste
      await deleteById("stResComms", id); //brisanje na bekendu
    };

    onMounted(() => {
      getComments();
    });

    return { comments, newComment, addComment, deleteComment, author };
  },
};
</script>

<style scoped>
.res-comms {
  background: rgb(38, 108, 189);
  border-radius: 3px;
  margin: 5px;
  padding: 5px;
}

.res-com-list {
  background: rgb(34, 211, 235);
  padding: 3px;
  margin: 5px;
}

.comment {
  color: white;
  background: rgb(38, 99, 128);
  margin: 3px;
  padding: 3px;
  display: flex;
  align-items: center;
}

.res-new-comment {
  display: flex;
  background: cyan;
  padding: 5px;
  margin: 5px;
}

.res-new-comment textarea {
  margin: 0px;
}

.comment-text {
  text-align: left;
}

.comment-button {
  margin-left: auto;
}
</style>