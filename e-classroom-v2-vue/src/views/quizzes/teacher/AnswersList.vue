<template>
  <div>
    <div class="answers">
      <div>
        <div v-for="(answer, index) in answers" :key="answer.id">
          <div
            v-if="answer.question.questionType == 'MULTIPLE_CHOICE'"
            class="ans2"
          >
            <h2>{{ index + 1 }}.</h2>
            <span />

            <input type="text" v-model="answer.answer" />

            <input
              type="checkbox"
              id="checkbox"
              v-model="answer.correct"
              placeholder="tacno?"
            />

            <button @click.prevent="updateAnswer(answer)">Save changes</button>

            <button @click.prevent="deleteAnswer(answer.id)">
              Delete answer
            </button>
          </div>

          <div v-else-if="question.questionType == 'TRUE_FALSE'" class="ans2">
            <h2>{{ index + 1 }}.</h2>
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

        <button @click.prevent="addNewAnswer">New Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  props: ["questionId"],
  setup(props) {
    const { getById, getSubItems, deleteById, save, editById } = useCRUD();

    const answers = ref([]);

    const getAnswersForQuestion = async () => {
      answers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );
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
      getAnswersForQuestion();
    });

    return {
      answers,
      deleteAnswer,
      addNewAnswer,
      updateAnswer,
      updateTrueFalseAnswer,
    };
  },
};
</script>

<style scoped>
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
</style>