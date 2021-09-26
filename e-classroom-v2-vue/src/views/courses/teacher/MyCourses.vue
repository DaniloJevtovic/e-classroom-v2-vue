<template>
  <div class="container">
    <div class="container-header">
      <h3>My Courses</h3>
      <button class="pill-button" @click="view = !view">view</button>
    </div>
    <div class="container-body">
      <div class="basic-grid" v-if="view">
        <div class="courses" v-for="course in courses" :key="course.id">
          <router-link
            :to="{ name: 'MyCourseDetails', params: { id: course.id } }"
          >
            <div class="st-course">
              <h2>Name: {{ course.name }}</h2>
              <h2>School Class: {{ course.schoolClass.name }}</h2>
              <p>Description: {{ course.description }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <div v-else>
        <table>
          <thead>
            <td>#</td>
            <td>Name</td>
            <td>Description</td>
            <td>School Class</td>
            <!-- <td>Action</td> -->
          </thead>
          <tr
            v-for="(course, index) in courses"
            :key="course.id"
            @click="goToCourse(course.id)"
          >
            <!-- <tr v-for="(course, index) in courses" :key="course.id"> -->
            <td>{{ index + 1 }}.</td>
            <td>{{ course.name }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.schoolClass.name }}</td>
            <!-- <td>
              <router-link
                :to="{ name: 'MyCourseDetails', params: { id: course.id } }"
              >
                <button>Details</button>
              </router-link>
            </td> -->
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const { getSubItems } = useCRUD();

    const courses = ref([]);
    const getCourses = async () => {
      let teacher = store.getters["getLoggedUser"];
      courses.value = await getSubItems("courses", "teacher", teacher.id);
    };

    const view = ref(true);

    const goToCourse = (courseId) => {
      router.push({ name: "MyCourseDetails", params: { id: courseId } });
    };

    onMounted(getCourses);
    return { courses, view, goToCourse };
  },
};
</script>

<style scoped>
.st-course {
  padding: 5px;
  /* color: rgb(229, 229, 231); */
  color: darkblue;
  /* background: rgb(29, 4, 48); */
  border-radius: 5px;
  border: 1px solid indigo;
}

.st-course:hover {
  background: cyan;
}
</style>