<template>
  <div class="question-details">
    <div class="question">
      <h2>Question: {{ question.question }}</h2>
      <h3>Points: {{ question.points }}</h3>
      <router-link
        :to="{ name: 'NewAnswer', params: { questionId: questionId } }"
      >
        <button>New Answer</button>
      </router-link>

      <button>Edit</button>
      <button>Delete</button>
    </div>
    <div class="answers" v-for="(answer, index) in answers" :key="answer.id">
      {{ index + 1 }}. {{ answer.answer }} - corect? - {{ answer.correct }}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["questionId"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();

    const question = ref("");

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    const answers = ref([]);

    const getAnswersForQuestion = async () => {
      answers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );
    };

    onMounted(() => {
      getQuestion();
      getAnswersForQuestion();
    });

    return { question, answers };
  },
};
</script>

<style>
.question-details {
  padding: 20px;
  border: 2px solid indigo;
  border-radius: 10px;
}

.question {
  background: cyan;
}
.answers {
  background: yellow;
}
</style>