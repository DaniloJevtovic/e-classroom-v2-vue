<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3 style="text-align: center">Student Class: {{ stClass.name }}</h3>
        <div class="st-par">
          <div class="student-form">
            <h3>Student data</h3>
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
          </div>

          <div class="parent-form">
            <h3>Parent data</h3>

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

        <button>Save</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props, context) {
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

      let resSt = await save("students", newStudent, false, true);

      context.emit("dodajUListu", resSt);
      closeModal();
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { stClass, newStudent, newParent, handleSubmit, closeModal };
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
  color: rgb(40, 55, 190);
  border: 1px dotted indigo;
  padding: 20px;
  border-radius: 5px;
}

.st-par {
  display: flex;
}

.modal {
  width: 900px;
}

.backdrop {
  background: rgba(105, 37, 122, 0.5);
}
</style>