<template>
  <div class="student-quiz-details">
    <div class="st-quiz-info">
      <h3>Name: {{ quizInfo.name }}</h3>
      <h3>Instruction: {{ quizInfo.instructions }}</h3>
      <h4>Duration: {{ quizInfo.duration }}</h4>

      <router-link
        v-if="true"
        :to="{ name: 'StudentSolveQuiz', params: { quizId: id } }"
      >
        <button>Start</button>
      </router-link>
      <div v-else>
        <student-quiz-results></student-quiz-results>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import StudentQuizResults from "./StudentQuizResults.vue";

export default {
  props: ["id"],
  components: {
    StudentQuizResults,
  },
  setup(props) {
    const { getById } = useCRUD();
    const quizInfo = ref("");

    const getQuizInfo = async () => {
      quizInfo.value = await getById("quizzes", props.id);
    };

    onMounted(() => {
      getQuizInfo();
    });

    return { quizInfo };
  },
};
</script>


<style scoped>
.st-quiz-info {
  background: rgb(136, 132, 163);
  padding: 15px;
}
</style>