<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back to quizzes</button>
      <!-- <router-link :to="{ name: 'MyCourseDetails', params: { id: id } }">
        <button>Back to course</button>
      </router-link> -->
    </div>
    <div class="container-body">
      <div class="quiz-info">
        <h1>Name: {{ quizInfo.name }}</h1>
        <h2>Instructions: {{ quizInfo.instructions }}</h2>
        <h2>Duration: {{ quizInfo.duration }}</h2>
        <h2>QuizStatus: {{ quizInfo.status }}</h2>
        <h3>Total questions: {{ questions.length }}</h3>

        <router-link :to="{ name: 'EditQuiz', params: { quziId: quizId } }">
          <button>Edit</button>
        </router-link>

        <button @click="deleteQuiz">Delete</button>
      </div>

      <hr />

      <div class="questions">
        <h1>Questions</h1>
        <!-- <router-link :to="{ name: 'NewQuestion', params: { quizId: quizId } }">
          <button>New Question</button>
        </router-link> -->

        <div v-for="question in questions" :key="question.id">
          <question-details
            :questionId="question.id"
            @deleteFromList="deleteQuestion"
          ></question-details>
          <hr />
        </div>
        <button @click="addNewQuestionForm">New Question 222</button>
      </div>

      <!-- lista za nova pitanja kad se klikne na dugme da se doda pitanje -->
      <div
        class="new-questions-list"
        v-for="(newQuest, index) in newQuestionsList"
        :key="newQuest"
      >
        <div class="new-question">
          <form @submit.prevent="saveQuestion(newQuest, index)">
            <div class="flex-div">
              <select name="ans-type" v-model="newQuest.questionType" required>
                <option disabled value="">Select answer type</option>
                <option value="MULTIPLE_CHOICE">Multiple choice</option>
                <option value="TRUE_FALSE">True false</option>
                <option value="FILL">Fill</option>
              </select>
              <input
                type="number"
                v-model="newQuest.points"
                placeholder="points"
                required
              />
            </div>

            <input
              type="text"
              v-model="newQuest.question"
              placeholder="new question"
              required
            />

            <button>Save</button>
            <button @click.prevent="cancelQuestion(index)">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import QuestionDetails from "./QuestionDetails.vue";
import { useRouter } from "vue-router";

export default {
  props: ["id", "quizId"],
  components: { QuestionDetails },
  setup(props) {
    const { getById, getSubItems, deleteById, save } = useCRUD();
    const router = useRouter();

    const quizInfo = ref("");

    const questions = ref([]);

    const newQuestionsList = ref([]);

    const getQuiz = async () => {
      quizInfo.value = await getById("quizzes", props.quizId);
    };

    const deleteQuiz = async () => {
      await deleteById("quizzes", props.quizId);
      router.push({ name: "MyCourseDetails", params: { id: props.id } });
    };

    const getQuestionsForQuiz = async () => {
      questions.value = await getSubItems("questions", "quiz", props.quizId);
    };

    //brisanje iz liste (prikaz) - brisanje na bekendu je u question details komponenti!
    const deleteQuestion = (id) => {
      let index = questions.value.findIndex((question) => question.id === id);
      questions.value.splice(index, 1);
    };

    onMounted(() => {
      getQuiz();
      getQuestionsForQuiz();
    });

    const addNewQuestionForm = () => {
      newQuestionsList.value.push({
        question: "",
        points: "",
        quizId: props.quizId,
        questionType: "",
      });
    };

    const saveQuestion = async (question, index) => {
      console.log(question);

      let res = await save("questions", question);

      //console.log("odg", res);
      questions.value.push(res);

      // brisem iz liste novih pitanja - jer sam dodao na bekend
      newQuestionsList.value.splice(index, 1);
    };

    const cancelQuestion = (index) => {
      newQuestionsList.value.splice(index, 1);
    };

    return {
      quizInfo,
      questions,
      deleteQuiz,
      deleteQuestion,
      newQuestionsList,
      addNewQuestionForm,
      saveQuestion,
      cancelQuestion,
    };
  },
};
</script>

<style scoped>
.quiz-info {
  padding: 14px;
  border: 7px solid darkblue;
  background: blue;
  border-radius: 20px;
}

.questions {
  padding: 10px;
}

.new-question {
  background: rgb(70, 3, 50);
  padding: 10px;
}

form {
  background: springgreen;
  min-width: 90%;
}

input,
select {
  margin: 5px;
}

.flex-div {
  display: flex;
  min-width: 100%;
}
</style>