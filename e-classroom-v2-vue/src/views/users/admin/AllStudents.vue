<template>
  <div class="students-info">
    <div>
      <h3>All students</h3>
      <!-- <h3>Number of students: {{ students.length }}</h3> -->
    </div>

    <input type="text" placeholder="filter by first and last name" />

    <div>
      <router-link :to="{ name: 'NewStudent' }">
        <button>New student</button>
      </router-link>
    </div>
  </div>

  <div>
    <table>
      <thead>
        <td>#</td>
        <td>Full Name</td>
        <td>Email</td>
        <!-- <td>St Class</td> -->
        <td>ROLE</td>
        <td>Message</td>
        <td>Details</td>
      </thead>
      <tr v-for="(student, index) in students.content" :key="student.id">
        <UserTable
          :user="student"
          :index="index + 1 + students.number * students.size"
        />

        <!-- <td>{{ index + 1 }}.</td>
        <td>{{ student.firstName }} {{ student.lastName }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.studentClass.name }}</td>
        <td>
          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: student.id },
            }"
          >
            <button>Send message</button>
          </router-link>
        </td>
        <td>
          <router-link
            :to="{ name: 'StUserDetailsAdmin', params: { studId: student.id } }"
          >
            <button>Details</button>
          </router-link>
        </td> -->
      </tr>
    </table>

    <!-- dugmici za paginaciju -->
    <div class="page-buttons">
      <div v-for="(but, index) in students.totalPages" :key="but.id">
        <button
          @click="switchPage(index), (selectedButton = index)"
          :class="{ highlight: index == selectedButton }"
        >
          {{ but }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import UserTable from "./UserTable.vue";

export default {
  components: { UserTable },
  setup() {
    const { getAll } = useCRUD();

    const students = ref([]);

    const getStudents = async () => {
      students.value = await getAll("students/page");
    };
    onMounted(getStudents);

    const switchPage = async (page) => {
      students.value = await getAll("students/page" + "?page=" + page);
    };

    return { students, switchPage, selectedButton: ref("") };
  },
};
</script>

<style scoped>
.students-info {
  background: rgb(5, 181, 250);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

input {
  margin: 0px;
}

.page-buttons {
  padding: 5px;
  display: flex;
}

.highlight {
  background: hotpink;
}
</style>