<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h2>New Teacher</h2>
        <input
          type="email"
          v-model="newTeacher.email"
          placeholder="email"
          required
        />
        <input
          type="text"
          v-model="newTeacher.username"
          placeholder="username"
          required
        />
        <input
          type="text"
          v-model="newTeacher.firstName"
          placeholder="First name"
          required
        />
        <input
          type="text"
          v-model="newTeacher.lastName"
          placeholder="Last name"
          required
        />
        <input
          type="text"
          v-model="newTeacher.subjects"
          placeholder="subjects/interests"
          required
        />

        <button>Save</button>
        <button @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup(props, context) {
    const { save } = useCRUD();
    const router = useRouter();

    const newTeacher = reactive({
      email: "",
      username: "",
      password: "123",
      firstName: "",
      lastName: "",
      subjects: "",
    });

    const handleSubmit = async () => {
      let res = await save("teachers", newTeacher, false, true);

      context.emit("dodajUListu", res);
      closeModal();
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { newTeacher, handleSubmit, closeModal };
  },
};
</script>

<style>
</style>