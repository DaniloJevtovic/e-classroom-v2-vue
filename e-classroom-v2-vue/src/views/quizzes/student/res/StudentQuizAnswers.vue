<template>
  <div class="st-quest-answers">
    <div class="res-answers">
      <div v-for="answer in quizAnswers" :key="answer.id">
        <div class="res-ans">
          <h2>
            {{ answer.answer }} -
            <span style="color: cyan" v-if="answer.correct">&#10004;</span>
            <span style="color: red" v-else>&#10007;</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="res-st-answers">
      <h2>Student answers</h2>
      <div v-for="stAnswer in studentAnswers" :key="stAnswer.id">
        <div class="st-ans">
          <h2>
            {{ stAnswer.answer.answer }} -
            <span style="color: green" v-if="stAnswer.answer.correct"
              >&#10004;</span
            >
            <span style="color: red" v-else>&#10007;</span>
          </h2>
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
}

.res-answers {
  background: springgreen;
  padding: 8px;
  margin: 10px;
}

.res-ans {
  color: rgb(168, 236, 202);
  background: rgb(67, 6, 75);
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

.st-ans {
  color: springgreen;
  background: black;
  margin: 10px;
  padding: 3px;
}

/* h2 {
  background: palegoldenrod;
} */
</style>