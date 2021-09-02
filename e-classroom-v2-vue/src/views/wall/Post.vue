<template>
  <div>
    <div class="post-info" v-if="!post.edit">
      <div class="post-text">
        <p>
          {{ post.author.firstName }} {{ post.author.lastName }} / Date:
          {{ post.date }}
        </p>
        <h3 style="color: cyan">{{ post.post }}</h3>
        <!-- <p>{{ post.edit }}</p> -->
      </div>

      <!-- samo autor i profesor modgu da brisu postove -->
      <div
        class="post-buttons"
        v-if="
          author.id == post.author.id ||
          author.authorities[0].authority == 'ROLE_TEACHER'
        "
      >
        <button @click.prevent="deletePost">Delete post</button>

        <!-- samo autor posta moze da mjenja svoj post -->
        <button
          v-if="author.id == post.author.id"
          @click="post.edit = !post.edit"
        >
          Edit post
        </button>
      </div>
    </div>

    <!-- ako se objava mjenja -->
    <!-- <div v-else>
      <PostEdit :post="post" />
    </div> -->

    <!-- lista komentara za post -->
    <comments-list :postId="post.id"></comments-list>
  </div>
</template>

<script>
import { ref, onMounted, reactive, co } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import { useStore } from "vuex";

import PostEdit from "./PostEdit.vue";
import CommentsList from "./CommentsList.vue";

export default {
  props: ["post", "index"],
  components: { PostEdit, CommentsList },
  setup(props, context) {
    const { deleteById } = useCRUD();
    const store = useStore();

    const author = store.getters["getLoggedUser"];

    const deletePost = async () => {
      await deleteById("posts", props.post.id, false, true); //brisanje na bekendu

      //brisanje u roditeljskoj komponenti - gdje su sve objave
      context.emit("obrisiPost", props.index);
    };

    return {
      author,
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

.post-text {
  text-align: left;
}

.post-buttons {
  text-align: right;
  display: flex;
  margin-left: auto; /*poravnava u udesno */
}
</style>