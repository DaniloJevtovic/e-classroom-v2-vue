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

    <div v-if="posts.length">
      <div class="post-list">
        <div v-for="(post, index) in posts" :key="post.id">
          <!-- kada se objava ne mjenja -->
          <div class="post" v-if="!post.edit">
            <div class="post-info">
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
                <button @click.prevent="deletePost(index, post.id)">
                  Delete post
                </button>

                <!-- samo autor posta moze da mjenja svoj post -->
                <button
                  v-if="author.id == post.author.id"
                  @click="post.edit = !post.edit"
                >
                  Edit post
                </button>
              </div>
            </div>

            <!-- lista komentara za post -->
            <comments-list :postId="post.id"></comments-list>
          </div>

          <!-- kada se objava edituje -->
          <div class="post" v-else>
            <div class="post-edit">
              <div class="post-text">
                <p>
                  {{ post.author.firstName }} {{ post.author.lastName }} / Date:
                  {{ post.date }}
                </p>
                <textarea rows="5" v-model="post.post"></textarea>
                <!-- <p>{{ post.edit }}</p> -->
              </div>

              <div
                class="post-buttons"
                v-if="
                  author.id == post.author.id ||
                  author.authorities[0].authority == 'ROLE_TEACHER'
                "
              >
                <button
                  @click.prevent="
                    updatePost(index, post), (post.edit = !post.edit)
                  "
                >
                  Save changes
                </button>

                <!-- <button @click.prevent="post.edit = !post.edit">Cancel</button> -->
              </div>
            </div>

            <!-- lista komentara za post -->
            <comments-list :postId="post.id"></comments-list>
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

import CommentsList from "./CommentsList.vue";

export default {
  props: ["courseId"],
  components: { CommentsList },
  setup(props) {
    const { getSubItems, save, deleteById, editById } = useCRUD();
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

      posts.value.forEach((post) => {
        post.edit = false;
      });
    };

    const newPost = async () => {
      let res = await save("posts", post, false, true);
      posts.value.unshift(res);
      post.post = "";
    };

    const updatePost = async (index, post) => {
      console.log("prije izmjene", post);

      //konvertujem objavu (iz niza) u odgovarajuci format za bekend (dto)
      let postToEdit = {
        post: post.post,
        courseId: post.course.id,
        authorId: post.author.id,
      };

      let res = await editById("posts", post.id, postToEdit, false, true);
      res.edit = false; //dodajem edit atribut i stavljam mu vrijednost false (isto ono sto sam radio kad sam ucitao sve objave u foreach petlji)
      posts.value[index] = res; //azuriram vrjednost posta u listi (nakon sto dobijem odgovor sa bekenda)
      //zbog datuma
    };

    const deletePost = async (index, id) => {
      posts.value.splice(index, 1); //brisanje iz liste
      await deleteById("posts", id, false, true); //brisanje na bekendu
    };

    onMounted(() => {
      getPosts();
    });

    return {
      post,
      posts,
      newPost,
      updatePost,
      deletePost,
      author,
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