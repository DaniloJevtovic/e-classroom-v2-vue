<template>
  <form @submit.prevent="handleSubmit">
    <h2>New Student</h2>
    <h3>Student Class: {{ stClass.name }}</h3>
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

    <button>Save</button>
    <router-link :to="{ name: 'AllStudents' }">
      <button>Cancel</button>
    </router-link>
  </form>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById, save, getAll } = useCRUD();
    const router = useRouter();

    const stClass = ref("");

    const getStudentClass = async () => {
      stClass.value = await getById("stClasses", props.id);
    };

    onMounted(() => {
      getStudentClass();
    });

    const newStudent = reactive({
      email: "",
      username: "",
      password: "123",
      firstName: "",
      lastName: "",
      stClassId: props.id,
    });

    const stClasses = ref([]);
    const loadStClasses = async () => {
      stClasses.value = await getAll("stClasses");
    };

    onMounted(loadStClasses);

    const handleSubmit = async () => {
      //console.log(newStudent);
      await save("students", newStudent);
      router.go(-1);
    };

    return { stClass, newStudent, handleSubmit };
  },
};
</script>

<style>
</style>