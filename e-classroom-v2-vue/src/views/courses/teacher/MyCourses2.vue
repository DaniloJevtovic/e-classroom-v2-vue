<template>
  <div class="container">
    <!-- <div class="container-header">
      <h2>My Courses</h2>
    </div> -->
    <div class="container-body">
      <div class="courses-details">
        <!-- svi predmeti - lijeva strana -->
        <div class="courses">
          <h3 style="color: deeppink">Courses</h3>
          <div v-for="course in courses" :key="course.id">
            <router-link
              active-class="active"
              :to="{
                name: 'MyCourseDetails',
                params: { id: course.id },
                key: course.id,
              }"
            >
              <button>{{ course.name }}</button>
            </router-link>
          </div>
        </div>

        <!-- https://stackoverflow.com/questions/40884023/vue-js-rerender-the-same-component-when-changing-route -->

        <div class="right-side">
          <router-view :key="$route.path" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import useCRUD from "../../../composables/useCRUD.js";

import MyCourseDetails from "./MyCourseDetails.vue";

export default {
  components: { MyCourseDetails },
  setup() {
    const store = useStore();
    const { getSubItems, getById } = useCRUD();

    const courses = ref([]);

    const getCourses = async () => {
      let teacher = store.getters["getLoggedUser"];
      courses.value = await getSubItems("courses", "teacher", teacher.id);
    };

    onMounted(getCourses);

    const selectedCourse = ref();

    const switchCourse = (course) => {
      // console.log(course);
      selectedCourse.value = course;
    };

    return { courses, switchCourse, selectedCourse, selectedButton: ref(null) };
  },
};
</script>

<style scoped>
.courses-details {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.courses {
  background: rgba(2, 2, 88, 0.822);
}

.right-side {
  position: relative;
  max-height: 550px;
  min-height: 550px;
  overflow: auto;
}

button {
  width: 90%;
  background: dodgerblue;
}

.highlight {
  background: deeppink;
}

a.router-link-exact-active button {
  background: gold;
  color: indigo;
}

.active button {
  color: darkblue;
  background: cyan;
}
</style>