<template>
  <div class="container">
    <div class="container-header">
      <!-- <h2>All courses</h2> -->
      <router-link :to="{ name: 'NewCourse' }">
        <button>New Course</button>
      </router-link>
      <button @click="view = !view">view</button>
      <input type="text" placeholder="search" />
    </div>

    <div class="container-body">
      <!-- <h3>All Courses</h3> -->
      <div v-if="view">
        <!-- <div class="courses" v-for="course in courses" :key="course.id">
          <router-link :to="{ name: 'EditCourse', params: { id: course.id } }">
            <button>
              Name: {{ course.name }}
              <br />
              Teacher: {{ course.teacher.firstName }}
              {{ course.teacher.lastName }}
              <br />
              School Class: {{ course.schoolClass.name }}
              <br />
              Description: {{ course.description }}
            </button>
          </router-link>
        </div> -->

        <!-- predmeti razvrstani po razredima -->
        <sc-classes></sc-classes>
      </div>

      <div v-else>
        <table>
          <thead>
            <td>#</td>
            <td>Name</td>
            <td>Description</td>
            <td>School Class</td>
            <td>Teacher</td>
            <td>Action</td>
          </thead>
          <tr v-for="(course, index) in courses" :key="course.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ course.name }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.schoolClass.name }}</td>
            <td>
              {{ course.teacher.firstName }} {{ course.teacher.lastName }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'NewMessage',
                  params: { reciverId: course.teacher.id },
                }"
              >
                <button>Contact teacher</button>
              </router-link>

              <router-link
                :to="{
                  name: 'EditCourse',
                  params: { id: course.id },
                }"
              >
                <button>Edit</button>
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
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";
import ScClasses from "./ScClasses.vue";

export default {
  components: { ScClasses },
  setup() {
    const router = useRouter();
    const { getAll } = useCRUD();

    const courses = ref([]);
    const getCourses = async () => {
      courses.value = await getAll("courses");
    };

    onMounted(getCourses);

    return { courses, view: ref(true) };
  },
};
</script>

<style scoped>
.courses {
  display: inline;
}

button {
  padding: 5px;
}

input {
  margin: 0;
  width: 80%;
}
</style>