<template>
  <div class="quizzes-info">
    <h1>Quizzes</h1>
    <router-link :to="{ name: 'NewQuiz', params: { id } }">
      <button>New Quiz</button>
    </router-link>

    <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
      <!-- samo kvizovi koji nisu obrisani -->
      <!-- <div v-if="quiz.status !== 'DELETED'"> -->
      <h2>Name: {{ quiz.name }}</h2>
      <h3>Instruction: {{ quiz.instructions }}</h3>
      <h4>Duration: {{ quiz.duration }} minutes.</h4>
      <router-link
        :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
      >
        <button>details</button>
      </router-link>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const quizzes = ref([]);

    const { getSubItems } = useCRUD();

    const getQuizzesForCourse = async () => {
      quizzes.value = await getSubItems("quizzes", "course", props.id);
    };

    onMounted(() => {
      getQuizzesForCourse();
    });

    return { quizzes };
  },
};
</script>

<style scoped>
.quizzes-info {
  padding: 10px;
  background: orange;
}

.quizzes {
  background: rgb(11, 11, 65);
  color: springgreen;
  border: 5px solid pink;
  padding: 8px;
}
</style>