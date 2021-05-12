<template>
  <div class="container">
    <h2>Results</h2>
    <h2>Points: {{ result.points }}</h2>

    <student-res-questions
      :quizId="result.quiz.id"
      :resId="result.id"
    ></student-res-questions>
  </div>
</template>

<script>
import StudentResQuestions from "./StudentResQuestions.vue";

export default {
  props: ["result"],
  components: { StudentResQuestions },
  setup() {},
};
</script>

<style>
</style>