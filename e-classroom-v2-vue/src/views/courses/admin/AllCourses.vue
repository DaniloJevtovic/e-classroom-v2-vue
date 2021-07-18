<template>
  <div class="container">
    <div class="container-header">
      <!-- <h2>All courses</h2> -->
      <router-link :to="{ name: 'NewCourse' }">
        <button>New Course</button>
      </router-link>
      <input type="text" placeholder="search" />
    </div>

    <div class="container-body">
      <h2>All Courses</h2>
      <div class="courses" v-for="course in courses" :key="course.id">
        <router-link :to="{ name: 'CourseDetails', params: { id: course.id } }">
          <button>
            Name: {{ course.name }}
            <hr />
            Teacher: {{ course.teacher.firstName }}
            {{ course.teacher.lastName }}
            <hr />
            School Class: {{ course.schoolClass.name }}
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
import useCRUD from "@/composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const courses = ref([]);
    const getCourses = async () => {
      courses.value = await getAll("courses");
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

button {
  padding: 5px
}

input {
  margin: 0;
  width: 92%;
}
</style>