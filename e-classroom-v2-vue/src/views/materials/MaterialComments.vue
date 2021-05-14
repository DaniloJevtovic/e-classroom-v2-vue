<template>
  <div class="mat-com-list">
    <h2>Comments</h2>
    <div v-for="(comment, index) in comments" :key="comment.id">
      <div class="mat-com">
        <p>{{ comment.author.firstName }}: {{ comment.comment }}</p>

        <div
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

    <div class="new-mat-com">
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

    return { comment, comments, newComment, deleteComment, author };
  },
};
</script>

<style scoped>
.mat-com-list {
  background: slateblue;
  margin: 10px;
  padding: 10px;
}

.mat-com,
.new-mat-com {
  background: springgreen;
  padding: 8px;
  margin: 8px;
}

.new-mat-com {
  background: plum;
  display: flex;
}

button:hover {
  background: coral;
}

textarea {
  margin: 0px;
}
</style>