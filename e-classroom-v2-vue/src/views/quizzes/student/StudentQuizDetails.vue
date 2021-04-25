<template>
  <div class="container">
    <div class="container-header">
      <h3>Details</h3>
      <button @click="$router.go(-1)">Back</button>
    </div>
    <div class="container-body">
      <h3>Name: {{ quizInfo.name }}</h3>
      <h3>Instruction: {{ quizInfo.instructions }}</h3>
      <h4>Duration: {{ quizInfo.duration }}</h4>

      <button v-if="true">Start</button>
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


<style>
</style>