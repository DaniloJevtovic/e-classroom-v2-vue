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

        <button @click.prevent="addNewAnswer">New Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import AnswerDetails from "./AnswerDetails.vue";

export default {
  props: ["questionId"],
  components: { AnswerDetails },
  setup(props) {
    const { getSubItems, save } = useCRUD();

    const answers = ref([]);

    const getAnswersForQuestion = async () => {
      answers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );
    };

    //dodaje prazan odgovor na bekend i u listu odgovora
    const addNewAnswer = async () => {
      let res = await save("answers", {
        answer: "",
        correct: "",
        questionId: props.questionId,
      });
      answers.value.push(res);
    };

    // brisanje odgovora iz liste - brisanje na bekendu je u child komponenti - AnswerDetails
    const deleteAnswer = async (id) => {
      let index = answers.value.findIndex((answer) => answer.id === id);
      answers.value.splice(index, 1);
    };

    onMounted(() => {
      getAnswersForQuestion();
    });

    return {
      answers,
      addNewAnswer,
      deleteAnswer,
    };
  },
};
</script>

<style scoped>
.answers {
  background: rgb(157, 255, 0);
}
</style>