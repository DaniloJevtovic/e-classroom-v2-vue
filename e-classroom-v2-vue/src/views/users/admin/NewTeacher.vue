<template>
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
    <router-link :to="{ name: 'AllTeachers' }">
      <button>Cancel</button>
    </router-link>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
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
      //console.log(newTeacher);
      await save("teachers", newTeacher);
      router.push({ name: "AllTeachers" });
    };

    return { newTeacher, handleSubmit };
  },
};
</script>

<style>
</style>