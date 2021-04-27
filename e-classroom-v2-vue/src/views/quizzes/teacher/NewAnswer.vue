<template>
  <form @submit.prevent="handleSubmit">
    <!-- <h2>New Answer</h2> -->
    <h2>Question: {{ question.question }}</h2>
    <input type="text" v-model="answer.answer" placeholder="answer" />

    <label for="checkbox">Tacno?</label>
    <input
      type="checkbox"
      id="checkbox"
      v-model="answer.correct"
      placeholder="tacno?"
    />

    <button>Save</button>
  </form>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  props: ["questionId"],
  setup(props) {
    const { getById, save } = useCRUD();
    const router = useRouter();

    const question = ref("");

    const answer = reactive({
      answer: "",
      correct: "",
      questionId: props.questionId,
    });

    const loadQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    onMounted(loadQuestion);

    const handleSubmit = async () => {
      console.log(answer);
      await save("answers", answer);
      router.go(-1);
    };

    return { question, answer, handleSubmit };
  },
};
</script>

<style scoped>
label {
  display: block;
  text-align: center;
  line-height: 150%;
}

form {
  background: blue;
}
</style>