<template>
  <div class="materials-info">
    <h3>Materials</h3>

    <input type="text" placeholder="search by name" />

    <!-- dodavanje materijala nova komponenta -->
    <!-- <router-link :to="{ name: 'NewMaterial', params: { id: id } }">
      <button>New Material</button>
    </router-link> -->

    <div>
      <button @click="toggleModal">New Material</button>
    </div>
  </div>

  <div v-if="showNewMatModal">
    <NewMaterialModal
      :id="id"
      @zatvoriModal="toggleModal"
      @dodajUListu="addToList"
    >
    </NewMaterialModal>
  </div>

  <div>
    <table>
      <thead>
        <td>#</td>
        <td>Name</td>
        <td>Description</td>
        <td>Date</td>
        <td>Details</td>
      </thead>
      <tr v-for="(material, index) in materials" :key="material.id">
        <td>{{ index + 1 }}.</td>
        <td>{{ material.name }}</td>
        <td>{{ material.description }}</td>
        <td>{{ material.creationDate }}</td>
        <td>
          <router-link
            :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
          >
            <button>Details</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import NewMaterialModal from "./NewMaterialModal.vue";

export default {
  components: { NewMaterialModal },
  props: ["id"],
  setup(props) {
    const materials = ref([]);

    const { getSubItems, deleteById } = useCRUD();

    const getMaterialsForCourse = async () => {
      materials.value = await getSubItems("materials", "course", props.id);
    };

    onMounted(() => {
      getMaterialsForCourse();
    });

    const deleteMaterial = async (matId, index) => {
      await deleteById("materials", matId);

      materials.value.splice(index, 1);
    };

    const showNewMatModal = ref(false);

    const toggleModal = () => {
      showNewMatModal.value = !showNewMatModal.value;
    };

    const addToList = (res) => {
      materials.value.push(res);
    };

    return {
      materials,
      deleteMaterial,
      showNewMatModal,
      toggleModal,
      addToList,
    };
  },
};
</script>

<style scoped>
.materials-info {
  padding: 5px;
  background: rgb(5, 141, 231);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

input {
  margin: 0;
}
</style>