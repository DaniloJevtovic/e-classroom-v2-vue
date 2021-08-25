<template>
  <div>
    <div class="answers">
      <div>
        <div v-for="(answer, index) in answers" :key="answer.id">
          <!-- saljem kompletan odgovor - kako se u drugoj komponenti ne bi morao obracati bekendu -->
          <answer-details
            :answer="answer"
            :answerIndex="index"
            @delAnsFromList="deleteAnswer"
          ></answer-details>
        </div>
      </div>
      <button
        v-if="question.questionType === 'MULTIPLE_CHOICE'"
        @click.prevent="addNewAnswer"
      >
        New Answer
      </button>
      <button>Save All Answers</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import AnswerDetails from "./AnswerDetails.vue";

export default {
  props: ["questionId"],
  components: { AnswerDetails },
  setup(props) {
    const { getSubItems, save, getById } = useCRUD();

    const question = ref("");
    const answers = ref([]);

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    computed(() => {
      getQuestion();
    });

    const getAnswersForQuestion = async () => {
      answers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );

      // da budu disablovani dugmici - da ne cuva svaki put - smisli pametnije malo
      answers.value.forEach((answer) => {
        answer.disabled = true;
      });
    };

    //dodaje prazan odgovor na bekend i u listu odgovora
    const addNewAnswer = async () => {
      let res = await save("answers", {
        answer: "",
        correct: "",
        questionId: props.questionId,
      });

      res.disabled = true;

      answers.value.push(res);
    };

    // brisanje odgovora iz liste - brisanje na bekendu je u child komponenti - AnswerDetails
    const deleteAnswer = async (id) => {
      let index = answers.value.findIndex((answer) => answer.id === id);
      answers.value.splice(index, 1);
    };

    onMounted(() => {
      getQuestion();
      getAnswersForQuestion();
    });

    return {
      question,
      answers,
      addNewAnswer,
      deleteAnswer,
    };
  },
};
</script>

<style scoped>
.answers {
  background: rgb(21, 192, 214);
}
</style>