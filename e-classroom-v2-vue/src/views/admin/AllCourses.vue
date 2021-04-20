<template>
  <div class="container">
    <h2>All courses</h2>
    <br>

    <div class="course" v-for="course in courses" :key="course.id">
      <h2>Name: {{ course.name }}</h2>
      <h3>
        Teacher: {{ course.teacher.firstName }} {{ course.teacher.lastName }}
      </h3>
      <p>Description:{{ course.description }}</p>
      <hr />
    </div>
    <!-- {{ courses }} -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCourses from "../../composables/useCourses.js";

export default {
  setup() {
    const { getAllCourses } = useCourses();

    const courses = ref([]);
    const getCourses = async () => {
      courses.value = await getAllCourses();
    };
    onMounted(getCourses);

    return { courses };
  },
};
</script>

<style>
</style>