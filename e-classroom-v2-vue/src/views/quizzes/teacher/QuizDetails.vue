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
            rows="3"
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
      <questions-list :quizId="quizId"></questions-list>
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
  display: flex;
  gap: 1rem;
}

form {
  background: indigo;
  max-width: 100%;
  color: cyan;
}
</style>