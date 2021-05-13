<template>
  <div class="container">
    <div class="container-header">
      <h2>My Results</h2>
    </div>

    <div class="container-body">
      <div class="student-results">
        <div v-for="result in results" :key="result.id">
          <div class="st-result">
            <h2>Quiz: {{ result.quiz.name }}</h2>
            <h3>Subject: {{ result.quiz.course.name }}</h3>
            <h3>Points: {{ result.points }} / ?</h3>
          </div>
        </div>
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