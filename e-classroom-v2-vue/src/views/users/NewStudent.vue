<template>
  <form @submit.prevent="handleSubmit">
    <h2>New Student</h2>
    <input
      type="email"
      v-model="newStudent.email"
      placeholder="email"
      required
    />
    <input
      type="text"
      v-model="newStudent.username"
      placeholder="username"
      required
    />
    <input
      type="text"
      v-model="newStudent.firstName"
      placeholder="First name"
      required
    />
    <input
      type="text"
      v-model="newStudent.lastName"
      placeholder="Last name"
      required
    />

    <select name="stClasses" v-model="newStudent.stClassId" required>
      <option disabled value="">Select student class</option>
      <option v-for="stClass in stClasses" :key="stClass" :value="stClass.id">
        {{ stClass.name }} - ({{ stClass.schoolClass.name }} - razred)
      </option>
    </select>

    <button>Save</button>
    <router-link :to="{ name: 'AllStudents' }">
      <button>Cancel</button>
    </router-link>
  </form>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../composables/useCRUD.js";

export default {
  setup() {
    const { save, getAll } = useCRUD();
    const router = useRouter();

    const newStudent = reactive({
      email: "",
      username: "",
      password: "123",
      firstName: "",
      lastName: "",
      stClassId: "",
    });

    const stClasses = ref([]);
    const loadStClasses = async () => {
      stClasses.value = await getAll("stClasses");
    };

    onMounted(loadStClasses);

    const handleSubmit = async () => {
      //console.log(newStudent);
      await save("students", newStudent);
      router.push({ name: "AllStudents" });
    };

    return { newStudent, stClasses, handleSubmit };
  },
};
</script>

<style>
</style>