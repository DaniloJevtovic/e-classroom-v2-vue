<template>
  <form @submit.prevent="handleSubmit" v-if="teachers.length">
    <!-- ako nema profesora ili razreda u sistemu nece moci da se kreira predmet -->
    <h2>New Course</h2>
    <h2>ScClass: {{ scClass.name }}</h2>
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

    <button>Save</button>

    <button @click="$router.go(-1)">Cancel</button>
  </form>
  <div v-else class="container">
    <h2>Nije moguce kreirati predmet bez profesora!</h2>
    <router-link :to="{ name: 'AllCourses', params: { id: scClassId } }">
      Back to scClass
    </router-link>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["scClassId"],
  setup(props) {
    const { getAll, save, getById } = useCRUD();
    const router = useRouter();

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
      await save("courses", course);
      router.go(-1);
    };

    return { course, teachers, scClass, handleSubmit };
  },
};
</script>

<style>
</style>