<template>
  <div class="container">
    <div class="container-header">
      <h3>Details</h3>
      <button @click="$router.go(-1)">Back</button>
    </div>
    <div class="container-body">
      <h3>Name: {{ quizInfo.name }}</h3>
      <h3>Instructions: {{ quizInfo.instructions }}</h3>
      <h3>Duration: {{ quizInfo.duration }}</h3>
      <hr />

      <h3>Questions</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById } = useCRUD();
    const quizInfo = ref("");

    const getQuiz = async () => {
      quizInfo.value = await getById("quizzes", props.id);
    };

    onMounted(() => {
      getQuiz();
    });

    return { quizInfo };
  },
};
</script>

<style>
</style>