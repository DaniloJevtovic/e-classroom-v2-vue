<template>
  <td>{{ index }}.</td>
  <td>{{ quiz.name }}</td>
  <!-- <td>{{ quiz.instructions }}</td> -->
  <td>{{ quiz.duration }} min</td>
  <td>{{ quiz.totalPoints }}</td>
  <td>{{ quiz.quizStatus }}</td>
  <td>
    <button @click="toggleEditQModal">Edit</button>
    <div v-if="showEditQuizModal">
      <EditQuizModal :quiz="quiz" @zatvoriModal="toggleEditQModal">
      </EditQuizModal>
    </div>

    <router-link
      :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
    >
      <button>details</button>
    </router-link>
    <router-link :to="{ name: 'ProfResForQuiz', params: { quizId: quiz.id } }">
      <button>results</button>
    </router-link>
  </td>
</template>

<script>
import { ref, onMounted } from "vue";
import EditQuizModal from "./EditQuizModal.vue";

export default {
  props: ["index", "quiz", "id"],
  components: { EditQuizModal },
  setup() {
    const showEditQuizModal = ref(false);

    const toggleEditQModal = () => {
      showEditQuizModal.value = !showEditQuizModal.value;
    };

    return { showEditQuizModal, toggleEditQModal };
  },
};
</script>

<style>
</style>