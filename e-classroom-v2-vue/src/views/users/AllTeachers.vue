<template>
  <div class="teachers-info">
    <h1>All teachers</h1>
    <h2>Number of teachers: {{ teachers.length }}</h2>
    <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link>
  </div>
  <div class="teachers" v-for="teacher in teachers" :key="teacher.id">
    <div class="teacher">
      <h1>Full Name: {{ teacher.firstName }} {{ teacher.lastName }}</h1>
      <h2>Email: {{ teacher.email }}</h2>
      <h3>Subjects: {{ teacher.subjects }}</h3>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

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
  background: darkkhaki;
  padding: 10px;
}
.teachers {
  background: blue;
  padding: 10px;
}
.teacher {
  background: white;
  padding: 10px;
}
</style>