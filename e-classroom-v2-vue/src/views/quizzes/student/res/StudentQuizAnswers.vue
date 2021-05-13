<template>
  <div class="st-quest-answers">
    <div class="res-answers">
      <div v-for="answer in quizAnswers" :key="answer.di">
        <h2>{{ answer.answer }} - {{ answer.correct }}</h2>
      </div>
    </div>
    <div class="res-st-answers">
      <h4>Your answers</h4>
      <div v-for="stAnswer in studentAnswers" :key="stAnswer.id">
        {{ stAnswer.answer.answer }} - {{ stAnswer.answer.correct }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["questionId", "resId"],
  setup(props) {
    const { getSubItems, getSubSubItems } = useCRUD();

    const quizAnswers = ref([]);
    const studentAnswers = ref([]);

    //odgovori za pitanje
    const getAnswersForQuestion = async () => {
      quizAnswers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );
    };

    //odgovori koje je ucenik oznacio kao "tacne"
    const getStAnswersForQuestion = async () => {
      studentAnswers.value = await getSubSubItems(
        "stAnswers",
        "stQuizRes",
        "question",
        props.resId,
        props.questionId
      );
    };

    onMounted(() => {
      getAnswersForQuestion();
      getStAnswersForQuestion();
    });

    return { quizAnswers, studentAnswers };
  },
};
</script>

<style scoped>
.st-quest-answers {
  border: 1px solid black;
  border-radius: 3px;
}

.res-answers {
  background: springgreen;
  margin: 10px;
}

.res-st-answers {
  background: indigo;
  color: aliceblue;
  padding: 8px;
  border: 3px solid hotpink;
  border-radius: 10px;
  margin: 10px;
}
h2 {
  background: palegoldenrod;
}
</style>