<template>
  <div class="question-details">
    <div class="question">
      <form @submit.prevent="handleSubmit">
        <h3>Question {{ questionIndex + 1 }}.</h3>
        <textarea
          rows="1"
          v-model="question.question"
          placeholder="enter question"
          required
        >
        </textarea>

        <div class="points-type">
          <input
            type="number"
            v-model="question.points"
            placeholder="points"
            required
          />

          <select v-model="question.questionType" required>
            <option value="MULTIPLE_CHOICE">Multiple choice</option>
            <option value="TRUE_FALSE">True / False</option>
            <option value="FILL">Fill</option>
          </select>
        </div>

        <button>Save</button>
        <button @click.prevent="deleteQuestion(questionId)">Delete</button>
      </form>
    </div>

    <!-- lista odgovora za pitanje -->
    <answers-list :questionId="questionId"></answers-list>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import AnswersList from "./AnswersList.vue";

export default {
  props: ["questionId", "questionIndex"],
  components: { AnswersList },
  setup(props, context) {
    const { getById, deleteById, editById } = useCRUD();

    const question = ref("");
    const oldType = ref("");

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
      oldType.value = question.value.questionType;
    };

    const handleSubmit = async () => {
      let res = await editById("questions", props.questionId, question.value);

      //ovdje bi trebalo kad se sacuvaju izmjene da ukoliko se promjeni tip pitanja
      //obrisu se predhodni odgovori. npr. ako je bio multiple choice a promjeni se na true/false
      //da se obrisu svi odgovori i kreiraju 2 nova pitanja - jedno true drugo false. ili ako je
      //odgovor da se dopuni da se obrisu svi odgovori za to pitanje

      if (oldType.value != res.questionType) {
        //brisanje odgovora ako je promjenjen tip pitanja

        //ako je tip pitanja true false kreiranje 2 nova prazna odg - jedan true drugi false
        if (res.questionType === "TRUE_FALSE") {
        }
      }

      oldType.value = res.questionType;
    };

    const deleteQuestion = async (id) => {
      if (
        confirm(
          "Da li ste sigurni da zelite obrisati pitanje?" +
            " Brisanjem pitanja brisu se i svi odgovori za pitanje!"
        )
      ) {
        await deleteById("questions", id);
        //saljem id za brisanje iz liste roditeljskoj komponenti! - quiz details
        context.emit("deleteFromList", id);
      }
    };

    onMounted(() => {
      getQuestion();
    });

    return { question, deleteQuestion, handleSubmit };
  },
};
</script>

<style scoped>
.question-details {
  padding: 5px;
  border: 2px solid indigo;
  border-radius: 4px;
  margin: 10px;
}

.question {
  background: cyan;
}

form {
  /* min-width: 90%; */
  max-width: 100%;
}

.points-type {
  display: flex;
  gap: 1rem;
}

</style>