<template>
  <div class="container">
    <div class="container-header">
      <h3>Details</h3>
      <!-- <button @click="$router.go(-2)">Back</button> -->
      <router-link :to="{ name: 'MyCourseDetails', params: { id: id } }">
        <button>Back to course</button>
      </router-link>
    </div>
    <div class="container-body">
      <h3>Name: {{ quizInfo.name }}</h3>
      <h3>Instructions: {{ quizInfo.instructions }}</h3>
      <h3>Duration: {{ quizInfo.duration }}</h3>
      <hr />

      <h3>Questions</h3>
      <router-link :to="{ name: 'NewQuestion', params: { quizId: quizId } }">
        <button>New Question</button>
      </router-link>

      <div
        class="question-div"
        v-for="question in questions"
        :key="question.id"
      >
        <p>Question: {{ question.question }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id", "quizId"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();
    const quizInfo = ref("");

    const questions = ref([]);

    const getQuiz = async () => {
      quizInfo.value = await getById("quizzes", props.quizId);
    };

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    const newQuestion = () => {
      questions.value.push("ss");
    };

    onMounted(() => {
      getQuiz();
      getQuestionsForQuiz();
    });

    return { quizInfo, questions, newQuestion };
  },
};
</script>

<style>
</style>