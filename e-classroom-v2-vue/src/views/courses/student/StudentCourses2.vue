<template>
  <div class="container">
    <div class="container-header">
      <h3>My Courses</h3>
    </div>

    <div class="container-body">
      <div class="coursess">
        <!-- grid prikaz predmeta -->
        <div>
          <div v-for="course in courses" :key="course.id">
            <router-link
              active-class="activeCourse"
              :to="{ name: 'StudentCourseDetails', params: { id: course.id } }"
            >
              <div class="st-course">
                <h3>Name: {{ course.name }}</h3>
                <p>
                  Teacher: {{ course.teacher.firstName }}
                  {{ course.teacher.lastName }}
                </p>
              </div>
            </router-link>
          </div>
        </div>

        <div class="right-side">
          <router-view :key="$route.path" />
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
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 2px;
}

.right-side {
  position: relative;
  max-height: 550px;
  min-height: 550px;
  overflow: auto;
}

.st-course {
  /* background: rgb(3, 15, 54); */
  color: darkblue;
  border-radius: 5px;
  padding: 7px;
  margin: 5px;
  border: 1px solid indigo;
}

.activeCourse div {
  color: white;
  background: darkslateblue;
}
</style>