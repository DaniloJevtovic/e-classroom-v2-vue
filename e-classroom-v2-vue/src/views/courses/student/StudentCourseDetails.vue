<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <h2>Course details</h2>
      <router-link :to="{ name: 'StudentCourses' }">
        <button>Back to my Courses</button>
      </router-link>
    </div>
    <div class="container-body">
      <h2>Name: {{ courseInfo.name }}</h2>
      <h2>Description: {{ courseInfo.description }}</h2>
      <h2>Teacher: {{ courseInfo.teacher.firstName }}</h2>
      <hr />

      <h2>Materials</h2>
      <div class="materials" v-for="material in materials" :key="material.id">
        <h2>Name: {{ material.name }}</h2>
        <h3>Description: {{ material.description }}</h3>
        <router-link
          :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
          ><button>details</button></router-link
        >
        <hr />
      </div>

      <hr />
      <h2>Quizzes</h2>
      <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
        <h2>Name: {{ quiz.name }}</h2>
        <h3>Instruction {{ quiz.instruction }}</h3>
        <h4>Duration: {{quiz.duration}}</h4>
        <router-link
          :to="{ name: 'StudentQuizDetails', params: { quizId: quiz.id } }"
          ><button>details</button></router-link
        >
        <hr />
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();

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

    return { courseInfo, materials, quizzes };
  },
};
</script>

<style>
</style>