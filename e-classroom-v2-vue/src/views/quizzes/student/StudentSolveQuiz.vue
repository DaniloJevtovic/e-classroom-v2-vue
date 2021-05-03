<template>
  <div class="container">
    <div class="container-body">
      <div class="quiz-info">
        <h1>Name: {{ quizInfo.name }}</h1>
        <h2>Instructions: {{ quizInfo.instructions }}</h2>
        <h2>Duration: {{ quizInfo.duration }}</h2>
        <h3>Total questions: {{ questions.length }}</h3>
        <h1>TIME: 14:24</h1>
      </div>

      <div class="questions">
        <h1>Questions</h1>

        <div v-for="question in questions" :key="question.id">
          <student-solve-quiz-questions :questionId="question.id">
          </student-solve-quiz-questions>
        </div>
      </div>

      <button>FINISH</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import StudentSolveQuizQuestions from "./StudentSolveQuizQuestions.vue";
import { useRouter, userRouter } from "vue-router";

export default {
  props: ["id", "quizId"],
  components: { StudentSolveQuizQuestions },
  setup(props) {
    const { getById, getSubItems, deleteById } = useCRUD();
    const router = useRouter();

    const quizInfo = ref("");
    const questions = ref([]);

    const getQuiz = async () => {
      quizInfo.value = await getById("quizzes", props.quizId);
    };

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    onMounted(() => {
      getQuiz();
      getQuestionsForQuiz();
    });

    return { quizInfo, questions };
  },
};
</script>

<style>
.quiz-info {
  padding: 14px;
  border: 7px solid darkblue;
  background: blue;
  border-radius: 20px;
}

.questions {
  padding: 10px;
}
</style>