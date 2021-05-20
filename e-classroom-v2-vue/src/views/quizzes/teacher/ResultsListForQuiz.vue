<template>
  <div>
    <div class="quizDetails">
      <div class="container-header">
        <button @click.prevent="$router.go(-1)">Back to quizzes</button>
      </div>
      <h2>Quiz: {{ quizDetails.name }}</h2>
      <h2>Instructions: {{ quizDetails.instructions }}</h2>
      <h2>Duration: {{ quizDetails.duration }}</h2>
    </div>
    <div class="res-list">
      <div v-for="result in results" :key="result.id">
        <div class="st-res">
          <h1>{{ result.student.firstName }} {{ result.student.lastName }}</h1>
          <h2>Points: {{ result.points }} / ?</h2>

          <div v-if="showResult">
            <student-quiz-results :result="result"></student-quiz-results>
          </div>

          <button @click="showResult = !showResult">View details</button>

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
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

import StudentQuizResults from "../student/res/StudentQuizResults.vue";

export default {
  props: ["quizId"],
  components: { StudentQuizResults },
  setup(props) {
    const { getSubItems, getById } = useCRUD();

    const quizDetails = ref("");
    const results = ref([]);

    const showResult = ref(false);

    const getQuizDetails = async () => {
      quizDetails.value = await getById("quizzes", props.quizId);
    };

    const getResults = async () => {
      results.value = await getSubItems("results", "quiz", props.quizId);
    };

    onMounted(() => {
      getQuizDetails();
      getResults();
    });

    return { quizDetails, results, showResult };
  },
};
</script>

<style scoped>
.quizDetails {
  background: orange;
}

.res-list {
  background: blue;
  padding: 5px;
}
.st-res {
  background: springgreen;
  margin: 10px;
  padding: 10px;
}
</style>