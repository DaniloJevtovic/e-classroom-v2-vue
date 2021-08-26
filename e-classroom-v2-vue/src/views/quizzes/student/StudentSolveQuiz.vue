<template>
  <div v-if="result">
    <student-quiz-results :result="result"></student-quiz-results>
  </div>
  <div v-else>
    <div class="container-body">
      <!-- prikaz informacija o kvizu -->
      <div class="quiz-info">
        <h2>Name: {{ quizInfo.name }}</h2>
        <h3>Instructions: {{ quizInfo.instructions }}</h3>
        <h2>Duration: {{ quizInfo.duration }} min</h2>
        <h3>Total questions: {{ questions.length }}</h3>
        <!-- <h1>TIME: {{ timer }} s</h1> -->
        <h1 style="color: yellow">TIME: {{ timer2 }}</h1>
      </div>

      <!-- ucitavanje svih pitanja za kviz -->
      <div class="questions">
        <h2>Questions</h2>

        <div v-for="(question, index) in questions" :key="question.id">
          <!-- pitanja za kviz -->
          <student-solve-quiz-questions
            :questionId="question.id"
            :questionIndex="index"
            :stRes="stRes"
          >
          </student-solve-quiz-questions>
        </div>
      </div>

      <button @click="finishQuiz">FINISH</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import StudentSolveQuizQuestions from "./StudentSolveQuizQuestions.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import StudentQuizResults from "./res/StudentQuizResults.vue";

export default {
  props: ["id", "quizId", "stRes"],
  components: { StudentSolveQuizQuestions, StudentQuizResults },
  setup(props) {
    const { getById, getSubItems, getSubSubItems, deleteById } = useCRUD();
    const router = useRouter();
    const toast = useToast();
    const result = ref("");
    const store = useStore();

    const student = store.getters["getLoggedUser"];

    const quizInfo = ref("");
    const questions = ref([]);
    const timer = ref();

    const timer2 = ref("");

    const getQuiz = async () => {
      //quizInfo.value = await getById("quizzes", props.quizId);
      let quiz = await getById("quizzes", props.quizId);
      quizInfo.value = quiz;
      timer.value = quiz.duration * 60; // 1m = 60s
      startTimer();
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

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    const startTimer = () => {
      if (timer.value > 0) {
        setTimeout(() => {
          timer.value -= 1;

          timer2.value = secondsToHms(timer.value);

          startTimer();
        }, 1000);
      } else {
        router.push({
          name: "StudentQuizDetails",
          params: { quizId: props.quizId },
        });
      }
    };

    //https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
    const secondsToHms = (d) => {
      d = Number(d);

      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      return (
        ("0" + h).slice(-2) +
        ":" +
        ("0" + m).slice(-2) +
        ":" +
        ("0" + s).slice(-2)
      );
    };

    onMounted(() => {
      //getResults();
      getQuiz();
      getQuestionsForQuiz();
    });

    const finishQuiz = () => {
      //resetovanje tajmera
      timer.value = 0;
      timer2.value = 0;

      //preusmjeravam na rezultate
      router.push({
        name: "StudentQuizDetails",
        params: { quizId: props.quizId },
      });
    };

    return { quizInfo, questions, timer, timer2, result, finishQuiz };
  },
};
</script>

<style scoped>
.quiz-info {
  padding: 4px;
  border: 1px solid darkblue;
  background: #014141;
  border-radius: 5px;
  width: 70%;
  margin: 1px auto;
}

.questions {
  width: 70%;
  margin: 0px auto;
}
</style>