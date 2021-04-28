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
      <router-view :id="id" />

      <!-- <div class="materials-info">
        <h2>Materials</h2>
        <router-link
          :to="{ name: 'NewMaterial', params: { id: courseInfo.id } }"
        >
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
        </div>
      </div> -->

      <!-- <div class="quizzes-info">
        <h2>Quizzes</h2>
        <router-link :to="{ name: 'NewQuiz', params: { id: courseInfo.id } }">
          <button>New Quiz</button>
        </router-link>

        <div class="quizzes" v-for="quiz in quizzes" :key="quiz.id">
          <h2>Name: {{ quiz.name }}</h2>
          <h3>Instruction: {{ quiz.instructions }}</h3>
          <h4>Duration: {{ quiz.duration }} minutes.</h4>
          <router-link
            :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
          >
            <button>details</button>
          </router-link>
        </div>
      </div> -->

      <!-- <div class="students-info">
        <h2>Students</h2> -->
      <!-- za predmet nadjes kojem razredu pripada, zatim sa tim id om nadjes sva odjeljenja -->
      <!-- <div class="students" v-for="student in students" :key="student.id">
          <button>{{ student.firstName }} {{ student.lastName }}</button>
        </div>
      </div> -->
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
      { name: "Materials", path: "MyMaterials" },
      { name: "Quizzes", path: "MyQuizzes" },
      { name: "Students", path: "MyStudents" },
    ]);

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

    return { linksForNavbar, courseInfo, materials, quizzes, students };
  },
};
</script>

<style scoped>


.course-info {
  background: rgb(115, 176, 216);
  padding: 10px;
}

.materials-info {
  padding: 10px;
  background: blue;
}

.materials {
  color: yellow;
  border: 2px solid pink;
  padding: 8px;
}

.quizzes-info {
  padding: 10px;
  background: orange;
}

.quizzes {
  background: rgb(11, 11, 65);
  color: springgreen;
  border: 2px solid pink;
  padding: 8px;
}

.students-info {
  padding: 10px;
  background: chartreuse;
}
</style>