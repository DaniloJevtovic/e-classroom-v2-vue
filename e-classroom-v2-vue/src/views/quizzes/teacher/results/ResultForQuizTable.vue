<template>
  <td>{{ index + 1 }}.</td>
  <td>{{ result.student.firstName }} {{ result.student.lastName }}</td>
  <td>{{ result.points }} / {{ result.quiz.totalPoints }}</td>
  <td>
    <ModalSlot v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <div>
          <h3>
            Student: {{ result.student.firstName }}
            {{ result.student.lastName }}
            <span style="color: red">
              | Points: {{ result.points }} /
              {{ result.quiz.totalPoints }}</span
            >
          </h3>
        </div>
      </template>

      <!-- prikaz rezultata u modalu -->
      <template v-slot:body>
        <student-quiz-results :result="result"></student-quiz-results>
      </template>

      <template v-slot:footer>
        Date: {{ result.date }}
        <span>Solve duration: {{ result.solveDuration }} min</span>
      </template>
    </ModalSlot>

    <button type="button" class="btn" @click="showModal">Show result!</button>

    <!-- <button>Contact parent</button>
    <button>Contact student</button> -->
  </td>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../../composables/useCRUD.js";
import ModalSlot from "../../../../components/ModalSlot.vue";
import StudentQuizResults from "../../student/res/StudentQuizResults.vue";

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