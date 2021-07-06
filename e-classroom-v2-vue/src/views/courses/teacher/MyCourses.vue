<template>
  <div class="container">
    <div class="container-header">
      <h2>My Courses</h2>
    </div>
    <div class="container-body">
      <div class="basic-grid">
        <div class="courses" v-for="course in courses" :key="course.id">
          <router-link
            :to="{ name: 'MyCourseDetails', params: { id: course.id } }"
          >
            <div class="st-course">
              <h1>Name: {{ course.name }}</h1>
              <h2>School Class: {{ course.schoolClass.name }}</h2>
              <p>Description: {{ course.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
    const store = useStore();
    const { getSubItems } = useCRUD();

    const courses = ref([]);
    const getCourses = async () => {
      let teacher = store.getters["getLoggedUser"];
      courses.value = await getSubItems("courses", "teacher", teacher.id);
    };

    onMounted(getCourses);
    return { courses };
  },
};
</script>

<style scoped>
.st-course {
  padding: 5px;
  /* color: rgb(229, 229, 231); */
  color: cyan;
  background: rgb(29, 4, 48);
  border-radius: 10px;
}
</style>