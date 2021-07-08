<template>
  <div class="container">
    <div class="container-body">
      <div class="quiz-info">
        <h1>Name: {{ quizInfo.name }}</h1>
        <h2>Instructions: {{ quizInfo.instructions }}</h2>
        <h2>Duration: {{ quizInfo.duration }}</h2>
        <h3>Total questions: {{ questions.length }}</h3>
        <!-- <h1>TIME: {{ timer }} s</h1> -->
        <h1>TIME: {{ timer2 }}</h1>
      </div>

      <div class="questions">
        <h1>Questions</h1>

        <div v-for="question in questions" :key="question.id">
          <student-solve-quiz-questions
            :questionId="question.id"
            :stRes="stRes"
          >
          </student-solve-quiz-questions>
        </div>
      </div>

      <router-link :to="{ name: 'StudentQuizDetails', params: { quizId } }">
        <button>FINISH</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import StudentSolveQuizQuestions from "./StudentSolveQuizQuestions.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  props: ["id", "quizId", "stRes"],
  components: { StudentSolveQuizQuestions },
  setup(props) {
    const { getById, getSubItems, deleteById } = useCRUD();
    const router = useRouter();
    const toast = useToast();

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
      getQuiz();
      getQuestionsForQuiz();
    });

    return { quizInfo, questions, timer, timer2 };
  },
};
</script>

<style>
.quiz-info {
  padding: 14px;
  border: 7px solid darkblue;
  background: blue;
  border-radius: 20px;
}

.questions {
  padding: 10px;
}
</style>