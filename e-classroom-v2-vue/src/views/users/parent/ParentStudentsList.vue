<template>
  <div class="container">
    <div class="parent-stList">
      <h1>My students</h1>
      <div v-for="student in students" :key="student.id">
        <div>
          <router-link
            :to="{ name: 'ParentStDetails', params: { studId: student.id } }"
          >
            <h1>{{ student.firstName }} {{ student.lastName }}</h1>
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
  background: oldlace;
}
</style>