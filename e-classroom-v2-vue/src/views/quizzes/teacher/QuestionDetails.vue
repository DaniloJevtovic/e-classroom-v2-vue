<template>
  <div class="question-details">
    <div
      class="ques-display-old"
      v-if="!pitanje.isEdit"
      @click="pitanje.isEdit = !pitanje.isEdit"
    >
      <h3>
        {{ questionIndex + 1 }}. {{ question.question }} / Points:
        {{ question.points }}
      </h3>
    </div>
    <!-- 
    <div
      class="ques-display"
      v-if="!pitanje.isEdit"
      @click="pitanje.isEdit = !pitanje.isEdit"
    >
      <h3 style="text-align: left">
        {{ questionIndex + 1 }}. {{ question.question }}
      </h3>

      <p class="qPoints">Points: {{ question.points }}</p>
    </div> -->

    <div class="question" v-else>
      <form @submit.prevent="handleSubmit">
        <div class="qy">
          <h3>Question {{ questionIndex + 1 }}.</h3>
          <div>
            <button>save</button>
            <button @click.prevent="deleteQuestion(question.id)">delete</button>
          </div>
        </div>

        <textarea
          rows="1"
          v-model="question.question"
          placeholder="enter question"
          required
        >
        </textarea>

        <div class="points-type">
          <input
            type="number"
            v-model="question.points"
            placeholder="points"
            min="0"
            required
          />

          <select v-model="question.questionType" required>
            <option value="MULTIPLE_CHOICE">Multiple choice</option>
            <option value="TRUE_FALSE">True / False</option>
            <option value="FILL">Fill</option>
          </select>
        </div>

        <!-- <button>Save</button>
        <button @click.prevent="deleteQuestion(questionId)">Delete</button> -->
      </form>
    </div>

    <!-- lista odgovora za pitanje -->
    <answers-list :questionId="questionId"></answers-list>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import AnswersList from "./AnswersList.vue";

export default {
  props: ["questionId", "questionIndex", "pitanje"],
  components: { AnswersList },
  setup(props, context) {
    const { getById, deleteById, editById } = useCRUD();

    const question = ref("");
    const oldType = ref("");

    const getQuestion = async () => {
      question.value = await getById("questions", props.questionId);
      oldType.value = question.value.questionType;
    };

    const handleSubmit = async () => {
      let res = await editById(
        "questions",
        props.questionId,
        question.value,
        false,
        true
      );

      //ovdje bi trebalo kad se sacuvaju izmjene da ukoliko se promjeni tip pitanja
      //obrisu se predhodni odgovori. npr. ako je bio multiple choice a promjeni se na true/false
      //da se obrisu svi odgovori i kreiraju 2 nova pitanja - jedno true drugo false. ili ako je
      //odgovor da se dopuni da se obrisu svi odgovori za to pitanje

      if (oldType.value != res.questionType) {
        //brisanje odgovora ako je promjenjen tip pitanja

        //ako je tip pitanja true false kreiranje 2 nova prazna odg - jedan true drugi false
        if (res.questionType === "TRUE_FALSE") {
        }
      }

      oldType.value = res.questionType;

      props.pitanje.isEdit = !props.pitanje.isEdit;
    };

    const deleteQuestion = async (id) => {
      if (
        confirm(
          "Da li ste sigurni da zelite obrisati pitanje?" +
            " Brisanjem pitanja brisu se i svi odgovori za pitanje!"
        )
      ) {
        await deleteById("questions", id, false, true);
        //saljem id za brisanje iz liste roditeljskoj komponenti! - quiz details
        context.emit("deleteFromList", id);
      }
    };

    onMounted(() => {
      getQuestion();
    });

    return { question, deleteQuestion, handleSubmit };
  },
};
</script>

<style scoped>
.question-details {
  padding: 5px;
  border: 1px solid indigo;
  border-radius: 4px;
  margin: 3px;
}

.ques-display-old {
  color: hotpink;
  background: rgba(4, 4, 75, 0.808);
  padding: 5px;
  cursor: pointer;
}

.ques-display {
  color: hotpink;
  background: rgba(4, 4, 75, 0.808);
  padding: 5px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
}

.question {
  background: cyan;
}

form {
  /* min-width: 90%; */
  max-width: 100%;
  margin: 0px;
  padding: 5px;
}

.points-type {
  display: flex;
  gap: 1rem;
}

.qy {
  background: rgba(253, 83, 4, 0.918);
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.qPoints {
  margin-right: 5px;
  color: springgreen;
  border: 1px solid cyan;
}

button {
  background: rgb(53, 2, 50);
}
</style>