<template>
  <td>{{ index + 1 }}.</td>
  <td>{{ result.quiz.name }}</td>
  <td>{{ result.date }}</td>
  <td>{{ result.quiz.course.name }}</td>
  <td>
    {{ result.quiz.course.teacher.firstName }}
    {{ result.quiz.course.teacher.lastName }}
  </td>
  <td style="background: springgreen">
    {{ result.points }} / {{ result.quiz.totalPoints }}
  </td>
  <td>
    <ModalSlot v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h3>
          Quiz: {{ result.quiz.name }} | Course: {{ result.quiz.course.name }} |
          Teacher: {{ result.quiz.course.teacher.firstName }}
          {{ result.quiz.course.teacher.lastName }}
        </h3>
      </template>

      <!-- prikaz rezultata u modalu -->
      <template v-slot:body>
        <student-quiz-results :result="result"></student-quiz-results>
      </template>

      <template v-slot:footer>
        <h3>Date: {{ result.date }}</h3>
        <!-- <span>Solve duration: {{ result.solveDuration }} min</span> -->
      </template>
    </ModalSlot>

    <button
      type="button"
      class="pill-button"
      style="background: orange"
      @click="showModal"
    >
      Show result!
    </button>
  </td>
</template>

<script>
import { ref } from "vue";
import ModalSlot from "../../../../components/ModalSlot.vue";
import StudentQuizResults from "./StudentQuizResults.vue";

export default {
  props: ["result", "index"],
  components: { ModalSlot, StudentQuizResults },
  setup() {
    const isModalVisible = ref(false);

    const showModal = () => {
      isModalVisible.value = true;
    };
    const closeModal = () => {
      isModalVisible.value = false;
    };

    return { isModalVisible, showModal, closeModal };
  },
};
</script>

<style scoped>
</style>