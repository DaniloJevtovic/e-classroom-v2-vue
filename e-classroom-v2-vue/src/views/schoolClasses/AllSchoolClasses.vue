<template>
  <div class="container">
    <div class="container-header">
      <router-link :to="{ name: 'NewSchoolClass' }">
        <button>New School Class</button>
      </router-link>
    </div>

    <div class="container-body">
      <h2>All School Classes</h2>

      <div class="scClasses" v-for="scClass in scClasses" :key="scClass.id">
        <router-link
          :to="{ name: 'ScClassDetails', params: { id: scClass.id } }"
        >
          <button>
            Name: {{ scClass.name }}
            <hr />
            Description: {{ scClass.description }}
          </button>
        </router-link>
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
.scClasses {
  display: inline;
}
</style>