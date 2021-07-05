<template>
  <div class="students-info">
    <h2>All students</h2>
    <h2>Number of students: {{ students.length }}</h2>
    <router-link :to="{ name: 'NewStudent' }">
      <button>New student</button>
    </router-link>
    <div class="search-students">
      <input type="text" placeholder="filter by name" />
      <input type="text" placeholder="filter by stClass" />
    </div>
  </div>
  <div class="studentss">
    <div v-for="student in students" :key="student.id">
      <div class="studentt">
        <h2>{{ student.firstName }} {{ student.lastName }}</h2>
        <h2>Email: {{ student.email }}</h2>
        <h3>StClass: {{ student.studentClass.name }}</h3>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { reciverId: student.id },
          }"
        >
          <button>Send message</button>
        </router-link>

        <router-link
          :to="{ name: 'StUserDetailsAdmin', params: { studId: student.id } }"
        >
          <button>Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const students = ref([]);

    const getStudents = async () => {
      students.value = await getAll("students");
    };
    onMounted(getStudents);

    return { students };
  },
};
</script>

<style scoped>
.students-info {
  background: rgb(57, 51, 133);
  padding: 10px;
}
.studentss {
  background: blue;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.studentt {
  background: white;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
}

.search-students {
  display: flex;
}

input {
  margin: 10px;
}
</style>