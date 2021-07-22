<template>
  <div class="container">
    <div class="container-header">
      <h2>My Courses</h2>
    </div>
    <div class="container-body">
      <div class="courses-details">
        <div class="courses">
          <div v-for="course in courses" :key="course.id">
            <!-- <button @click.prevent="getCourse(course.id)">
              {{ course.name }}
            </button> -->

            <router-link
              :to="{ name: 'MyCourseDetails2', params: { id: course.id } }"
            >
              <button>{{ course.name }}</button>
            </router-link>
          </div>
        </div>
        <div class="course-details" v-if="course">
          <h2>{{ course.name }}</h2>
          <h3>{{ course.description }}</h3>

          <router-view :id="course.id"></router-view>
        </div>
        <div v-else>
          <h2>Please select course</h2>
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
    const { getSubItems, getById } = useCRUD();

    const courses = ref([]);

    const getCourses = async () => {
      let teacher = store.getters["getLoggedUser"];
      courses.value = await getSubItems("courses", "teacher", teacher.id);
    };

    const course = ref();

    const getCourse = async (id) => {
      course.value = await getById("courses", id);
    };

    onMounted(getCourses);
    return { courses, getCourse, course };
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
</style>