<template>
  <div>
    <div class="post-info" v-if="!post.edit">
      <div class="post-text">
        <p>
          {{ post.author.firstName }} {{ post.author.lastName }} / Date:
          {{ post.date }}
        </p>
        <h3 style="color: cyan">{{ post.post }}</h3>
      </div>

      <!-- samo autor i profesor mogu da brisu postove -->
      <div
        class="post-buttons"
        v-if="
          author.id == post.author.id ||
          author.authorities[0].authority == 'ROLE_TEACHER'
        "
      >
        <!-- samo autor posta moze da mjenja svoj post -->
        <button
          v-if="author.id == post.author.id"
          @click="post.edit = !post.edit"
        >
          Edit post
        </button>

        <button @click.prevent="deletePost">Delete post</button>
      </div>
    </div>

    <!-- ako se objava mjenja -->
    <div v-else>
      <div class="post-edit">
        <div class="post-text">
          <p>
            {{ post.author.firstName }} {{ post.author.lastName }} / Date:
            {{ post.date }}
          </p>

          <textarea rows="5" v-model="postToEdit.post"></textarea>
        </div>

        <div
          class="post-buttons"
          v-if="
            author.id == post.author.id ||
            author.authorities[0].authority == 'ROLE_TEACHER'
          "
        >
          <button
            @click.prevent="updatePost(), (post.edit = !post.edit)"
            style="background: springgreen; color: indigo"
          >
            Save changes
          </button>

          <button
            style="background: orange; color: indigo"
            @click.prevent="cancelEdit"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- lista komentara za objavu -->
    <comments-list :postId="post.id"></comments-list>
  </div>
</template>

<script>
import { reactive } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import { useStore } from "vuex";

import CommentsList from "./CommentsList.vue";

export default {
  props: ["post", "index"],
  components: { CommentsList },
  setup(props, context) {
    const { editById, deleteById } = useCRUD();
    const store = useStore();

    const author = store.getters["getLoggedUser"];

    const postToEdit = reactive({
      post: props.post.post,
      courseId: props.post.courseId,
      authorId: author.id,
    });

    const updatePost = async () => {
      let res = await editById("posts", props.post.id, postToEdit, false, true);
      res.edit = false; //dodajem edit atribut i stavljam mu vrijednost false (isto ono sto sam radio kad sam ucitao sve objave u foreach petlji)

      props.post.post = res.post;
    };

    const cancelEdit = () => {
      props.post.edit = !props.post.edit;
      postToEdit.post = props.post.post;
    };

    const deletePost = async () => {
      await deleteById("posts", props.post.id, false, true); //brisanje na bekendu

      //brisanje u roditeljskoj komponenti - gdje su sve objave
      context.emit("obrisiPost", props.index);
    };

    return {
      author,
      postToEdit,
      updatePost,
      cancelEdit,
      deletePost,
    };
  },
};
</script>

<style scoped>
.post-info {
  border: 1px solid rgb(27, 4, 43);
  padding: 10px;
  margin: 0px 10px 4px;
  background: rgb(36, 8, 102);
  color: white;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

.post-edit {
  border: 1px solid rgb(27, 4, 43);
  padding: 10px;
  margin: 0px 10px 4px;
  background: rgb(36, 8, 102);
  color: white;
  align-items: center;
  border-radius: 5px;
}

.post-text {
  text-align: left;
}

.post-buttons {
  text-align: right;
  display: flex;
  margin-left: auto; /*poravnava u udesno */
}
</style>