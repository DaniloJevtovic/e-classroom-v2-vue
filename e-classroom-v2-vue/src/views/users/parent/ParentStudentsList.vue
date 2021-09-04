<template>
  <div class="container">
    <div class="container-header">
      <h3>My childrens</h3>
      <button class="pill-button">view</button>
    </div>
    <div class="parent-stList">
      <div class="basic-grid">
        <div v-for="student in students" :key="student.id">
          <router-link
            :to="{ name: 'ParentStDetails', params: { studId: student.id } }"
          >
            <div class="par-student">
              <h2>{{ student.firstName }} {{ student.lastName }}</h2>
              <h3>Class: {{ student.studentClass.name }}</h3>
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
  padding: 3px;
  border: 1px solid darkblue;
}

.par-student {
  /* background: cyan; */
  border-radius: 4px;
  color: darkblue;
  padding: 8px;
  border: 1px solid darkblue;
  text-align: center;
}
</style>