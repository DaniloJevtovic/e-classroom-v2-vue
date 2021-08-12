<template>
  <div>
    <div class="quizDetails">
      <div class="container-header">
        <button @click.prevent="$router.go(-1)">Back to quizzes</button>
        <button @click="view = !view">view</button>
        <!-- <div v-if="showModal">
          <Modal
            :propsPodaci="results.length"
            :props2="results.length"
            theme="sale"
            @zatvoriModal="toggleModal"
          />
        </div>
        <button @click="toggleModal">Show modal</button> -->
      </div>

      <div class="container-body">
        <div class="quiz-info">
          <h2>Quiz: {{ quizDetails.name }}</h2>
          <p>Instructions: {{ quizDetails.instructions }}</p>
          <h4>Duration: {{ quizDetails.duration }} min</h4>
        </div>

        <div v-if="view">
          <div v-for="result in results" :key="result.id">
            <div class="st-res">
              <h2>
                {{ result.student.firstName }} {{ result.student.lastName }}
              </h2>
              <h3>Points: {{ result.points }} / ?</h3>

              <!-- prikaz detalja rezultata -->
              <div v-if="result.collapsed">
                <student-quiz-results :result="result"></student-quiz-results>
              </div>

              <button
                v-if="!result.collapsed"
                @click="result.collapsed = !result.collapsed"
              >
                View details
              </button>

              <button v-else @click="result.collapsed = !result.collapsed">
                Hide details
              </button>

              <router-link
                :to="{
                  name: 'NewMessage',
                  params: { reciverId: result.student.id },
                }"
              >
                <button>Contact Student</button>
              </router-link>

              <router-link
                v-if="result.student.stParent"
                :to="{
                  name: 'NewMessage',
                  params: { reciverId: result.student.stParent.id },
                }"
              >
                <button>Contact parent</button>
              </router-link>
            </div>
          </div>
        </div>

        <!-- tabelarni prikaz rezultata -->
        <div v-else>
          <table>
            <thead>
              <td>#</td>
              <td>Student</td>
              <td>Points</td>
              <td>Actions</td>
            </thead>
            <tr v-for="(result, index) in results" :key="result.id">
              <td>{{ index + 1 }}.</td>
              <td>
                {{ result.student.firstName }} {{ result.student.lastName }}
              </td>
              <td>
                {{ result.points }}
              </td>
              <td>
                <button>details</button>
                <button>Contact parent</button>
                <button>Contact student</button>
              </td>

              <!-- <div v-if="result.collapsed">
                <student-quiz-results :result="result"></student-quiz-results>
              </div>

              <button
                v-if="!result.collapsed"
                @click="result.collapsed = !result.collapsed"
              >
                View details
              </button>

              <button v-else @click="result.collapsed = !result.collapsed">
                Hide details
              </button> -->
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

import StudentQuizResults from "../student/res/StudentQuizResults.vue";
import Modal from "../../../components/Modal.vue";

export default {
  components: { Modal },
  props: ["quizId"],
  components: { StudentQuizResults },
  setup(props) {
    const { getSubItems, getById } = useCRUD();

    const quizDetails = ref("");
    const results = ref([]);

    const getQuizDetails = async () => {
      quizDetails.value = await getById("quizzes", props.quizId);
    };

    const getResults = async () => {
      results.value = await getSubItems("results", "quiz", props.quizId);

      //prolazim kroz sve rezultate da bi im dodao atribut - collapsed
      //taj atribut nemam na bekendu a na frontednu ce mi posluziti
      //da znam za koji rezultat su prikazani detalji, da ne bi sve otovorilo odjednom
      results.value.forEach((element) => {
        element.collapsed = false;
      });
    };

    onMounted(() => {
      getQuizDetails();
      getResults();
    });

    const view = ref(true);

    const showModal = ref(false);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    return { quizDetails, results, view, showModal, toggleModal };
  },
};
</script>

<style scoped>
.quizDetails {
  background: rgb(80, 152, 211);
}

.st-res {
  background: rgb(250, 250, 250);
  margin: 10px;
  padding: 10px;
}
</style>