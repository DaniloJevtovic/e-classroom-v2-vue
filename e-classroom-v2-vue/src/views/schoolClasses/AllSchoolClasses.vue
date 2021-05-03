<template>
  <div class="container">
    <div class="container-header">
      <router-link :to="{ name: 'NewSchoolClass' }">
        <button>New School Class</button>
      </router-link>
    </div>

    <div class="container-body">
      <h2>All School Classes</h2>

      <!-- <div class="scClasses" v-for="scClass in scClasses" :key="scClass.id">
        <router-link
          :to="{ name: 'ScClassDetails', params: { id: scClass.id } }"
        >
          <button>
            Name: {{ scClass.name }}
            <hr />
            Description: {{ scClass.description }}
          </button>
        </router-link>
      </div> -->

      <div class="basic-grid">
        <div class="sc-card" v-for="scClass in scClasses" :key="scClass.id">
          <router-link
            :to="{ name: 'ScClassDetails', params: { id: scClass.id } }"
          >
            <h1>Name: {{ scClass.name }}</h1>

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
.card {
  background: cyan;
}

.sc-card {
  background: violet;
  margin: 10px;
  padding: 10px;
  border: 3px solid white;
}
</style>