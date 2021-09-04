<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to quizzes</button>
    </div>
    <div class="container-body">
      <!-- informacije o kvizu -->
      <div class="quiz-info" @click="toggleEditQModal">
        <h3>{{ quiz.name }}</h3>
        <p>Instructions: {{ quiz.instructions }}</p>
        <div>duration: {{ quiz.duration }} | status: {{ quiz.quizStatus }}</div>
      </div>

      <div v-if="showEditQuizModal">
        <EditQuizModal
          :quiz="quiz"
          @zatvoriModal="toggleEditQModal"
        ></EditQuizModal>
      </div>

      <!-- lista pitanja za kviz -->
      <div class="questions-scroll">
        <questions-list :quizId="quizId"></questions-list>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

import EditQuizModal from "./EditQuizModal.vue";
import QuestionsList from "./QuestionsList.vue";

export default {
  props: ["quizId"],
  components: { EditQuizModal, QuestionsList },
  setup(props) {
    const { getById, editById, deleteById } = useCRUD();
    const router = useRouter();

    const quiz = ref("");

    const getQuiz = async () => {
      quiz.value = await getById("quizzes", props.quizId);
    };

    onMounted(getQuiz);

    const deleteQuiz = async (courseId) => {
      await deleteById("quizzes", props.quizId);
      router.push({ name: "MyCourseDetails", params: { id: courseId } });
    };

    const showEditQuizModal = ref(false);

    const toggleEditQModal = () => {
      showEditQuizModal.value = !showEditQuizModal.value;
    };

    return {
      quiz,
      deleteQuiz,
      showEditQuizModal,
      toggleEditQModal,
    };
  },
};
</script>

<style scoped>
.quiz-info {
  padding: 5px;
  background: rgb(77, 229, 240);
  border-radius: 3px;
  cursor: pointer;
}

form {
  background: white;
  max-width: 40%;
}

.questions-scroll {
  /* max-height: 450px; */
  overflow: auto;
  max-width: 80%;
  margin: 0px auto;
}
</style>