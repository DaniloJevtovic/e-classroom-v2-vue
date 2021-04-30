<template>
  <div class="container">
    <div class="container-header">
     <button @click="$router.go(-1)">Back to quizzes</button>
      <!-- <router-link :to="{ name: 'MyCourseDetails', params: { id: id } }">
        <button>Back to course</button>
      </router-link> -->
    </div>
    <div class="container-body">
      <div class="quiz-info">
        <h1>Name: {{ quizInfo.name }}</h1>
        <h2>Instructions: {{ quizInfo.instructions }}</h2>
        <h2>Duration: {{ quizInfo.duration }}</h2>
        <h2>QuizStatus: {{ quizInfo.status }}</h2>
        <h3>Total questions: {{ questions.length }}</h3>

        <router-link :to="{ name: 'EditQuiz', params: { quziId: quizId } }">
          <button>Edit</button>
        </router-link>

        <button @click="deleteQuiz">Delete</button>
      </div>

      <hr />

      <div class="questions">
        <h1>Questions</h1>
        <router-link :to="{ name: 'NewQuestion', params: { quizId: quizId } }">
          <button>New Question</button>
        </router-link>

        <div v-for="question in questions" :key="question.id">
          <question-details
            :questionId="question.id"
            @deleteFromList="deleteQuestion"
          ></question-details>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import QuestionDetails from "./QuestionDetails.vue";
import { useRouter, userRouter } from "vue-router";

export default {
  props: ["id", "quizId"],
  components: { QuestionDetails },
  setup(props) {
    const { getById, getSubItems, deleteById } = useCRUD();
    const router = useRouter();

    const quizInfo = ref("");

    const questions = ref([]);

    const getQuiz = async () => {
      quizInfo.value = await getById("quizzes", props.quizId);
    };

    const deleteQuiz = async () => {
      await deleteById("quizzes", props.quizId);
      router.push({ name: "MyCourseDetails", params: { id: props.id } });
    };

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    const newQuestion = () => {
      questions.value.push("ss");
    };

    //brisanje iz liste (prikaz) - brisanje na bekendu je u question details komponenti!
    const deleteQuestion = (id) => {
      let index = questions.value.findIndex((question) => question.id === id);
      questions.value.splice(index, 1);
    };

    onMounted(() => {
      getQuiz();
      getQuestionsForQuiz();
    });

    return { quizInfo, questions, newQuestion, deleteQuiz, deleteQuestion };
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