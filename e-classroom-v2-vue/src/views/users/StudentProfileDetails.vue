<template>
  <div class="container">
    <div class="container-header">
      
    </div>
    <div v-if="studentDetails" class="studentDetails">
      <h2>
        Full Name: {{ studentDetails.firstName }} {{ studentDetails.lastName }}
      </h2>
      <h3>Class: {{ studentDetails.studentClass.name }}</h3>
    </div>
    <div class="studentResults">
      <div v-for="result in results" :key="result.id">
        <div class="st-result">
          <h2>Quiz: {{ result.quiz.name }}</h2>
          <h3>Subject: {{ result.quiz.course.name }}</h3>
          <h3>Points: {{ result.points }} / ?</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();

    const studentDetails = ref("");
    const results = ref([]);

    const getStudent = async () => {
      studentDetails.value = await getById("students", props.id);
    };

    const getResults = async () => {
      results.value = await getSubItems("results", "student", props.id);
    };

    onMounted(() => {
      getStudent();
      getResults();
    });

    return { studentDetails, results };
  },
};
</script>

<style scoped>
.studentDetails {
  background: orange;
}

.studentResults {
  background: sienna;
  margin: 20px;
}

.st-result {
  margin: 5px;
  background: silver;
}

</style>