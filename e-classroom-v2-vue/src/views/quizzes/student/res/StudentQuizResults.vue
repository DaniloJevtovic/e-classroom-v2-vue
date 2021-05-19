<template>
  <div class="student-res">
    <div class="res-score">
      <!-- <h1 v-if="result.points < 0">Your Score: 0 points / ?</h1>
      <h1 v-else>Your Score: {{ result.points }} points / ?</h1> -->

      <h1>Your Score: {{ result.points }} points / ?</h1>
    </div>

    <student-res-questions :quizId="result.quiz.id" :resId="result.id">
    </student-res-questions>

    <student-res-comments :resId="result.id"></student-res-comments>
  </div>
</template>

<script>
import StudentResQuestions from "./StudentResQuestions.vue";
import StudentResComments from "./StudentResComments.vue";

export default {
  props: ["result"],
  components: { StudentResQuestions, StudentResComments },
  setup() {},
};
</script>

<style scoped>
.student-res {
  background: rgb(0, 217, 255);
  margin: 10px;
  border: 3px solid rebeccapurple;
}

.res-score {
  background: rgb(0, 255, 106);
  padding: 8px;
}
</style>