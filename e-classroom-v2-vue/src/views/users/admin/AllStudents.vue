<template>
  <div class="students-info">
    <h1>All students</h1>
    <h2>Number of students: {{ students.length }}</h2>
    <router-link :to="{ name: 'NewStudent' }">
      <button>New student</button>
    </router-link>
    <div class="search-students">
      <input type="text" placeholder="filter by name" />
      <input type="text" placeholder="filter by stClass" />
    </div>
  </div>
  <div class="studentss" v-for="student in students" :key="student.id">
    <div class="studentt">
      <h1>Full Name: {{ student.firstName }} {{ student.lastName }}</h1>
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
  background: darkkhaki;
  padding: 10px;
}
.studentss {
  background: blue;
  padding: 10px;
}
.studentt {
  background: white;
  padding: 10px;
}

.search-students {
  display: flex;
}

input {
  margin: 10px;
}
</style>