<template>
  <div class="st-quest-answers">
    <!-- tacni - neatacni odgovori kviza -->
    <div class="res-answers">
      <h3>Correct/incorect answers</h3>
      <div v-for="answer in quizAnswers" :key="answer.id">
        <div class="res-ans">
          <h3>
            {{ answer.answer }} -
            <span style="color: cyan" v-if="answer.correct">&#10004;</span>
            <span style="color: red" v-else>&#10007;</span>
          </h3>
        </div>
      </div>
    </div>

    <!-- odgovori koje je ucenik oznacio -->
    <div class="res-st-answers">
      <h3>Student answers</h3>
      <div v-for="stAnswer in studentAnswers" :key="stAnswer.id">
        <div class="st-ans">
          <h3>
            {{ stAnswer.answer.answer }} -
            <span style="color: green" v-if="stAnswer.answer.correct"
              >&#10004;</span
            >
            <span style="color: red" v-else>&#10007;</span>
          </h3>
        </div>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.res-answers {
  background: rgb(235, 231, 12);
  padding: 8px;
  margin: 10px;
}

.res-ans {
  color: rgb(0, 12, 6);
  background: rgb(15, 167, 238);
  margin: 10px;
}

.res-st-answers {
  background: rgb(20, 21, 37);
  color: rgb(255, 4, 4);
  padding: 8px;
  margin: 10px;
}

.st-ans {
  color: cyan;
  background: darkblue;
  margin: 10px;
  /* padding: 3px; */
}
</style>