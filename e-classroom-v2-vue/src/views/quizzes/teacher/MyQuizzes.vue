<template>
  <div class="quizzes-info">
    <h2>Quizzes</h2>

    <input type="text" placeholder="search" />

    <router-link :to="{ name: 'NewQuiz', params: { id } }">
      <button>New Quiz</button>
    </router-link>
  </div>

  <!-- <div class="te-quizzes">
    <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
      <router-link
        :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
      >
        <div class="singlee-quiz">
          <h2>Name: {{ quiz.name }}</h2>
          <h3>Instruction: {{ quiz.instructions }}</h3>
          <h4>Duration: {{ quiz.duration }} minutes.</h4>
          <h4 style="color: indigo; background: cyan">
            Status: {{ quiz.quizStatus }}
          </h4>

          <router-link
            :to="{ name: 'ProfResForQuiz', params: { quizId: quiz.id } }"
          >
            <button>See Results</button>
          </router-link>
        </div>
      </router-link>
    </div>
  </div> -->

  <div>
    <table>
      <thead>
        <td>Num</td>
        <td>Name</td>
        <td>Instructions</td>
        <td>Duration</td>
        <td>Total points</td>
        <td>Status</td>
        <td>Details</td>
      </thead>
      <tr v-for="(quiz, index) in quizzes" :key="quiz.id">
        <td>{{ index + 1 }}.</td>
        <td>{{ quiz.name }}</td>
        <td>{{ quiz.instructions }}</td>
        <td>{{ quiz.duration }} min</td>
        <td>{{ quiz.totalPoints }}</td>
        <td>{{ quiz.quizStatus }}</td>
        <td>
          <router-link
            :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
          >
            <button>details</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
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
.te-quizzes {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.quizzes-info {
  padding: 5px;
  background: rgb(240, 231, 240); 
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

.quizzes {
  background: springgreen;
  color: white;
  padding: 8px;
}

.singlee-quiz {
  background: rgb(24, 46, 168);
  color: white;
  padding: 5px;
  border-radius: 10px;
}

input {
  margin: 0px;
}
</style>