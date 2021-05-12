<template>
  <div>
    <h2>Pitanja za kviz: {{ quizId }}</h2>

    <div v-for="question in questions" :key="question.id">
      <h1>{{ question.question }}</h1>
      <student-quiz-answers
        :questionId="question.id"
        :resId="resId"
      ></student-quiz-answers>
      <hr />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import StudentQuizAnswers from "./StudentQuizAnswers.vue";

export default {
  props: ["quizId", "resId"],
  components: { StudentQuizAnswers },
  setup(props) {
    const { getSubItems } = useCRUD();

    const questions = ref([]);

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    onMounted(() => {
      getQuestionsForQuiz();
    });

    return { questions };
  },
};
</script>

<style>
</style>