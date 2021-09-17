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
      <div class="sclasses">
        <div v-for="scClass in scClasses" :key="scClass.id">
          <router-link
            active-class="activeSC"
            style="color: darkblue"
            :to="{
              name: 'ScClassDetails',
              params: { id: scClass.id },
            }"
          >
            <button>{{ scClass.name }}</button>
          </router-link>
        </div>
      </div>

      <router-view :key="$route.path" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid indigo;
  background: rgb(68, 66, 204);
  margin: 4px;
}

.sclasses button {
  color: rgb(228, 219, 235);
  background: rgb(4, 33, 70);
  padding: 5px 20px;
  border-radius: 0px;
}

.sc-card {
  border-radius: 5px;
  /* margin: 10px; */
  padding: 10px;
  border: 1px solid darkblue;
  margin: 5px;
}

.activeSC button {
  color: darkblue;
  background: rgb(156, 175, 236);
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.card {
  display: inline-block;
}
</style>