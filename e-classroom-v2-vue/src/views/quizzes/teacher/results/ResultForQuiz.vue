<template>
  <div class="st-res">
    <h2>{{ result.student.firstName }} {{ result.student.lastName }}</h2>
    <h3>Points: {{ result.points }} / {{ result.quiz.totalPoints }}</h3>

    <!-- prikaz detalja rezultata -->
    <div v-if="result.collapsed">
      <student-quiz-results :result="result"></student-quiz-results>
    </div>

    <button
      v-if="!result.collapsed"
      @click="result.collapsed = !result.collapsed"
    >
      View details
    </button>

    <button v-else @click="result.collapsed = !result.collapsed">
      Hide details
    </button>

    <router-link
      :to="{
        name: 'NewMessage',
        params: { reciverId: result.student.id },
      }"
    >
      <button>Contact Student</button>
    </router-link>

    <router-link
      v-if="result.student.stParent"
      :to="{
        name: 'NewMessage',
        params: { reciverId: result.student.stParent.id },
      }"
    >
      <button>Contact parent</button>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../../composables/useCRUD.js";
import StudentQuizResults from "../../student/res/StudentQuizResults.vue";

export default {
  components: { StudentQuizResults },
  props: ["result"],
  setup() {},
};
</script>

<style scoped>
.st-res {
  background: rgb(250, 250, 250);
  margin: 10px;
  padding: 10px;
}
</style>