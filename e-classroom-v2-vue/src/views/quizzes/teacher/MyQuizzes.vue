<template>
  <div class="quizzes-info">
    <h2>Quizzes</h2>

    <router-link :to="{ name: 'NewQuiz', params: { id } }">
      <button>New Quiz</button>
    </router-link>

    <input type="text" placeholder="search" />

    <div class="te-quizzes">
      <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
        <!-- samo kvizovi koji nisu obrisani -->
        <!-- <div v-if="quiz.status !== 'DELETED'"> -->

        <router-link
          :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
        >
          <div class="singlee-quiz">
            <h2>Name: {{ quiz.name }}</h2>
            <h3>Instruction: {{ quiz.instructions }}</h3>
            <h4>Duration: {{ quiz.duration }} minutes.</h4>
          </div>
        </router-link>

        <!-- </div> -->
      </div>
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
  background: rgb(48, 43, 48);
}

.quizzes {
  background: springgreen;
  color: white;
  padding: 8px;
}

.singlee-quiz {
  background: coral;
  color: white;
  padding: 5px;
}
</style>