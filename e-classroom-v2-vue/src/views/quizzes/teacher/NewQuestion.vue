<template>
  <form @submit.prevent="handleSubmit">
    <h2>New Question</h2>
    <textarea
      rows="8"
      v-model="question.question"
      placeholder="enter question"
      required
    >
    </textarea>
    <input
      type="number"
      v-model="question.points"
      placeholder="points"
      required
    />
    <button>Save</button>
  </form>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["quizId"],
  setup(props) {
    const { save } = useCRUD();
    const router = useRouter();

    const question = reactive({
      question: "",
      points: "",
      quizId: props.quizId,
    });

    const handleSubmit = async () => {
      await save("questions", question, false, true);
      console.log(question);
      router.push({ name: "QuizDetails", params: { quizId: props.quizId } });
    };
    return { question, handleSubmit };
  },
};
</script>

<style scoped>
form {
  background: cyan;
  max-width: 500px;
}
</style>