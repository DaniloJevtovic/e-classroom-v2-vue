<template>
  <form
    @submit.prevent="handleSubmit"
    v-if="teachers.length && scClasses.length"
  >
    <!-- ako nema profesora ili razreda u sistemu nece moci da se kreira predmet -->
    <h2>New Course</h2>
    <input type="text" v-model="course.name" placeholder="name" required />
    <textarea v-model="course.description" placeholder="description" rows="3">
    </textarea>

    <select name="teachers" v-model="course.teacherId" required>
      <option disabled value="">Select teacher</option>
      <option v-for="teacher in teachers" :key="teacher" :value="teacher.id">
        {{ teacher.firstName }} {{ teacher.lastName }} - ({{
          teacher.subjects
        }})
      </option>
    </select>

    <select name="scClasses" v-model="course.schoolClassId" required>
      <option disabled value="">Select school class</option>
      <option v-for="scClass in scClasses" :key="scClass" :value="scClass.id">
        {{ scClass.name }}
      </option>
    </select>

    <button>Save</button>

    <!-- <router-link :to="{ name: 'AllCourses' }">
      <button>Cancel</button>
    </router-link> -->

    <button @click="$router.go(-1)">Cancel</button>
  </form>
  <div v-else class="container">
    <h2>Nije moguce kreirati predmet bez profesora ili razreda!</h2>
    <router-link :to="{ name: 'AllCourses' }">Back to all Courses</router-link>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "@/composables/useCRUD.js";

export default {
  setup() {
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
      await save("courses", course, true, true);
      //router.push({ name: "AllCourses" });
    };

    return { course, teachers, scClasses, handleSubmit };
  },
};
</script>

<style scoped>
</style>