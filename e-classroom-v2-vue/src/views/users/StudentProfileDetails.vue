<template>
  <div class="container">
    <button @click="$router.go(-1)">Back</button>

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

    <div class="studentResults">
      <h2>Results</h2>
      <div v-for="result in results" :key="result.id">
        <div class="st-result">
          <h2>Quiz: {{ result.quiz.name }}</h2>
          <h3>Subject: {{ result.quiz.course.name }}</h3>
          <h3>
            Teacher: {{ result.quiz.course.teacher.firstName }}
            {{ result.quiz.course.teacher.lastName }}
          </h3>
          <h3 class="points">Points: {{ result.points }} / ?</h3>
          <p>Date:</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";

export default {
  props: ["studId"],
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

    return { studentDetails, results, loggedUser };
  },
};
</script>

<style scoped>
.container {
  background: rgb(6, 33, 92);
  margin-top: 10px;
  padding: 10px;
}

.studentDetails {
  background: rgb(0, 132, 255);
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}

.student-info {
  background: deepskyblue;
  color: rgb(10, 10, 70);
  padding: 10px;
}

.parent-details {
  color: cyan;
  background: rgb(22, 52, 184);
  padding: 15px;
}

.studentResults {
  background: rgb(139, 10, 231);
  padding: 10px;
}

.st-result {
  margin: 5px;
  background: cyan;
  padding: 15px;
}

.points {
  /* width: 200px; */
  background: red;
}
</style>