<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back</button>
    </div>

    <div class="container-body">
      <h2>Name: {{ quizInfo.name }}</h2>
      <h3>Instruction: {{ quizInfo.instructions }}</h3>
      <h4>Duration: {{ quizInfo.duration }} min</h4>

      <!-- ako je ucenik rjesavao kviz - prikazi mu rezultat -->
      <div v-if="result">
        <student-quiz-results :result="result"></student-quiz-results>
      </div>

      <!-- ako ucenik nije rjesavao kviz prikazi mu dugme da zapocne rjesavanje -->
      <div v-else>
        <button
          style="padding: 10px 40px; font-size: 15px"
          @click.prevent="startQuiz"
        >
          Start quiz
        </button>
        <p style="color: red; margin: 5px">
          *note: kad pokrente kviz rezultat se automatski cuva
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import StudentQuizResults from "./res/StudentQuizResults.vue";

export default {
  props: ["quizId"],
  components: {
    StudentQuizResults,
  },
  setup(props) {
    const { getById, getSubSubItems, save } = useCRUD();
    const router = useRouter();
    const store = useStore();

    const student = store.getters["getLoggedUser"];
    const quizInfo = ref("");
    const result = ref("");

    const getQuizInfo = async () => {
      quizInfo.value = await getById("quizzes", props.quizId);
    };

    //provjeravam da li je taj ucenik (ulogovani) rjesavao taj kviz
    const getResults = async () => {
      result.value = await getSubSubItems(
        "results",
        "student",
        "quiz",
        student.id,
        props.quizId
      );
    };

    onMounted(() => {
      getQuizInfo();
      getResults();
    });

    const startQuiz = async () => {
      let newResult = {
        studentId: student.id,
        quizId: props.quizId,
        points: 0,
      };

      //cuvam novi rezultat
      const res = await save("results", newResult, false, false);
      console.log("kreirao: ", res.id);

      //preusmjeravam na rjesavanje kviza
      router.push({
        name: "StudentSolveQuiz",
        params: { quizId: props.quizId, stRes: res.id },
      });
    };

    return { quizInfo, result, startQuiz };
  },
};
</script>


<style scoped>
.st-quiz-info {
  color: aqua;
  background: rgb(14, 3, 85);
  padding: 5px;
}
</style>