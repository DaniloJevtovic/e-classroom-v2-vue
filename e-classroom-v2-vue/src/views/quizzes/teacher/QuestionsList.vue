<template>
  <div class="questions-list">
    <h3>Questions ({{ questions.length }})</h3>
    <h3>Total points: {{ totalPoints }}</h3>

    <div v-for="(question, index) in questions" :key="question.id">
      <question-details
        :questionId="question.id"
        :questionIndex="index"
        @deleteFromList="deleteQuestion"
      ></question-details>
    </div>

    <button @click="addNewQuestion">New Question</button>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import QuestionDetails from "./QuestionDetails.vue";

export default {
  props: ["quizId"],
  components: { QuestionDetails },
  setup(props) {
    const { getSubItems, save } = useCRUD();

    const questions = ref([]);

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    const addNewQuestion = async () => {
      let res = await save("questions", {
        question: "",
        points: "0",
        questionType: "MULTIPLE_CHOICE",
        quizId: props.quizId,
      });

      questions.value.push(res);
    };

    //brisanje iz liste (prikaz) - brisanje na bekendu je u question details komponenti!
    const deleteQuestion = (id) => {
      let index = questions.value.findIndex((question) => question.id === id);
      questions.value.splice(index, 1);
    };

    const totalPoints = computed(() => {
      let points = 0;
      questions.value.forEach((question) => {
        points += question.points;
      });

      return points;
    });

    onMounted(() => {
      getQuestionsForQuiz();
    });

    return { questions, deleteQuestion, addNewQuestion, totalPoints };
  },
};
</script>

<style scoped>
.questions-list {
  padding: 1px;
  margin: 1px;
}
</style>