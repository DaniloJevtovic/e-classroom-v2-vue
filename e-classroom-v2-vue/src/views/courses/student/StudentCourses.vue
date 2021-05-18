<template>
  <div class="container">
    <div class="container-header">
      <h2>My Courses</h2>
    </div>

    <div class="container-body">
      <div class="basic-grid">
        <div class="coursess" v-for="course in courses" :key="course.id">
          <router-link
            :to="{ name: 'StudentCourseDetails', params: { id: course.id } }"
          >
            <div class="st-course">
              <h1>Name: {{ course.name }}</h1>
              <h2>
                Teacher: {{ course.teacher.firstName }}
                {{ course.teacher.lastName }}
              </h2>
              <p>Details: {{ course.description }}</p>
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
      let student = store.getters["getLoggedUser"];
      console.log(student);

      courses.value = await getSubItems(
        "courses",
        "stClass",
        student.studentClass.id
      ); //id razreda kojem ucenik pripada
    };

    onMounted(getCourses);
    return { courses };
  },
};
</script>

<style scoped>
.coursess {
  display: inline;
  margin: 2px;
}

.st-course {
  background: rgb(188, 226, 188);
  color: rgb(82, 10, 46);
  border: 2px solid indigo;
  border-radius: 7px;
  padding: 7px;
  margin: 5px;
}
</style>