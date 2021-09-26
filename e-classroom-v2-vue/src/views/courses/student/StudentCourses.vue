<template>
  <div class="container">
    <div class="container-header">
      <h3>My Courses</h3>
      <button @click="view = !view" class="pill-button">view</button>
    </div>

    <div class="container-body">
      <div class="basic-grid" v-if="view">
        <!-- grid prikaz predmeta -->
        <div class="coursess" v-for="course in courses" :key="course.id">
          <router-link
            :to="{ name: 'StudentCourseDetails', params: { id: course.id } }"
          >
            <div class="st-course">
              <h2>Name: {{ course.name }}</h2>
              <h2>
                Teacher: {{ course.teacher.firstName }}
                {{ course.teacher.lastName }}
              </h2>
              <p>Details: {{ course.description }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- tabelarni prikaz predmeta -->
      <div v-else>
        <table>
          <thead>
            <td>#</td>
            <td>Name</td>
            <td>Description</td>
            <td>Teacher</td>
            <td>Action</td>
          </thead>
          <tr v-for="(course, index) in courses" :key="course.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ course.name }}</td>
            <td>{{ course.description }}</td>
            <td>
              {{ course.teacher.firstName }} {{ course.teacher.lastName }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'StudentCourseDetails',
                  params: { id: course.id },
                }"
              >
                <button>Details</button>
              </router-link>
            </td>
          </tr>
        </table>
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

    const view = ref(false);

    onMounted(getCourses);
    return { courses, view };
  },
};
</script>

<style scoped>
.coursess {
  display: inline;
  /* margin: 2px; */
}

.st-course {
  /* background: rgb(3, 15, 54); */
  color: darkblue;
  border-radius: 5px;
  padding: 5px;
  /* margin: 5px; */
  border: 1px solid indigo;
}

.st-course:hover {
  background: cyan;
}
</style>