<template>
  <div class="container">
    <div class="container-header">
      <router-link :to="{ name: 'NewSchoolClass' }">
        <button>New School Class</button>
      </router-link>
    </div>

    <div class="container-body">
      <!-- <h2>All School Classes</h2>   -->

      <div class="basic-grid">
        <div class="sc-card" v-for="scClass in scClasses" :key="scClass.id">
          <router-link
          style="color: cyan"
            :to="{ name: 'ScClassDetails', params: { id: scClass.id } }"
          >
            <h2>Name: {{ scClass.name }}</h2>
            <h2>Description: {{ scClass.description }}</h2>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

export default {
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

.sc-card {
  background: rgb(30, 2, 49);
  border-radius: 5px;
  /* margin: 10px; */
  padding: 10px;
}
</style>