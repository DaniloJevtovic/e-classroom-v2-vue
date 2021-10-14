<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>New School Class</h3>
        <input
          type="text"
          v-model="newScClass.name"
          placeholder="name"
          required
        />
        <textarea
          rows="4"
          v-model="newScClass.description"
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
import { useRouter } from "vue-router";
import useCRUD from "../../composables/useCRUD.js";
import { useToast } from "vue-toastification";

export default {
  setup(props, context) {
    // vodi racuna da u setup() metodi prvi parametar mora biti props
    // pa tek onda moze context!!!
    const { save } = useCRUD();
    const router = useRouter();
    const toast = useToast();

    const newScClass = reactive({ name: "", description: "" });

    const handleSubmit = async () => {
      let res = await save("scClasses", newScClass, false, true);

      if (res.status != 400) {
        context.emit("dodajUListu", res);
        closeModal();
      }
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { newScClass, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
</style>