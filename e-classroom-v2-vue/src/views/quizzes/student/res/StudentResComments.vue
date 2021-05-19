<template>
  <div class="res-comms">
    <h3>Comments</h3>

    <!-- lista komentara za rezultat -->
    <div class="res-com-list" v-if="comments.length">
      <div v-for="(comment, index) in comments" :key="comment.di">
        <div class="comment">
          <div class="comment-text">
            <h4>{{ comment.author.firstName }}</h4>
            <h3>{{ comment.comment }}</h3>
          </div>

          <div v-if="author.id == comment.author.id" class="comment-button">
            <button @click="deleteComment(index, comment.id)">Delete</button>
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
      let res = await save("stResComms", newComment);

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
  background: purple;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
}

.res-com-list {
  background: thistle;
  padding: 3px;
}

.comment {
  background: indianred;
  margin: 3px;
  padding: 3px;
  display: flex;
  align-items: center;
}

.res-new-comment {
  display: flex;
  background: cyan;
  padding: 8px;
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