<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form
        @submit.prevent="handleSubmit"
        v-if="teachers.length && scClasses.length"
      >
        <!-- ako nema profesora ili razreda u sistemu nece moci da se kreira predmet -->
        <h3>New Course</h3>
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

        <select name="scClasses" v-model="course.schoolClassId" required>
          <option disabled value="">Select school class</option>
          <option
            v-for="scClass in scClasses"
            :key="scClass"
            :value="scClass.id"
          >
            {{ scClass.name }}
          </option>
        </select>

        <button>Save</button>

        <button @click.prevent="closeModal">Cancel</button>
      </form>
      <div v-else class="container">
        <h2>Nije moguce kreirati predmet bez profesora ili razreda!</h2>
        <router-link :to="{ name: 'AllCourses' }">
          Back to all Courses</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "@/composables/useCRUD.js";

export default {
  setup(props, context) {
    const { getAll, save } = useCRUD();
    const router = useRouter();

    const teachers = ref([]);
    const scClasses = ref([]);

    const course = reactive({
      name: "",
      description: "",
      teacherId: "",
      schoolClassId: "",
    });

    const loadTeachers = async () => {
      teachers.value = await getAll("teachers");
    };

    const loadScClasses = async () => {
      scClasses.value = await getAll("scClasses");
    };

    onMounted(() => {
      loadTeachers();
      loadScClasses();
    });

    const handleSubmit = async () => {
      //console.log(course);
      let res = await save("courses", course, false, true);

      context.emit("dodajUListu", res);

      closeModal();
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { course, teachers, scClasses, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
</style>