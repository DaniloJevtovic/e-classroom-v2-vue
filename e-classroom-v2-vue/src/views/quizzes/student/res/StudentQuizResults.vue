<template>
  <div class="student-res">
    <div class="res-score">
      <!-- <h1 v-if="result.points < 0">Your Score: 0 points / ?</h1>
      <h1 v-else>Your Score: {{ result.points }} points / ?</h1> -->
      <h2>Score: {{ result.points }} / {{ result.quiz.totalPoints }} points</h2>

      <div v-if="checkLoggedUser() && !edit">
        <button @click="edit = !edit">Edit points</button>
      </div>

      <div class="edit-points" v-else-if="checkLoggedUser() && edit">
        <h3>New Score</h3>

        <input
          type="number"
          v-model="pointsToEdit"
          style="width: 30%; text-align: center"
        />
        <button @click="updatePoints">Save</button>
        <button @click="cancelUpdate">Cabcel</button>
      </div>
    </div>

    <!-- ucenikovi odgovori -->
    <student-res-questions :quizId="result.quiz.id" :resId="result.id">
    </student-res-questions>

    <!-- komentari na kviz -->
    <student-res-comments :resId="result.id"></student-res-comments>
  </div>
</template>

<script>
import StudentResQuestions from "./StudentResQuestions.vue";
import StudentResComments from "./StudentResComments.vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["result"],
  components: { StudentResQuestions, StudentResComments },
  setup(props) {
    const store = useStore();

    const { editById } = useCRUD();

    const checkLoggedUser = () => {
      let loggedUser = store.getters["getLoggedUser"];

      if (loggedUser.authorities[0].authority == "ROLE_TEACHER") {
        console.log(loggedUser);
        return true;
      } else {
        return false;
      }
    };

    const edit = ref(false);

    const pointsToEdit = ref(props.result.points);

    const updatePoints = async () => {
      console.log("vrijednost poena:", pointsToEdit.value);

      let res = await editById(
        "results/updatePoints",
        props.result.id,
        pointsToEdit.value,
        false,
        true
      );

      console.log("rezultate", res);

      props.result.points = res.points;

      edit.value = !edit.value;
    };

    const cancelUpdate = () => {
      pointsToEdit.value = props.result.points;
      edit.value = !edit.value;
    };

    return { checkLoggedUser, edit, updatePoints, pointsToEdit, cancelUpdate };
  },
};
</script>

<style scoped>
.student-res {
  background: rgb(0, 217, 255);
  margin: 1px;
  border: 1px solid rebeccapurple;
}

.res-score {
  background: rgb(0, 255, 106);
  padding: 3px;
}

.edit-points {
  padding: 4px;
}
</style>