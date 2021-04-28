<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <h2>
        Name: {{ courseInfo.name }}
        <br />
        Description: {{ courseInfo.description }}
        <br />
        SchoolClass: {{ courseInfo.schoolClass.name }}
      </h2>
      <router-link :to="{ name: 'MyCourses' }">
        <button>Back to my Courses</button>
      </router-link>
    </div>
    <div class="container-body">
      <h2>Materials</h2>

      <!-- moze ja mislim: params: { id: courseInfo.id } ili params: { id: id} -->
      <router-link :to="{ name: 'NewMaterial', params: { id: courseInfo.id } }">
        <button>New Material</button>
      </router-link>

      <div class="materials" v-for="material in materials" :key="material.id">
        <h2>Name: {{ material.name }}</h2>
        <h3>Description: {{ material.description }}</h3>
        <router-link
          :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
        >
          <button>details</button>
        </router-link>
        <hr />
      </div>
      <!-- {{ materials }} -->

      <hr />
      <h2>Quizzes</h2>
      <router-link :to="{ name: 'NewQuiz', params: { id: courseInfo.id } }">
        <button>New Quiz</button>
      </router-link>

      <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
        <!-- samo kvizovi koji nisu obrisani -->
        <div v-if="quiz.status !== 'DELETED'">
          <h2>Name: {{ quiz.name }}</h2>
          <h3>Instruction: {{ quiz.instructions }}</h3>
          <h4>Duration: {{ quiz.duration }} minutes.</h4>
          <router-link
            :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
          >
            <button>details</button>
          </router-link>
          <hr />
        </div>
      </div>

      <hr />
      <h2>Students</h2>
      <!-- za predmet nadjes kojem razredu pripada, zatim sa tim id om nadjes sva odjeljenja -->
      <div class="students" v-for="student in students" :key="student.id">
        <button>{{ student.firstName }} {{ student.lastName }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const courseInfo = ref("");
    const materials = ref([]);
    const quizzes = ref([]);
    const students = ref([]);
    const { getById, getSubItems } = useCRUD();

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    const getMaterialsForCourse = async () => {
      materials.value = await getSubItems("materials", "course", props.id);
    };

    const getQuizzesForCourse = async () => {
      quizzes.value = await getSubItems("quizzes", "course", props.id);
    };

    const getStudentsFromCourse = async () => {
      students.value = await getSubItems("students", "course", props.id);
    };

    onMounted(() => {
      getCourseDetails();
      getMaterialsForCourse();
      getQuizzesForCourse();
      getStudentsFromCourse();
    });

    return { courseInfo, materials, quizzes, students };
  },
};
</script>

<style>
.materials {
  color: yellow;
}
.quizzes {
  color: springgreen;
}
</style>