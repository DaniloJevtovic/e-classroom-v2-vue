<template>
  <div class="container">
    <div class="container-header">
      <h2>My Results</h2>
    </div>

    <div class="container-body">
      <div v-if="results.length">
        <table>
          <thead>
            <td>Num</td>
            <td>Quiz</td>
            <td>Date</td>
            <td>Subject</td>
            <td>Teacher</td>
            <td>Points</td>
          </thead>
          <tr v-for="(result, index) in results" :key="result.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ result.quiz.name }}</td>
            <td>{{ result.date }}</td>
            <td>{{ result.quiz.course.name }}</td>
            <td>
              {{ result.quiz.course.teacher.firstName }}
              {{ result.quiz.course.teacher.lastName }}
            </td>
            <td style="background: springgreen">{{ result.points }}</td>
          </tr>
        </table>
      </div>
      <div v-else>
        <h2>No results</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import useCRUD from "@/composables/useCRUD.js";

export default {
  setup() {
    const store = useStore();
    const { getSubItems } = useCRUD();

    const results = ref([]);

    const getResults = async () => {
      let student = store.getters["getLoggedUser"];
      results.value = await getSubItems("results", "student", student.id);
    };

    onMounted(() => {
      getResults();
    });

    return { results };
  },
};
</script>

<style scoped>
.student-results {
  display: inline;
  margin: 2px;
}

.st-result {
  background: honeydew;
  border: 2px solid indigo;
  border-radius: 7px;
  padding: 7px;
  margin: 5px;
}
</style>