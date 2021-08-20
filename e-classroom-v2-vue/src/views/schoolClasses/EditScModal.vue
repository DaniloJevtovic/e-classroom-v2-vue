<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3 style="color: hotpink">Edit School Class</h3>
        <input
          type="text"
          v-model="scToEdit.name"
          placeholder="name"
          required
        />
        <textarea
          rows="4"
          v-model="scToEdit.description"
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
import useCRUD from "../../composables/useCRUD.js";

export default {
  props: ["sc"],
  setup(props, context) {
    // vodi racuna da u setup() metodi prvi parametar mora biti props
    // pa tek onda moze context!!!
    const { editById } = useCRUD();

    const scToEdit = reactive({
      name: props.sc.name,
      description: props.sc.description,
    });

    const handleSubmit = async () => {
      let res = await editById("scClasses", props.sc.id, scToEdit, false, true);

      if (res.status != 400) {
        //update u roditeljskoj komponenti - nekako sirotinjski :/
        props.sc.name = scToEdit.name;
        props.sc.description = scToEdit.description;
        closeModal();
      }
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { scToEdit, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
</style>