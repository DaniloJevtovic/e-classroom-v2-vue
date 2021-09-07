<template>
  <div class="container">
    <div class="container-header">
      <!-- <h2>All courses</h2> -->
      <router-link :to="{ name: 'NewCourse' }">
        <button>New Course</button>
      </router-link>
      <router-link :to="{ name: 'NewSchoolClass' }">
        <button>New ScClass</button>
      </router-link>
      <button @click="view = !view">view</button>
      <input type="text" placeholder="search" />
    </div>

    <div class="container-body">
      <div v-if="view">
        <!-- predmeti razvrstani po razredima -->
        <sc-classes></sc-classes>
      </div>

      <div v-else>
        <!-- tabelarni prikaz predmeta -->
        <AllCoursesTable />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ScClasses from "./ScClasses.vue";
import AllCoursesTable from "./AllCoursesTable.vue";

export default {
  components: { ScClasses, AllCoursesTable },
  setup() {
    return { view: ref(true) };
  },
};
</script>

<style scoped>
input {
  margin: 0;
  width: 75%;
}
</style>