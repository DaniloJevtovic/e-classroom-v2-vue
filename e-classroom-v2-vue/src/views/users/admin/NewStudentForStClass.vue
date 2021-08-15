<template>
  <form @submit.prevent="handleSubmit">
    <h3 style="text-align: center">Student Class: {{ stClass.name }}</h3>
    <div class="st-par">
      <div class="student-form">
        <h2>Student</h2>
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
        <button @click.prevent="$router.go(-1)">Cancel</button>
      </div>

      <div class="parent-form">
        <h2>Parent data</h2>
        <!-- <h3>Student Class: {{ stClass.name }}</h3> -->
        <h3>Dat</h3>
        <input
          type="email"
          v-model="newParent.email"
          placeholder="parent email"
          required
        />
        <input
          type="text"
          v-model="newParent.username"
          placeholder="parent username"
          required
        />
        <input
          type="text"
          v-model="newParent.firstName"
          placeholder="First name"
          required
        />
        <input
          type="text"
          v-model="newParent.lastName"
          placeholder="Last name"
          required
        />
      </div>
    </div>
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

    const newParent = reactive({
      email: "",
      username: "",
      password: "123",
      firstName: "",
      lastName: "",
      enabled: true,
    });

    const stClasses = ref([]);
    const loadStClasses = async () => {
      stClasses.value = await getAll("stClasses");
    };

    onMounted(loadStClasses);

    const handleSubmit = async () => {
      //console.log(newStudent);
      let res = await save("stParents", newParent, false, false);

      console.log("EOOOOOO", res);

      newStudent.parentId = res.id; // dodjela roditelja uceniku!

      let resSt = await save("students", newStudent, true, true);

      // router.go(-1);
    };

    return { stClass, newStudent, newParent, handleSubmit };
  },
};
</script>

<style scoped>
form {
  max-width: 900px;
}

.student-form,
.parent-form {
  width: 50%;
  margin: 20px;
}
.st-par {
  display: flex;
}
</style>