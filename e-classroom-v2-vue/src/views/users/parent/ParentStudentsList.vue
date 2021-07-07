<template>
  <div class="container">
    <div class="parent-stList">
      <h1>My students</h1>
      <div class="basic-grid">
        <div v-for="student in students" :key="student.id">
          <router-link
            :to="{ name: 'ParentStDetails', params: { studId: student.id } }"
          >
            <div class="par-student">
              <h1>{{ student.firstName }} {{ student.lastName }}</h1>
              <h2>Class: {{ student.studentClass.name }}</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
    const { getSubItems } = useCRUD();
    const store = useStore();

    const students = ref([]);

    const getParentStudents = async () => {
      let parent = store.getters["getLoggedUser"];
      students.value = await getSubItems("students", "parent", parent.id);
    };

    onMounted(() => {
      getParentStudents();
    });

    return { students };
  },
};
</script>

<style scoped>
.parent-stList {
  color: cyan;
  padding: 10px;
  background: rgb(43, 78, 102);
}

.par-student {
  background: white;
  border-radius: 10px;
  color: indigo;
  padding: 8px;
}
</style>