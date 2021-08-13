<template>
  <div class="container">
    <h3 style="background: hotpink">Courses by SClass</h3>

    <div class="container-body">
      <div class="sclasses">
        <div v-for="scClass in scClasses" :key="scClass.id">
          <div class="sc-card">
            <router-link
              style="color: darkblue"
              :to="{ name: 'ScClassDetails', params: { id: scClass.id } }"
            >
              <h3>ScClass: {{ scClass.name }}</h3>
              <p>Description: {{ scClass.description }}</p>
            </router-link>

            <!-- ucitavam sve predmete za razred -->
            <sc-courses :id="scClass.id"></sc-courses>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import ScCourses from "./ScCourses.vue";

export default {
  components: { ScCourses },
  setup() {
    const scClasses = ref([]);
    const { getAll } = useCRUD();

    const getAllScClasses = async () => {
      scClasses.value = await getAll("scClasses");
    };

    onMounted(getAllScClasses);

    return { scClasses };
  },
};
</script>

<style scoped>
.sclasses {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 5px;
}

.sc-card {
  border-radius: 5px;
  /* margin: 10px; */
  padding: 5px;
  border: 1px solid indigo;
  background: cyan;
  margin: 5px;
}
</style>