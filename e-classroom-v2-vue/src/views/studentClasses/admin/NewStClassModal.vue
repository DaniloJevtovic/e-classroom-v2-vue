<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>New Student Class</h3>
        <!-- <h3>SchoolClass: {{ sc }}</h3> -->
        
        <input
          type="text"
          v-model="newStClass.name"
          placeholder="name"
          required
        />
        <textarea
          rows="4"
          v-model="newStClass.description"
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
  props: ["sc"],
  setup(props, context) {
    const { save } = useCRUD();

    const newStClass = reactive({
      name: "",
      description: "",
      scClassId: props.sc,
    });

    const handleSubmit = async () => {
      let res = await save("stClasses", newStClass, false, true);

      if (res.status != 400) {
        context.emit("dodajUListu", res);
        closeModal();
      }
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { newStClass, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
</style>