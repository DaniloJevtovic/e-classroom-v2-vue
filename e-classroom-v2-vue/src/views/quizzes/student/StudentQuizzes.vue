<template>
  <div class="quizzes-info">
    <h1>Quizzes</h1>

    <div v-if="quizzes.length">
      <input type="text" placeholder="search" />

      <div class="st-qq">
        <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
          <div v-if="quiz.quizStatus == 'ACTIVE'">
            <router-link
              :to="{
                name: 'StudentQuizDetails',
                params: { id: id, quizId: quiz.id },
              }"
            >
              <div class="st-quiz-det">
                <h2>Quiz Name: {{ quiz.name }}</h2>
                <h3>Instruction: {{ quiz.instructions }}</h3>
                <h4>Duration: {{ quiz.duration }} minutes.</h4>
              </div>

              <student-quizzes-ress :quizId="quiz.id"></student-quizzes-ress>
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
.quizzes-info {
  padding: 10px;
  background: orange;
}

.st-quiz-det {
  padding: 14px;
  color: cornflowerblue;
}

.quizzes {
  background: rgb(3, 3, 39);
  padding: 8px;
  margin: 10px;
}

.no-quizzes {
  margin: 20px;
  padding: 20px;
  background: red;
}
</style>