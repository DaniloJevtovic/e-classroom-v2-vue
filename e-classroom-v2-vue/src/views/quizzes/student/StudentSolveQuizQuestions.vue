<template>
  <div class="question-details">
    <div class="question">
      <h2>Question: {{ question.question }}</h2>
      <h3>Points: {{ question.points }}</h3>
    </div>
    <div class="answers" v-for="(answer, index) in answers" :key="answer.id">
      <label class="answer">
        <!-- {{ index + 1 }}. {{ answer.answer }} -->
        <input type="checkbox" @change="selectAnswer($event, answer)" />
        <span class="checkmark"></span>{{ index + 1 }}. {{ answer.answer }}
      </label>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRoute } from "vue-router";

export default {
  props: ["questionId", "stRes"],
  setup(props, context) {
    const { getById, getSubItems, save, deleteByMultipleIds } = useCRUD();
    const route = useRoute();

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
      console.log(route.query.stRes);
      getQuestion();
      getAnswersForQuestion();
    });

    const selectAnswer = async (event, answer) => {
      console.log(event.target.checked);
      console.log(answer.id);

      if (event.target.checked) {
        //pozovi na bekendu cuvanje odgovora

        console.log("stres", props.stRes);
        let newAnswer = {
          questionId: answer.question.id,
          stQuizResId: props.stRes,
          answerId: answer.id,
        };
        const res = await save("stAnswers", newAnswer);
        console.log("dodao odgovor", res);
      } else {
        //pozovi na bekendu brisanje odgovora

        console.log(props.stRes, answer.id);

        await deleteByMultipleIds(
          "stAnswers",
          "res",
          props.stRes,
          "ans",
          answer.id
        );
        console.log("obrisao odgovor");
      }
    };

    return { question, answers, selectAnswer };
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

.answer {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.answer input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.answer:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.answer input:checked ~ .checkmark,
.answer {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.answer input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.answer .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>