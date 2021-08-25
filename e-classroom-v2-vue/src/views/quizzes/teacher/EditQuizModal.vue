<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>Edit quiz</h3>
        <input
          type="text"
          v-model="quizToEdit.name"
          placeholder="name"
          required
        />
        <textarea
          rows="4"
          v-model="quizToEdit.instructions"
          placeholder="instructions"
        ></textarea>

        <div class="status-duration">
          <input
            type="number"
            v-model="quizToEdit.duration"
            placeholder="duration"
            required
            min="1"
          />

          <select v-model="quizToEdit.quizStatus" required>
            <option value="INACTIVE">Inactive</option>
            <option value="ACTIVE">Active</option>
            <option value="FINISHED">Finished</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>

        <button>Save</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["quiz"],
  setup(props, context) {
    const { editById } = useCRUD();
    const quizToEdit = reactive({
      name: props.quiz.name,
      instructions: props.quiz.instructions,
      duration: props.quiz.duration,
      quizStatus: props.quiz.quizStatus,
    });

    const handleSubmit = async () => {
      let res = await editById(
        "quizzes",
        props.quiz.id,
        quizToEdit,
        false,
        true
      );

      if (res.status != 400) {
        //update u roditeljskoj komponenti - nekako sirotinjski :/
        props.quiz.name = quizToEdit.name;
        props.quiz.instructions = quizToEdit.instructions;
        props.quiz.duration = quizToEdit.duration;
        props.quiz.quizStatus = quizToEdit.quizStatus;

        closeModal();
      }
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { quizToEdit, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
.backdrop {
  background: rgba(77, 240, 186, 0.7);
}

.status-duration {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1rem;
}
</style>