<template>
  <div class="container">
    <div class="container-header">
      <h2>All courses</h2>
      <router-link :to="{ name: 'NewCourse' }">
        <button>New Course</button>
      </router-link>
    </div>

    <div class="container-body">
      <div class="courses" v-for="course in courses" :key="course.id">
        <router-link :to="{ name: 'CourseDetails', params: { id: course.id } }">
          <button>
            Name: {{ course.name }}
            <hr />
            Teacher: {{ course.teacher.firstName }}
            {{ course.teacher.lastName }}
            <hr />
            Description: {{ course.description }}
          </button>
        </router-link>
        <!-- <hr /> -->
      </div>
    </div>
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

<style scoped>
.courses {
  display: inline;
}
</style>