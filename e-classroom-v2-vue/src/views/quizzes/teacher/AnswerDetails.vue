<template>
  <div class="answer-details">
    <div v-if="answer.question.questionType == 'MULTIPLE_CHOICE'" class="ans2">
      <h2>{{ answerIndex + 1 }}.</h2>
      <span />

      <input type="text" v-model="answer.answer" />

      <input
        type="checkbox"
        id="checkbox"
        v-model="answer.correct"
        placeholder="tacno?"
      />

      <button @click.prevent="updateAnswer(answer)">Save changes</button>
      <button @click.prevent="deleteAnswer(answer.id)">Delete answer</button>
    </div>

    <div v-else-if="answer.question.questionType == 'TRUE_FALSE'" class="ans2">
      <h2>{{ answerIndex + 1 }}.</h2>
      <span />

      <input type="text" v-model="answer.answer" />

      <span style="color: cyan" v-if="answer.correct">&#10004;</span>
      <span style="color: red" v-else>&#10007;</span>
      <button @click.prevent="updateTrueFalseAnswer(answers)">
        Save changes
      </button>
    </div>

    <div v-else></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["answer", "answerIndex"],
  setup(props, context) {
    const { deleteById, editById } = useCRUD();

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

    const deleteAnswer = async (id) => {
      if (confirm("Da li ste sigurni da zelite obrisati odgovor?")) {
        await deleteById("answers", id); //brisanje na bekendu

        context.emit("delAnsFromList", id); //brisanje iz liste u roditeljskoj komponenti
      }
    };
    return { updateAnswer, updateTrueFalseAnswer, deleteAnswer };
  },
};
</script>

<style scoped>
.ans2 {
  padding: 5px;
  background: rgb(4, 40, 82);
  color: cyan;
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
</style>