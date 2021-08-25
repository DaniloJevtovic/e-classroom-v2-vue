<template>
  <div>
    <h3 v-if="result">Your score: {{ result.points }} points</h3>
    <h3 v-else>not working</h3>
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
h3 {
  background: yellow;
}
</style>