<template>
  <div class="questions">
    <h1>Questions</h1>

    <div v-for="question in questions" :key="question.id">
      <question-details
        :questionId="question.id"
        @deleteFromList="deleteQuestion"
      ></question-details>
    </div>
    <button @click="addNewQuestionForm">New Question 222</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import QuestionDetails from "./QuestionDetails.vue";
import { useRouter } from "vue-router";

export default {
  props: ["quizId"],
  components: { QuestionDetails },
  setup(props) {
    const { getById, getSubItems, deleteById, save } = useCRUD();
    const router = useRouter();

    const questions = ref([]);

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    //brisanje iz liste (prikaz) - brisanje na bekendu je u question details komponenti!
    const deleteQuestion = (id) => {
      let index = questions.value.findIndex((question) => question.id === id);
      questions.value.splice(index, 1);
    };

    onMounted(() => {
      getQuestionsForQuiz();
    });

    return { questions, deleteQuestion };
  },
};
</script>

<style scoped>
.questions {
  padding: 30px;
}
</style>