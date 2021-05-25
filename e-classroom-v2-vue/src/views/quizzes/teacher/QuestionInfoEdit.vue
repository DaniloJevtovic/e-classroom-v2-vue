<template>
  <form @submit.prevent="handleSubmit">
    <h2>Question Info</h2>
    <textarea
      rows="8"
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

      <select>
        <option value="type">Select type</option>
      </select>
    </div>

    <button>Save</button>
    <button @click.prevent="deleteQuestion(questionId)">Delete</button>
  </form>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["questionId"],
  setup(props, context) {
    const { getById, editById, deleteById } = useCRUD();
    const router = useRouter();

    const question = ref("");

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    onMounted(getQuestion);

    const handleSubmit = async () => {
      await editById("questions", props.questionId, question.value);
      console.log(question.value);
      //router.push({ name: "QuizDetails", params: { quizId: props.quizId } });
      //router.go(-1);
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

    return { question, handleSubmit, deleteQuestion };
  },
};
</script>

<style scoped>
form {
  background: cyan;
  max-width: 90%;
}

.points-type {
  display: flex;
  gap: 1rem;
}
</style>