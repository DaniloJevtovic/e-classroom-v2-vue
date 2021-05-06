<template>
  <div class="container">
    <div class="container-header">
      <h2>My Courses</h2>
    </div>

    <div class="container-body">
      <div class="courses" v-for="course in courses" :key="course.id">
        <router-link
          :to="{ name: 'StudentCourseDetails', params: { id: course.id } }"
        >
          <button>
            Name: {{ course.name }}
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

<style>
.courses {
  display: inline;
}
</style>