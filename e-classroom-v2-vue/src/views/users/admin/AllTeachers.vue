<template>
  <div class="teachers-info">
    <div>
      <h3>All teachers</h3>
      <!-- <h3>Number of teachers: {{ teachers.length }}</h3> -->
    </div>

    <input type="text" placeholder="filter by first and last name" />

    <!-- <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link> -->
    <div>
      <button @click="toggleModal">New Teacher</button>
    </div>
  </div>

  <div v-if="showNewTeacherModal">
    <NewTeacherModal
      @zatvoriModal="toggleModal"
      @dodajUListu="addToList"
    ></NewTeacherModal>
  </div>

  <div>
    <table>
      <thead>
        <td>#</td>
        <td>Full Name</td>
        <td>Email</td>
        <!-- <td>Subjects</td> -->
        <td>ROLE</td>
        <td>Message</td>
        <td>Details</td>
      </thead>
      <tr v-for="(teacher, index) in teachers" :key="teacher.id">
        <UserTable :user="teacher" :index="index + 1" />
        <!-- <td>{{ index + 1 }}.</td>
        <td>{{ teacher.firstName }} {{ teacher.lastName }}</td>
        <td>{{ teacher.email }}</td>
        <td>{{ teacher.subjects }}</td>
        <td>
          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: teacher.id },
            }"
          >
            <button>Send message</button>
          </router-link>
        </td> -->
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import NewTeacherModal from "./NewTeacherModal.vue";
import UserTable from "./UserTable.vue";

export default {
  components: { NewTeacherModal, UserTable },
  setup() {
    const { getAll } = useCRUD();

    const teachers = ref([]);

    const getTeachers = async () => {
      teachers.value = await getAll("teachers");
    };
    onMounted(getTeachers);

    const showNewTeacherModal = ref(false);

    const toggleModal = () => {
      showNewTeacherModal.value = !showNewTeacherModal.value;
    };

    const addToList = (res) => {
      teachers.value.push(res);
    };

    return { teachers, showNewTeacherModal, toggleModal, addToList };
  },
};
</script>

<style scoped>
.teachers-info {
  background: rgb(5, 181, 250);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

input {
  margin: 0px;
}
</style>