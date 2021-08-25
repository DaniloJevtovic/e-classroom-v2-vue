<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>New Question</h3>
        <textarea
          rows="8"
          v-model="question.question"
          placeholder="enter question"
          required
        >
        </textarea>
        <input
          type="number"
          v-model="question.points"
          placeholder="points"
          required
        />

        <select v-model="question.questionType" required>
          <option disabled value="">Select question type</option>
          <option value="MULTIPLE_CHOICE">Multiple choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="FILL">Fill</option>
        </select>

        <button>Save</button>
        <button @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { reactive } from "vue";

export default {
  props: ["quizId"],
  setup(props, context) {
    const { save } = useCRUD();

    const question = reactive({
      question: "",
      points: "",
      quizId: props.quizId,
    });

    const handleSubmit = async () => {
      let res = await save("questions", question, false, true);
      context.emit("dodajUListu", res);

      closeModal();
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { question, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
form {
  background: rgba(11, 248, 248, 0.644);
  max-width: 500px;
}
</style>