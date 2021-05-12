<template>
  <div class="student-quiz-details">
    <div class="st-quiz-info">
      <h3>Name: {{ quizInfo.name }}</h3>
      <h3>Instruction: {{ quizInfo.instructions }}</h3>
      <h4>Duration: {{ quizInfo.duration }}</h4>

      <div v-if="result">
        <student-quiz-results :result="result"></student-quiz-results>
      </div>

      <div v-else>
        <button @click.prevent="startQuiz">Start</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import StudentQuizResults from "./StudentQuizResults.vue";

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

      const res = await save("results", newResult);
      console.log("kreirao: ", res.id);

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
  background: rgb(136, 132, 163);
  padding: 15px;
}
</style>