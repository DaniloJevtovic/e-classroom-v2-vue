<template>
  <div>
    <h2 v-if="result">Your score: {{ result.points }} points</h2>
    <h2 v-else>not working</h2>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["quizId"],
  setup(props) {
    const { getSubSubItems } = useCRUD();
    const store = useStore();

    const student = store.getters["getLoggedUser"];
    const result = ref("");

    const getResults = async () => {
      result.value = await getSubSubItems(
        "results",
        "student",
        "quiz",
        student.id,
        props.quizId
      );
    };

    onMounted(() => {
      getResults();
    });

    return { result };
  },
};
</script>

<style scoped>
h2 {
  background: yellow;
}
</style>