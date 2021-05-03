<template>
  <div class="quizzes-info">
    <h1>Quizzes</h1>

    <div class="basic-grid">
      <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
        <h2>Quiz Name: {{ quiz.name }}</h2>
        <h3>Instruction: {{ quiz.instructions }}</h3>
        <h4>Duration: {{ quiz.duration }} minutes.</h4>
        <router-link
          :to="{ name: 'StudentQuizDetails', params: { id: id, quizId: quiz.id } }"
        >
          <button>details</button>
        </router-link>


      </div>
    </div>
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
.quizzes-info {
  padding: 10px;
  background: orange;
}

.quizzes {
  background: rgb(11, 11, 65);
  color: springgreen;
  border: 5px solid pink;
  padding: 8px;
}
</style>