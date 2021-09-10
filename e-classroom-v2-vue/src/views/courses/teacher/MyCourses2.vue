<template>
  <div class="container">
    <div class="container-header">
      <h2>My Courses</h2>
    </div>
    <div class="container-body">
      <div class="courses-details">
        <!-- svi predmeti - lijeva strana -->
        <div class="courses">
          <div v-for="(course, index) in courses" :key="course.id">
            <button
              :class="{ highlight: index == selectedButton }"
              @click="switchCourse(course), (selectedButton = index)"
            >
              {{ course.name }}
            </button>
          </div>
        </div>

        <!-- desna strana -->
        <div class="course-details" v-if="selectedCourse">
          <!-- {{ selectedCourse }} -->

          <MyCourse2 :course="selectedCourse" />
        </div>
        <div v-else>
          <h3>Please select Course</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import useCRUD from "../../../composables/useCRUD.js";

import MyCourse2 from "./MyCourse2.vue";

export default {
  components: { MyCourse2 },
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
      console.log(course);
      selectedCourse.value = course;
    };

    return { courses, switchCourse, selectedCourse, selectedButton: ref("") };
  },
};
</script>

<style scoped>
.courses-details {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.courses {
  background: blue;
}

.course-details {
  background: springgreen;
}

.st-course {
  padding: 5px;
  /* color: rgb(229, 229, 231); */
  color: darkblue;
  /* background: rgb(29, 4, 48); */
  border-radius: 5px;
  border: 1px solid indigo;
}

button {
  width: 90%;
}

.highlight {
  background: deeppink;
}
</style>