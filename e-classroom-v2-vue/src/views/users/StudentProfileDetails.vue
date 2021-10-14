<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back</button>
    </div>
    <h3 style="text-align: center">Student details</h3>
    <!-- detalji o uceniku -->
    <div v-if="studentDetails" class="studentDetails">
      <div class="student-info">
        <h3>
          Full Name: {{ studentDetails.firstName }}
          {{ studentDetails.lastName }}
        </h3>
        <h3>Class: {{ studentDetails.studentClass.name }}</h3>
        <h3>Email: {{ studentDetails.email }}</h3>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { senderId: loggedUser.id, reciverId: studentDetails.id },
          }"
        >
          <button>Send message</button>
        </router-link>

        <button @click="toggleMessageModal">Send message</button>

        <!-- modal za slanje poruke uceniku -->
        <div v-if="showNewMessageModal">
          <NewMessageModal
            :reciverId="studentDetails.id"
            @zatvoriModal="toggleMessageModal"
          >
          </NewMessageModal>
        </div>
      </div>

      <!-- detalji o roditelju -->
      <div v-if="studentDetails.stParent" class="parent-details">
        <h3>
          Parent: {{ studentDetails.stParent.firstName }}
          {{ studentDetails.stParent.lastName }}
        </h3>
        <h3>Parent email: {{ studentDetails.stParent.email }}</h3>
        <router-link
          :to="{
            name: 'NewMessage',
            params: {
              senderId: loggedUser.id,
              reciverId: studentDetails.stParent.id,
            },
          }"
        >
          <!-- da roditelje samom sebi ne salje poruke :) -->
          <button v-if="studentDetails.stParent.id != loggedUser.id">
            Send message
          </button>
        </router-link>

        <!-- ulogovani rodelj moze sebi da mjenja podatke -->
        <router-link :to="{ name: 'UserProfile' }">
          <button v-if="studentDetails.stParent.id == loggedUser.id">
            Update My Data
          </button>
        </router-link>
      </div>

      <div v-else>
        <router-link
          v-if="loggedUser"
          :to="{
            name: 'NewParent',
            params: {
              studId: studentDetails.id,
              studName: studentDetails.firstName,
            },
          }"
        >
          <button v-if="loggedUser.authorities[0].authority === 'ROLE_ADMIN'">
            Add parent
          </button>
        </router-link>
      </div>
    </div>

    <!-- rezultati -->
    <div class="studentResults" v-if="results.length">
      <h2>
        Results
        <span>
          <button class="pill-button" @click="view = !view">view</button>
        </span>
      </h2>
      <div v-if="view">
        <div v-for="result in results" :key="result.id">
          <div class="st-result">
            <h2>Quiz: {{ result.quiz.name }}</h2>
            <h3>Subject: {{ result.quiz.course.name }}</h3>
            <h3>
              Teacher: {{ result.quiz.course.teacher.firstName }}
              {{ result.quiz.course.teacher.lastName }}
            </h3>
            <h3 class="points">
              Points: {{ result.points }} / {{ result.quiz.totalPoints }}
            </h3>
            <p>Date: {{ result.date }}</p>
          </div>
        </div>
      </div>

      <div v-else>
        <table>
          <thead>
            <td>#</td>
            <td>Quiz</td>
            <td>Subject</td>
            <td>Teacher</td>
            <td>Date / Time</td>
            <td>Points</td>
          </thead>
          <tr
            v-for="(result, index) in results"
            :key="result.id"
            @click="goToResult(result)"
          >
            <td>{{ index + 1 }}.</td>
            <td>{{ result.quiz.name }}</td>

            <td>{{ result.quiz.course.name }}</td>
            <td>
              {{ result.quiz.course.teacher.firstName }}
              {{ result.quiz.course.teacher.lastName }}
            </td>
            <td>{{ result.date }}</td>
            <td style="background: springgreen">
              {{ result.points }} / {{ result.quiz.totalPoints }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";
import NewMessageModal from "../messages/NewMessageModal.vue";

export default {
  props: ["studId"],
  components: { NewMessageModal },
  setup(props) {
    const { getById, getSubItems } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const studentDetails = ref("");
    const results = ref([]);

    const getStudent = async () => {
      studentDetails.value = await getById("students", props.studId);
    };

    const getResults = async () => {
      results.value = await getSubItems("results", "student", props.studId);
    };

    onMounted(() => {
      getStudent();
      getResults();
    });

    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    return {
      studentDetails,
      results,
      loggedUser,
      showNewMessageModal,
      toggleMessageModal,
      view: ref(false),
    };
  },
};
</script>

<style scoped>
.container {
  /* background: rgb(6, 33, 92); */
  /* margin-top: 5px; */
  padding: 10px;
}

.studentDetails {
  /* background: rgb(0, 132, 255); */
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  border: 1px solid darkblue;
}

.student-info {
  background: rgba(0, 191, 255, 0.295);
  color: rgb(10, 10, 70);
  padding: 10px;
}

.parent-details {
  /* color: cyan; */
  background: rgba(81, 118, 255, 0.671);
  padding: 15px;
}

.studentResults {
  /* background: rgb(139, 10, 231); */
  border: 1px solid darkblue;
  padding: 10px;
}

.st-result {
  margin: 5px;
  background: cyan;
  padding: 15px;
}

.points {
  /* width: 200px; */
  color: white;
  background: rgb(28, 31, 61);
}
</style>