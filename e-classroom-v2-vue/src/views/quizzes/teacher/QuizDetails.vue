<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to quizzes</button>
    </div>
    <div class="container-body">
      <div class="quiz-info">
        <form @submit.prevent="handleSubmit">
          <h2>Quiz details</h2>
          <input type="text" v-model="quiz.name" placeholder="name" required />
          <textarea
            rows="7"
            v-model="quiz.instructions"
            placeholder="instructions"
          ></textarea>

          <div class="status-duration">
            <input
              type="number"
              v-model="quiz.duration"
              placeholder="duration"
              required
            />

            <div style="color: darkblue">
              points: {{ quiz.totalPoints }}
            </div>

            <select v-model="quiz.quizStatus" required>
              <option value="INACTIVE">Inactive</option>
              <option value="ACTIVE">Active</option>
              <option value="FINISHED">Finished</option>
              <option value="DELETED">Deleted</option>
            </select>
          </div>

          <button>Save</button>
          <!-- <button @click.prevent="deleteQuiz(quiz.course.id)">Delete</button> -->
        </form>
      </div>

      <!-- lista pitanja za kviz -->

      <div class="questions-scroll">
        <questions-list :quizId="quizId"></questions-list>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

import QuestionsList from "./QuestionsList.vue";

export default {
  props: ["quizId"],
  components: { QuestionsList },
  setup(props) {
    const { getById, editById, deleteById } = useCRUD();
    const router = useRouter();

    const quiz = ref("");

    const getQuiz = async () => {
      quiz.value = await getById("quizzes", props.quizId);
    };

    onMounted(getQuiz);

    const handleSubmit = async () => {
      console.log(quiz.value);
      await editById("quizzes", props.quizId, quiz.value);

      router.push({ name: "QuizDetails", params: { quizId: props.quizId } });
    };

    const deleteQuiz = async (courseId) => {
      await deleteById("quizzes", props.quizId);
      router.push({ name: "MyCourseDetails", params: { id: courseId } });
    };

    return { quiz, handleSubmit, deleteQuiz };
  },
};
</script>

<style scoped>
.quiz-info {
  padding: 5px;
  border: 2px solid darkblue;
  background: blue;
  border-radius: 3px;
}

.status-duration {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  align-items: center;
}

form {
  background: white;
  max-width: 100%;
}

.container-body {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: start;
}

.questions-scroll {
  max-height: 500px;
  overflow: auto;
}
/* scrollbar style */
::-webkit-scrollbar {
  width: 14px;
}
::-webkit-scrollbar-track {
  background-color: #ffffff;
  border-radius: 9px;
}
::-webkit-scrollbar-thumb {
  background-color: #183588;
  border-radius: 9px;
}
</style>