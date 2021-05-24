<template>
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

    <select>
      <option value="Select status">Status</option>
    </select>
    </div>

    <button>Save</button>
    <button @click.prevent="deleteQuiz(quiz.course.id)">Delete</button>
  </form>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  props: ["quizId"],
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
.status-duration {
  display: flex;
  gap: 1rem;
}

form {
  background: red;
  min-width: 10%;
}

</style>