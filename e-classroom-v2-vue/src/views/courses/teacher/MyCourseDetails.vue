<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <h2>
        Name: {{ courseInfo.name }}
        <br />
        Description: {{ courseInfo.description }}
        <br />
        SchoolClass: {{ courseInfo.schoolClass.name }}
      </h2>
      <router-link :to="{ name: 'MyCourses' }">
        <button>Back to my Courses</button>
      </router-link>
    </div>
    <div class="container-body">
      <h2>Materials</h2>
      <button>New Material</button>

      <hr />
      <h2>Quizzes</h2>
      <button>New Quiz</button>

      <hr />
      <h2>Students</h2>
      <!-- za predmet nadjes kojem razredu pripada, zatim sa tim id om nadjes sva odjeljenja -->
      <div class="students" v-for="student in students" :key="student.id">
        <button>{{ student.firstName }} {{ student.lastName }}</button>
      </div>

    
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const courseInfo = ref("");
    const students = ref([]);
    const { getById, getSubItems } = useCRUD();

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    const getStudentsFromCourse = async () => {
      students.value = await getSubItems("students", "course", props.id);
    };

    onMounted(() => {
      getCourseDetails();
      getStudentsFromCourse();
    });

    return { courseInfo, students };
  },
};
</script>

<style>
</style>