<template>
  <div>
    <div class="quizDetails">
      <div class="container-header">
        <button @click.prevent="$router.go(-1)">Back to quizzes</button>
        <button @click="view = !view">view</button>
      </div>

      <div class="container-body" v-if="results.length">
        <div class="quiz-info">
          <h2>Quiz: {{ quizDetails.name }}</h2>
          <p>Instructions: {{ quizDetails.instructions }}</p>
          <h4>Duration: {{ quizDetails.duration }} min</h4>
        </div>

        <div v-if="view">
          <div v-for="result in results" :key="result.id">
            <ResultForQuiz :result="result" />
          </div>
        </div>

        <!-- tabelarni prikaz rezultata -->
        <div v-else>
          <table>
            <thead>
              <td>#</td>
              <td>Student</td>
              <td>Points</td>
              <td>Actions</td>
            </thead>
            <tr v-for="(result, index) in results" :key="result.id">
              <!-- u posebnoj komponenti -->
              <ResultForQuizTable :result="result" :index="index" />
            </tr>
          </table>
        </div>
      </div>
      <div v-else>
        <h2>No results</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../../composables/useCRUD.js";

import StudentQuizResults from "../../student/res/StudentQuizResults.vue";
import ResultForQuiz from "../results/ResultForQuiz.vue";
import ResultForQuizTable from "../results/ResultForQuizTable.vue";

export default {
  props: ["quizId"],
  components: {
    StudentQuizResults,
    ResultForQuiz,
    ResultForQuizTable,
  },
  setup(props) {
    const { getSubItems, getById } = useCRUD();

    const quizDetails = ref("");
    const results = ref([]);

    const getQuizDetails = async () => {
      quizDetails.value = await getById("quizzes", props.quizId);
    };

    const getResults = async () => {
      results.value = await getSubItems("results", "quiz", props.quizId);

      //prolazim kroz sve rezultate da bi im dodao atribut - collapsed
      //taj atribut nemam na bekendu a na frontednu ce mi posluziti
      //da znam za koji rezultat su prikazani detalji, da ne bi sve otovorilo odjednom
      results.value.forEach((element) => {
        element.collapsed = false;
      });
    };

    onMounted(() => {
      getQuizDetails();
      getResults();
    });

    const view = ref(true);

    return {
      quizDetails,
      results,
      view,
    };
  },
};
</script>

<style scoped>
.quizDetails {
  background: rgb(80, 152, 211);
}
</style>