<template>
  <div class="question-details">
    <div class="question">
      <form @submit.prevent="handleSubmit">
        <h2>Question {{ questionIndex + 1 }}.</h2>
        <textarea
          rows="2"
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

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    const handleSubmit = async () => {
      console.log(question.value)
      await editById("questions", props.questionId, question.value);
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
  padding: 20px;
  border: 2px solid indigo;
  border-radius: 10px;
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