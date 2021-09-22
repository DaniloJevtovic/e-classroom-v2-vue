<template>
  <div class="quizzes-info">
    <!-- <h3>Quizzes</h3> -->

    <div v-if="quizzes.length">
      <div class="quiz-header">
        <div></div>
        <input type="text" placeholder="search by name" />
        <div>
          <button @click="view = !view">view</button>
        </div>
      </div>

      <div class="quizzes" v-if="view">
        <div v-for="quiz in quizzes" :key="quiz.id">
          <div v-if="quiz.quizStatus == 'ACTIVE'">
            <router-link
              :to="{
                name: 'StudentQuizDetails',
                params: { id: id, quizId: quiz.id },
              }"
            >
              <div class="st-quiz-det">
                <h3>Quiz Name: {{ quiz.name }}</h3>
                <p>Instruction: {{ quiz.instructions }}</p>
                <h4>Duration: {{ quiz.duration }} minutes.</h4>
                <h4 style="color: orange">Points: {{ quiz.totalPoints }}</h4>

                <!-- ucitavanje rezultata za kviz -->
                <div class="res">
                  <student-quizzes-ress :quizId="quiz.id">
                  </student-quizzes-ress>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- tabelarni prikaz -->
      <div v-else>
        <table>
          <thead>
            <td>#</td>
            <td>Name</td>
            <td>Duration</td>
            <td>Total points</td>
            <td>Details</td>
          </thead>
          <tr v-for="(quiz, index) in quizzes" :key="quiz.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ quiz.name }}</td>
            <td>{{ quiz.duration }} min</td>
            <td>{{ quiz.totalPoints }}</td>
            <td>
              <router-link
                :to="{
                  name: 'StudentQuizDetails',
                  params: { id: id, quizId: quiz.id },
                }"
              >
                <button>details</button>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div v-else class="no-quizzes">
      <h3>No quizzes</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import { useStore } from "vuex";

import StudentQuizzesRess from "./StudentQuizzesRess.vue";

export default {
  props: ["id"],
  components: { StudentQuizzesRess },
  setup(props) {
    const quizzes = ref([]);
    const store = useStore();

    const { getAll, getSubItems } = useCRUD();

    const getQuizzesForCourse = async () => {
      //svi aktivni kvizovi
      //quizzes.value = await getSubItems("quizzes", "course", props.id);

      let student = store.getters["getLoggedUser"];
      // kvizovi koje ucenik nije rjesavao !
      quizzes.value = await getAll(
        "quizzes/course/" + props.id + "/studNotSolved/" + student.id
      );
    };

    onMounted(() => {
      getQuizzesForCourse();
    });

    return { quizzes, view: ref(true) };
  },
};
</script>

<style scoped>
.quiz-header {
  padding: 5px;
  background: rgb(103, 5, 231);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

.quizzes-info {
  background: rgb(245, 243, 241);
}

.quizzes {
  background: rgb(3, 3, 39);
  margin: 3px;
  padding: 2px;
}

.st-quiz-det {
  margin: 10px;
  padding: 14px;
  color: cornflowerblue;
  border: 1px solid white;
}

.quiz {
  padding: 10px;
  margin: 1px;
}

.no-quizzes {
  margin: 10px;
  padding: 10px;
  background: orangered;
}

input {
  margin: 0px;
}

.res {
  margin: 4px auto;
  width: 40%;
}
</style>