<template>
  <div class="teachers-info">
    <h2>All teachers</h2>
    <h2>Number of teachers: {{ teachers.length }}</h2>
    <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link>
  </div>
  <div class="teachers">
    <div v-for="teacher in teachers" :key="teacher.id">
      <div class="teacher">
        <h2>{{ teacher.firstName }} {{ teacher.lastName }}</h2>
        <h2>Email: {{ teacher.email }}</h2>
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
  background: rgb(169, 198, 211);
  padding: 10px;
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
</style>