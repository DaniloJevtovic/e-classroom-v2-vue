<template>
  <div class="container">
    <div class="container-header">
      <h3>Results for course</h3>
    </div>

    <div class="container-body">
      <div v-if="results.length">
        <table>
          <thead>
            <td>#</td>
            <td>Quiz</td>
            <td>Date / Time</td>
            <td>Subject</td>
            <td>Teacher</td>
            <td>Points</td>
            <td>Details</td>
          </thead>
          <tr
            v-for="(result, index) in results"
            :key="result.id"
            @click="goToResult(result)"
          >
            <StudentAllResultTable :result="result" :index="index" />
          </tr>
        </table>
      </div>
      <div v-else>
        <h3>No results</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import useCRUD from "@/composables/useCRUD.js";

import StudentAllResultTable from "./StudentAllResultTable.vue";

export default {
  components: { StudentAllResultTable },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { getAll } = useCRUD();

    const results = ref([]);

    const getResults = async () => {
      let student = store.getters["getLoggedUser"];

      results.value = await getAll(
        "results/course/" + route.params.id + "/student/" + student.id
      );
    };

    onMounted(() => {
      getResults();
    });

    return { results };
  },
};
</script>

<style scoped>
</style>