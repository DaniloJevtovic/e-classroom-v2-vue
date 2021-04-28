<template>
  <form @submit.prevent="handleSubmit">
    <h2>Edit Question</h2>
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["questionId"],
  setup(props) {
    const { getById, editById } = useCRUD();
    const router = useRouter();

    const question = ref("");

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    onMounted(getQuestion);

    const handleSubmit = async () => {
      await editById("questions", props.questionId, question.value);
      console.log(question.value);
      //router.push({ name: "QuizDetails", params: { quizId: props.quizId } });
      router.go(-1);
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