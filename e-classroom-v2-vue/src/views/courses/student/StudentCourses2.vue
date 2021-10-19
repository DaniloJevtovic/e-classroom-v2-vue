<template>
  <div class="container">
    <!-- <div class="container-header">
      <h3>My Courses</h3>
    </div> -->

    <div class="container-body">
      <div class="coursess">
        <!-- grid prikaz predmeta -->
        <div class="left-side">
          <h3>Courses [{{ courses.length }}]</h3>
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

      // "stClass" - i nekativni, "active/stClass" - samo aktivni predmeti
      courses.value = await getSubItems(
        "courses",
        "active/stClass",
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

.left-side {
  /* background: rgb(91, 255, 255); */
  border: 1px solid darkslateblue;
  max-height: 580px;
  min-height: 580px;
  overflow: auto;
}

.right-side {
  position: relative;
  max-height: 580px;
  min-height: 580px;
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

.st-course:hover {
  background: cyan;
  color: darkblue;
}

.activeCourse div {
  color: white;
  background: darkslateblue;
}
</style>