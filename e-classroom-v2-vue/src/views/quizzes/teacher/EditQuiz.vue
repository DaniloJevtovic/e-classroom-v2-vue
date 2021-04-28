<template>
  <form @submit.prevent="handleSubmit">
    <h2>Edit Quiz</h2>
    <input type="text" v-model="quiz.name" placeholder="name" required />
    <textarea
      rows="3"
      v-model="quiz.instructions"
      placeholder="instructions"
    ></textarea>
    <input
      type="number"
      v-model="quiz.duration"
      placeholder="duration"
      required
    />
    <button>Save</button>
  </form>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  props: ["quizId"],
  setup(props) {
    const { getById, editById } = useCRUD();
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
    return { quiz, handleSubmit };
  },
};
</script>

<style>
</style>