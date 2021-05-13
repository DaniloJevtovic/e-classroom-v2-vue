<template>
  <div class="posts-list">
    <div class="new-post">
      <textarea
        rows="5"
        v-model="post.post"
        placeholder="type something"
        required
      >
      </textarea>
      <button @click.prevent="newPost">post</button>
    </div>

    <div class="post-list">
      <div v-for="(post, index) in posts" :key="post.id">
        <div class="post">
          <div class="post-info">
            <h2>{{ post.post }}</h2>

            <!-- <textarea rows="3" v-model="post.post"></textarea> -->
            <p>{{ post.author.firstName }} {{ post.author.lastName }}</p>

            <div
              v-if="
                author.id == post.author.id ||
                author.authorities[0].authority == 'ROLE_TEACHER'
              "
            >
              <button @click.prevent="deletePost(index, post.id)">
                Delete post
              </button>

              <button>Edit post</button>
            </div>
          </div>

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

    return { post, posts, newPost, deletePost, author };
  },
};
</script>

<style scoped>
.posts-list {
  padding: 5px;
  background: wheat;
}

/* new post */
.new-post {
  background: springgreen;
  display: flex;
  border: 2px solid black;
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
  background: yellow;
  border: 1px solid rgb(145, 255, 0);
  margin: 8px;
  border-radius: 7px;
  padding-top: 20px;
}

.post-info {
  border: 3px solid indigo;
  padding: 10px;
  margin: 0px 10px 4px;
  background: rgb(17, 169, 189);
  color: white;
}
</style>