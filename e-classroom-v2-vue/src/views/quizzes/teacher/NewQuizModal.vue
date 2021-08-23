<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>New Quiz</h3>

        <input type="text" v-model="newQuiz.name" placeholder="name" required />
        <textarea
          rows="5"
          v-model="newQuiz.instructions"
          placeholder="instructions"
        ></textarea>
        <input
          type="number"
          v-model="newQuiz.duration"
          placeholder="duration"
          required
        />
        <button>Create</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  setup(props, context) {
    const { save } = useCRUD();
    const router = useRouter();

    const newQuiz = reactive({
      name: "",
      instructions: "",
      duration: "",
      courseId: props.id,
    });

    const handleSubmit = async () => {
      const res = await save("quizzes", newQuiz, false, true);

      context.emit("dodajUListu", res);
      closeModal();
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };
    return { newQuiz, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
/* form {
 min-width: 80%;
} */
</style>