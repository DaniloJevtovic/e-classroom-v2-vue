<template>
  <div class="quizzes-info">
    <!-- <h3>Quizzes</h3> -->

    <div v-if="quizzes.length">
      <div class="quiz-header">
        <div></div>
        <input type="text" placeholder="search by name" />
        <div></div>
      </div>

      <div class="quizzes">
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
                <h3>Instruction: {{ quiz.instructions }}</h3>
                <h4>Duration: {{ quiz.duration }} minutes.</h4>

                <br />
                <!-- ucitavanje rezultata za kviz -->
                <student-quizzes-ress :quizId="quiz.id"></student-quizzes-ress>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-quizzes">
      <h2>No quizzes</h2>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

import StudentQuizzesRess from "./StudentQuizzesRess.vue";

export default {
  props: ["id"],
  components: { StudentQuizzesRess },
  setup(props) {
    const quizzes = ref([]);

    const { getSubItems } = useCRUD();

    const getQuizzesForCourse = async () => {
      quizzes.value = await getSubItems("quizzes", "course", props.id);
    };

    onMounted(() => {
      getQuizzesForCourse();
    });

    return { quizzes };
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
  margin: 20px;
  padding: 20px;
  background: red;
}

input {
  margin: 0px;
}
</style>