<template>
  <form @submit.prevent="handleSubmit">
    <h2>New Quiz</h2>
    <input type="text" v-model="newQuiz.name" placeholder="name" required />
    <textarea
      rows="5"
      v-model="newQuiz.instructions"
      placeholder="instructions"
    ></textarea>
    <input
      type="number"
      v-model="newQuiz.duration"
      placeholder="duration"
      required
    />
    <button>Create</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  setup(props) {
    const { save } = useCRUD();
    const router = useRouter();

    const newQuiz = reactive({
      name: "",
      instructions: "",
      duration: "",
      courseId: props.id,
    });

    const handleSubmit = async () => {
      console.log(newQuiz);
      const res = await save("quizzes", newQuiz, true, true);

      //preusmjerim ga na detalje kviza gdje mogu da mjenjam kviz i dodajem pitanja
      // router.push({name: 'QuizDetails', params: { id: props.id, quizId: res.id } })

      //router.go(-1);
    };
    return { newQuiz, handleSubmit };
  },
};
</script>

<style scoped>
/* form {
 min-width: 80%;
} */
</style>