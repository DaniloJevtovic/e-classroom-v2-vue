<template>
  <div>
    <div class="res-quest">
      <div v-for="(question, index) in questions" :key="question.id">
        <div class="quest-answers">
          <h1>
            {{ index + 1 }}. {{ question.question }} - points:
            {{ question.points }}
          </h1>
          <student-quiz-answers :questionId="question.id" :resId="resId">
          </student-quiz-answers>
        </div>
      </div>
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

<style scoped>
.res-quest {
  background: yellow;
  margin: 10px;
}

.quest-answers {
  background: plum;
  border: 10px solid indigo;
  margin: 20px;
  padding: 20px;
}
</style>