<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <child-navbar :links="linksForNavbar"></child-navbar>
    </div>
    <div class="container-body">
      <h3>Course: {{ courseInfo.name }}</h3>
      <h3>Description: {{ courseInfo.description }}</h3>
      <h3>Teacher: {{ courseInfo.teacher.firstName }}</h3>
      <router-link
        :to="{
          name: 'NewMessage',
          params: { senderId: loggedUser.id, reciverId: courseInfo.teacher.id },
        }"
      >
        <button>Send message</button>
      </router-link>

      <router-view :id="id" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import ChildNavbar from "../../../components/ChildNavbar.vue";
import { useStore } from "vuex";

export default {
  props: ["id"],
  components: { ChildNavbar },
  setup(props) {
    const { getById, getSubItems } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const linksForNavbar = ref([
      { name: "Back to my Courses", path: "StudentCourses" },
      { name: "Wall", path: "StudentWall" },
      { name: "Materials", path: "StudentMaterials" },
      { name: "Quizzes", path: "StudentQuizzes" },
    ]);

    const courseInfo = ref("");
    const materials = ref("");
    const quizzes = ref("");

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    const getCourseMaterials = async () => {
      materials.value = await getSubItems("materials", "course", props.id);
    };

    const getCourseQuizzes = async () => {
      quizzes.value = await getSubItems("quizzes", "course", props.id);
    };

    onMounted(() => {
      getCourseDetails();
      getCourseMaterials();
      getCourseQuizzes();
    });

    return { linksForNavbar, courseInfo, materials, quizzes, loggedUser };
  },
};
</script>

<style>
</style>