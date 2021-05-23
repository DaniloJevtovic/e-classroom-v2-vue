<template>
  <div class="student-res">
    <div class="res-score">
      <!-- <h1 v-if="result.points < 0">Your Score: 0 points / ?</h1>
      <h1 v-else>Your Score: {{ result.points }} points / ?</h1> -->

      <h1>Score: {{ result.points }} points / ?</h1>
      <button v-if="checkLoggedUser()">Edit points</button>
    </div>

    <student-res-questions :quizId="result.quiz.id" :resId="result.id">
    </student-res-questions>

    <student-res-comments :resId="result.id"></student-res-comments>
  </div>
</template>

<script>
import StudentResQuestions from "./StudentResQuestions.vue";
import StudentResComments from "./StudentResComments.vue";

import { useStore } from "vuex";

export default {
  props: ["result"],
  components: { StudentResQuestions, StudentResComments },
  setup() {
    const store = useStore();

    const checkLoggedUser = () => {
      let loggedUser = store.getters["getLoggedUser"];

      if (loggedUser.authorities[0].authority == "ROLE_TEACHER") {
        console.log(loggedUser);
        return true;
      } else {
        return false;
      }
    };

    return { checkLoggedUser };
  },
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