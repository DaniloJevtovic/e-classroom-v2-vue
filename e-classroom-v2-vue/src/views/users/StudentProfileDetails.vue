<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back</button>
    </div>
    <div v-if="studentDetails" class="studentDetails">
      <div class="student-info">
        <h1>
          Full Name: {{ studentDetails.firstName }}
          {{ studentDetails.lastName }}
        </h1>
        <h2>Class: {{ studentDetails.studentClass.name }}</h2>
        <h2>Email: {{ studentDetails.email }}</h2>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { senderId: loggedUser.id, reciverId: studentDetails.id },
          }"
        >
          <button>Send message</button>
        </router-link>
      </div>

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
.studentDetails {
  background: orange;
  padding: 15px;
}

.student-info {
  background: deepskyblue;
  padding: 15px;
  border-radius: 10px;
}

.parent-details {
  background: yellowgreen;
  padding: 15px;
}

.studentResults {
  background: indigo;
  padding: 15px;
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