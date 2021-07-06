<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <child-navbar :links="linksForNavbar"></child-navbar>
    </div>

    <div class="container-body">
      <div class="course-info">
        <h2>Course: {{ courseInfo.name }}</h2>
        <h2>Description: {{ courseInfo.description }}</h2>
        <h2>SchoolClass: {{ courseInfo.schoolClass.name }}</h2>
      </div>

      <!-- ovako valjda prosljedjume parametar do child komponente -->
      <!-- komponente unutar child navbara -->
      <router-view :id="id" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import ChildNavbar from "../../../components/ChildNavbar.vue";

export default {
  props: ["id"],
  components: { ChildNavbar },
  setup(props) {
    const linksForNavbar = ref([
      { name: "Back to my Courses", path: "MyCourses" },
      { name: "Wall", path: "TeacherWall" },
      { name: "Materials", path: "MyMaterials" },
      { name: "Quizzes", path: "MyQuizzes" },
      { name: "Students", path: "MyStudents" },
    ]);

    const courseInfo = ref("");

    const { getById, getSubItems } = useCRUD();

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    onMounted(() => {
      getCourseDetails();
    });

    return { linksForNavbar, courseInfo };
  },
};
</script>

<style scoped>
.course-info {
  color: yellow;
}
</style>