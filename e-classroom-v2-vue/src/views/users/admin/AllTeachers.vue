<template>
  <div class="teachers-info">
    <div>
      <h3>All teachers</h3>
      <h3>Number of teachers: {{ teachers.length }}</h3>
    </div>

    <input type="text" placeholder="filter by first and last name" />

    <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link>
  </div>

  <!-- <div class="teachers">
    <div v-for="teacher in teachers" :key="teacher.id">
      <div class="teacher">
        <h3>{{ teacher.firstName }} {{ teacher.lastName }}</h3>
        <h3>Email: {{ teacher.email }}</h3>
        <h3>Subjects: {{ teacher.subjects }}</h3>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { reciverId: teacher.id },
          }"
        >
          <button>Send message</button>
        </router-link>
      </div>
    </div>
  </div> -->

  <div>
    <table>
      <thead>
        <td>Full Name</td>
        <td>Email</td>
        <td>Subjects</td>
        <td>Message</td>
      </thead>
      <tr v-for="teacher in teachers" :key="teacher.id">
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
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const teachers = ref([]);

    const getTeachers = async () => {
      teachers.value = await getAll("teachers");
    };
    onMounted(getTeachers);

    return { teachers };
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
.teachers {
  background: blue;
  padding: 3px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.teacher {
  background: white;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
}

input {
  margin: 0px;
}
</style>