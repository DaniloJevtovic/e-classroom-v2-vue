<template>
  <div class="container">
    <div class="new-post">
      <textarea rows="3" v-model="post.post" placeholder="type something">
      </textarea>
      <button @click.prevent="newPost">post</button>
    </div>
    <div class="post-list">
      <div v-for="(post, index) in posts" :key="post.id">
        <div class="post">
          <h1>{{ post.post }}</h1>
          <p>{{ post.author.firstName }} {{ post.author.lastName }}</p>
          <button @click.prevent="deletePost(index, post.id)">
            Delete post
          </button>
          <comments-list :postId="post.id"></comments-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import { useStore } from "vuex";

import CommentsList from "./CommentsList.vue";

export default {
  props: ["courseId"],
  components: { CommentsList },
  setup(props) {
    const { getSubItems, save, deleteById } = useCRUD();
    const store = useStore();

    const author = store.getters["getLoggedUser"];

    const posts = ref([]);

    const post = reactive({
      post: "",
      courseId: props.courseId,
      authorId: author.id,
    });

    const getPosts = async () => {
      posts.value = await getSubItems("posts", "course", props.courseId);
    };

    const newPost = async () => {
      let res = await save("posts", post);
      posts.value.push(res);
      post.post = "";
    };

    const deletePost = async (index, id) => {
      posts.value.splice(index, 1); //brisanje iz liste
      await deleteById("posts", id); //brisanje na bekendu
    };

    onMounted(() => {
      getPosts();
    });

    return { post, posts, newPost, deletePost };
  },
};
</script>

<style scoped>
.post-list {
  background: blue;
}
</style>