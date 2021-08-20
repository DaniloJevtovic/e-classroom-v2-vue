<template>
  <div class="container">
    <div class="container-header">
      <router-link :to="{ name: 'NewSchoolClass' }">
        <button>New School Class</button>
      </router-link>

      <div v-if="showNewScModal">
        <NewScModal @zatvoriModal="toggleModal" @dodajUListu="addToList">
        </NewScModal>
      </div>
      <button @click="toggleModal">New SC Modal</button>
    </div>

    <div class="container-body">
      <!-- <h2>All School Classes</h2>   -->

      <div class="sclasses">
        <div v-for="scClass in scClasses" :key="scClass.id">
          <div class="sc-card">
            <router-link
              style="color: darkblue"
              :to="{
                name: 'ScClassDetails',
                params: { id: scClass.id },
              }"
            >
              <h2>Name: {{ scClass.name }}</h2>
              <h2>Description: {{ scClass.description }}</h2>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import NewScModal from "./NewScModal.vue";

export default {
  components: { NewScModal },
  setup() {
    const scClasses = ref([]);
    const { getAll } = useCRUD();

    const getAllScClasses = async () => {
      scClasses.value = await getAll("scClasses");
    };

    const showNewScModal = ref(false);

    const toggleModal = () => {
      showNewScModal.value = !showNewScModal.value;
    };

    const addToList = (res) => {
      scClasses.value.push(res);
      console.log("reszu", res);
    };

    onMounted(getAllScClasses);

    return {
      scClasses,
      addToList,
      showNewScModal,
      toggleModal,
    };
  },
};
</script>

<style scoped>
.sclasses {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 5px;
}

.sc-card {
  border-radius: 5px;
  /* margin: 10px; */
  padding: 10px;
  border: 1px solid darkblue;
  margin: 5px;
}
</style>