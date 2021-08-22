<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit" v-if="teachers.length">
        <!-- ako nema profesora ili razreda u sistemu nece moci da se kreira predmet -->
        <h3>New Course</h3>
        <h3>ScClass: {{ scClass.name }}</h3>
        <input type="text" v-model="course.name" placeholder="name" required />
        <textarea
          v-model="course.description"
          placeholder="description"
          rows="3"
        >
        </textarea>

        <select name="teachers" v-model="course.teacherId" required>
          <option disabled value="">Select teacher</option>
          <option
            v-for="teacher in teachers"
            :key="teacher"
            :value="teacher.id"
          >
            {{ teacher.firstName }} {{ teacher.lastName }} - ({{
              teacher.subjects
            }})
          </option>
        </select>

        <button>Save</button>

        <button @click.prevent="closeModal">Cancel</button>
      </form>
      <div v-else class="container">
        <h2>Nije moguce kreirati predmet bez profesora!</h2>
        <router-link :to="{ name: 'AllCourses', params: { id: scClassId } }">
          Back to scClass
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["scClassId"],
  setup(props, context) {
    // vodi racuna da u setup() metodi prvi parametar mora biti props
    // pa tek onda moze context!!!
    const { getAll, save, getById } = useCRUD();

    const teachers = ref([]);
    const scClass = ref("");

    const course = reactive({
      name: "",
      description: "",
      teacherId: "",
      schoolClassId: props.scClassId,
    });

    const loadScClass = async () => {
      scClass.value = await getById("scClasses", props.scClassId);
    };

    const loadTeachers = async () => {
      teachers.value = await getAll("teachers");
    };

    onMounted(() => {
      loadTeachers();
      loadScClass();
    });

    const handleSubmit = async () => {
      let res = await save("courses", course, false, true);
      context.emit("dodajUListu", res);
      closeModal();
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { course, teachers, scClass, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
</style>