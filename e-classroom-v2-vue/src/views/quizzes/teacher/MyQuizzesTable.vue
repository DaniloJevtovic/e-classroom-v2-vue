<template>
  <td>{{ index }}.</td>
  <td>{{ quiz.name }}</td>
  <!-- <td>{{ quiz.instructions }}</td> -->
  <td>{{ quiz.duration }} min</td>
  <td>{{ quiz.numbOfQuestions }}</td>
  <td>{{ quiz.totalPoints }}</td>
  <td v-if="quiz.quizStatus === 'ACTIVE'" style="background: springgreen">
    {{ quiz.quizStatus }}
  </td>
  <td v-else style="background: orangered">{{ quiz.quizStatus }}</td>
  <td>
    <div>
      <button @click="toggleEditQModal">Edit</button>

      <router-link
        :to="{ name: 'QuizDetails', params: { id: id, quizId: quiz.id } }"
      >
        <button>details</button>
      </router-link>
      <router-link
        :to="{ name: 'ProfResForQuiz', params: { quizId: quiz.id } }"
      >
        <button>results</button>
      </router-link>
    </div>
  </td>

  <div v-if="showEditQuizModal">
    <EditQuizModal :quiz="quiz" @zatvoriModal="toggleEditQModal">
    </EditQuizModal>
  </div>
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