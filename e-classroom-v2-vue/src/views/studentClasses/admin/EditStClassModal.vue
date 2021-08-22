<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>Edit Student Class</h3>

        <input
          type="text"
          v-model="editStClass.name"
          placeholder="name"
          required
        />
        <textarea
          rows="4"
          v-model="editStClass.description"
          placeholder="description"
          required
        >
        </textarea>
        <button>Save</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["stClass"],
  setup(props, context) {
    const { editById } = useCRUD();

    const editStClass = reactive({
      name: props.stClass.name,
      description: props.stClass.description,
      scClassId: props.stClass.schoolClass.id,
    });

    const handleSubmit = async () => {
      let res = await editById(
        "stClasses",
        props.stClass.id,
        editStClass,
        false,
        true
      );

      if (res.status != 400) {
        props.stClass.name = editStClass.name;
        props.stClass.description = editStClass.description;
        closeModal();
      }
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { editStClass, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
.backdrop {
  background: rgba(33, 235, 134, 0.5);
}
</style>