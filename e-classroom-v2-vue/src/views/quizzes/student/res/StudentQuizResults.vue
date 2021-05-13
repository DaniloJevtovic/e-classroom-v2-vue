<template>
  <div class="container">
    <div class="res-score">
      <h1 v-if="result.points < 0">Your Score: 0 points / ?</h1>
      <h1 v-else>Your Score: {{ result.points }} points / ?</h1>
    </div>

    <div class="st-res-quest">
      <student-res-questions
        :quizId="result.quiz.id"
        :resId="result.id"
      ></student-res-questions>
    </div>
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

<style scoped>
.res-score {
  background: orange;
  padding: 8px;
}

.st-res-quest {
  background: hotpink;
}
</style>