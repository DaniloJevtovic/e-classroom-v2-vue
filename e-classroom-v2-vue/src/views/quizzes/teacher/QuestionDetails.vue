<template>
  <div class="question-details">
    <div class="question">
      <h2>Question: {{ question.question }}</h2>
      <h3>Points: {{ question.points }}</h3>
      <p>Type: {{ question.questionType }}</p>

      <router-link :to="{ name: 'EditQuestion', params: { questionId } }">
        <button>Edit</button>
      </router-link>

      <button @click="deleteQuestion(questionId)">Delete</button>
    </div>

    <div class="answers">
      <div v-if="question.questionType == 'MULTIPLE_CHOICE'">
        <div v-for="(answer, index) in answers" :key="answer.id">
          <div class="ans2">
            <h2>{{ index + 1 }}.</h2>
            <span />

            <input type="text" v-model="answer.answer" />

            <input
              type="checkbox"
              id="checkbox"
              v-model="answer.correct"
              placeholder="tacno?"
            />

            <!-- <span style="color: green" v-if="answer.correct">&#10004;</span>
          <span style="color: red" v-else>&#10007;</span> -->

            <button @click.prevent="updateAnswer(answer)">Save changes</button>

            <button @click.prevent="deleteAnswer(answer.id)">
              Delete answer
            </button>
          </div>
        </div>

        <button @click.prevent="addNewAnswer">New Answer</button>
      </div>

      <!-- ako je true false odgovor -->
      <div v-else>
        <div v-for="(answer, index) in answers" :key="answer.id">
          <div class="ans2">
            <h2>{{ index + 1 }}.</h2>
            <span />

            <input type="text" v-model="answer.answer" />

            <input
              type="radio"
              id="correct"
              :value="answer.correct"
              v-model="answer.correct"
              :checked="answer.correct"
              disabled
            />
            <label for="correct">Correct?</label>
          </div>
        </div>
        <button @click.prevent="updateTrueFalseAnswer(answers)">
          Save changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["questionId"],
  setup(props, context) {
    const { getById, getSubItems, deleteById, save, editById } = useCRUD();

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

    const deleteQuestion = async (id) => {
      if (
        confirm(
          "Da li ste sigurni da zelite obrisati pitanje?" +
            "Brisanjem pitanja brisu se i svi odgovori za pitanje!"
        )
      ) {
        await deleteById("questions", id);
        //saljem id za brisanje iz liste roditeljskoj komponenti! - quiz details
        context.emit("deleteFromList", id);
      }
    };

    const deleteAnswer = async (id) => {
      if (confirm("Da li ste sigurni da zelite obrisati odgovor?")) {
        await deleteById("answers", id);

        let index = answers.value.findIndex((answer) => answer.id === id);
        answers.value.splice(index, 1);
      }
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

    const updateAnswer = async (answer) => {
      console.log(answer);
      await editById("answers", answer.id, answer);
    };

    const updateTrueFalseAnswer = async (answers) => {
      console.log(answers);

      for (let i = 0; i < answers.length; i++) {
        updateAnswer(answers[i]);
      }
    };

    onMounted(() => {
      getQuestion();
      getAnswersForQuestion();
    });

    return {
      question,
      answers,
      deleteQuestion,
      deleteAnswer,
      addNewAnswer,
      updateAnswer,
      updateTrueFalseAnswer,
    };
  },
};
</script>

<style scoped>
.question-details {
  padding: 20px;
  border: 2px solid indigo;
  border-radius: 10px;
}

.question {
  background: cyan;
}
.answers {
  background: rgb(157, 255, 0);
}

.ans {
  background: rgb(255, 224, 50);
  margin: 3px;
}

.ans2 {
  padding: 5px;
  background: rgb(89, 133, 184);
  margin: 3px;
  display: flex;
  align-items: center;
}

input[type="checkbox"],
input[type="radio"] {
  width: 50px;
}

input[type="text"] {
  margin: 10px;
}

.correct-div {
  display: flex;
  align-items: center;
  margin: 0px;
}
</style>