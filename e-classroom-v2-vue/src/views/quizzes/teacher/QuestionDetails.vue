<template>
  <div class="answers" v-for="(answer, index) in answers" :key="answer.id">
    {{ index + 1 }}. {{ answer.answer }} - corect? - {{ answer.correct }}
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["questionId"],
  setup(props) {
    const { getSubItems } = useCRUD();
    const answers = ref([]);

    const getAnswersForQuestion = async () => {
      answers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );
    };

    onMounted(getAnswersForQuestion);

    return { answers };
  },
};
</script>

<style>
.answers {
  background: yellow;
}
</style>