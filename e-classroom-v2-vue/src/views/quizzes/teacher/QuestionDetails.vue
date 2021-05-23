<template>
  <div class="question-details">
    <div class="question">
      <h2>Question: {{ question.question }}</h2>
      <h3>Points: {{ question.points }}</h3>
      <p>Type: {{ question.questionType }}</p>
      <!-- <router-link
        :to="{ name: 'NewAnswer', params: { questionId: questionId } }"
      >
        <button>New Answer</button>
      </router-link> -->

      <!-- u zavisnosti od tipa pitanja prikazace se jedno od ova 3 -->
      <!-- <button
        v-if="question.questionType == 'MULTIPLE_CHOICE'"
        @click.prevent="addNewAnswer"
      >
        Newww Answer
      </button> -->

      <router-link :to="{ name: 'EditQuestion', params: { questionId } }">
        <button>Edit</button>
      </router-link>

      <button @click="deleteQuestion(questionId)">Delete</button>
    </div>

    <div class="answers">
      <div v-for="(answer, index) in answers" :key="answer.id">
        <!-- <div class="ans">
          {{ index + 1 }}. {{ answer.answer }} -

          <span style="color: green" v-if="answer.correct">&#10004;</span>
          <span style="color: red" v-else>&#10007;</span>

          <router-link
            :to="{
              name: 'EditAnswer',
              params: { questionId, answerId: answer.id },
            }"
          >
            <button>Edit</button>
          </router-link>

          <button @click="deleteAnswer(answer.id)">Delete</button>
        </div> -->

        <div class="ans2">
          <h2>{{ index + 1 }}.</h2>
          <span />

          <input type="text" v-model="answer.answer" />

          <!-- <label for="checkbox">Tacno?</label> -->

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

      <button
        v-if="question.questionType == 'MULTIPLE_CHOICE'"
        @click.prevent="addNewAnswer"
      >
        New Answer
      </button>

      <div v-else-if="question.questionType == 'TRUE_FALSE'">
        <input type="text" placeholder="correct" />
        <input type="text" placeholder="not correct" />
        <button>Save</button>
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

input[type="checkbox"] {
  width: 50px;
}

input[type="text"] {
  margin: 10px;
}

.ch {
  background: saddlebrown;
  margin: 0px;
}

.correct-div {
  display: flex;
  align-items: center;
  margin: 0px;
}

.new-ans-form-div {
  background: aqua;
  margin: 30px;
  padding: 10px;
}
</style>