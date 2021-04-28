<template>
  <div class="question-details">
    <div class="question">
      <h2>Question: {{ question.question }}</h2>
      <h3>Points: {{ question.points }}</h3>
      <router-link
        :to="{ name: 'NewAnswer', params: { questionId: questionId } }"
      >
        <button>New Answer</button>
      </router-link>

      <router-link :to="{ name: 'EditQuestion', params: { questionId } }">
        <button>Edit</button>
      </router-link>

      <button @click="deleteQuestion(questionId)">Delete</button>
    </div>
    <div class="answers" v-for="(answer, index) in answers" :key="answer.id">
      {{ index + 1 }}. {{ answer.answer }} - corect? - {{ answer.correct }}

      <router-link
        :to="{
          name: 'EditAnswer',
          params: { questionId, answerId: answer.id },
        }"
      >
        <button>Edit</button>
      </router-link>

      <button @click="deleteAnswer(answer.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["questionId"],
  setup(props, context) {
    const { getById, getSubItems, deleteById } = useCRUD();

    const question = ref("");

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
    };

    const answers = ref([]);

    const getAnswersForQuestion = async () => {
      answers.value = await getSubItems(
        "answers",
        "question",
        props.questionId
      );
    };

    const deleteQuestion = async (id) => {
      if (
        confirm(
          "Da li ste sigurni da zelite obrisati pitanje?" +
            "Brisanjem pitanja brisu se i svi odgovori za pitanje!"
        )
      ) {
        await deleteById("questions", id);
        //saljem id za brisanje iz liste roditeljskoj komponenti! - quiz details
        context.emit("deleteFromList", id);
      }
    };

    const deleteAnswer = async (id) => {
      if (confirm("Da li ste sigurni da zelite obrisati odgovor?")) {
        await deleteById("answers", id);

        let index = answers.value.findIndex((answer) => answer.id === id);
        answers.value.splice(index, 1);
      }
    };

    onMounted(() => {
      getQuestion();
      getAnswersForQuestion();
    });

    return { question, answers, deleteQuestion, deleteAnswer };
  },
};
</script>

<style>
.question-details {
  padding: 20px;
  border: 2px solid indigo;
  border-radius: 10px;
}

.question {
  background: cyan;
}
.answers {
  background: yellow;
}
</style>