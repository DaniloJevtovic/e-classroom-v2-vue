<template>
  <div class="posts-list">
    <div class="new-post">
      <textarea
        rows="5"
        v-model="newPost.post"
        placeholder="type something"
        required
      >
      </textarea>
      <button @click.prevent="addNewPost">post</button>
    </div>

    <div v-if="posts.length">
      <div class="post-list">
        <div v-for="(post, index) in posts" :key="post.id">
          <div class="post">
            <Post
              :post="post"
              :index="index"
              @obrisiPost="deletePostFromList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import { useStore } from "vuex";

import Post from "./Post.vue";

export default {
  props: ["courseId"],
  components: { Post },
  setup(props) {
    const { getSubItems, save } = useCRUD();
    const store = useStore();

    const author = store.getters["getLoggedUser"];

    const posts = ref([]);

    const newPost = reactive({
      post: "",
      courseId: props.courseId,
      authorId: author.id,
    });

    const getPosts = async () => {
      posts.value = await getSubItems("posts", "course", props.courseId);

      //objavama dodjeljum da nisu u statusu izmjene
      posts.value.forEach((post) => {
        post.edit = false;
      });
    };

    const addNewPost = async () => {
      let res = await save("posts", newPost, false, true);
      posts.value.unshift(res);
      newPost.post = "";
    };

    const deletePostFromList = (index) => {
      posts.value.splice(index, 1); //brisanje iz liste
    };

    onMounted(() => {
      getPosts();
    });

    return {
      newPost,
      posts,
      addNewPost,
      author,
      deletePostFromList,
    };
  },
};
</script>

<style scoped>
.posts-list {
  padding: 5px;
  background: rgb(33, 28, 104);
}

/* new post */
.new-post {
  background: springgreen;
  display: flex;
  border: 2px solid silver;
}
.new-post button {
  color: aqua;
}
.new-post button:hover {
  background: orangered;
}
.new-post textarea {
  margin: 0px;
}

/* list posts */
.post-list {
  background: blue;
  border: 2px solid orange;
  margin-top: 10px;
  margin-bottom: 20px;
}

.post {
  background: rgb(110, 120, 216);
  border: 1px solid rgb(145, 255, 0);
  margin: 8px;
  /* border-radius: 7px; */
  padding-top: 20px;
}
</style>