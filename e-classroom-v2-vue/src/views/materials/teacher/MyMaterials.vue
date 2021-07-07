<template>
  <div class="materials-info">
    <h2>Materials</h2>

    <router-link :to="{ name: 'NewMaterial', params: { id: id } }">
      <button>New Material</button>
    </router-link>

    <input type="text" placeholder="search" />

    <div class="materials">
      <div v-for="material in materials" :key="material.id">
        <!-- <div v-for="(material, index) in materials" :key="material.id"> -->
        <div class="material">
          <router-link
            :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
          >
            <h2>Name: {{ material.name }}</h2>
            <h3>Description: {{ material.description }}</h3>
          </router-link>

          <!-- <h2>Name: {{ material.name }}</h2>
        <h3>Description: {{ material.description }}</h3>
        <router-link
          :to="{ name: 'EditMaterial', params: { id: material.id } }"
        >
          <button>Edit</button>
        </router-link>
        <router-link
          :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
        >
          <button>Details</button>
        </router-link>
        <button @click.prevent="deleteMaterial(material.id, index)">
          Delete
        </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const materials = ref([]);

    const { getById, getSubItems, deleteById } = useCRUD();

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

    return { materials, deleteMaterial };
  },
};
</script>

<style scoped>
.materials-info {
  padding: 10px;
  background: rgb(5, 141, 231);
}

.materials {
  color: white;
  background: deepskyblue;
  padding: 8px;
  margin: 10px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid white;
}

.material {
  background: white;
  border-radius: 10px;
  margin: 4px;
  padding: 3px;
}
</style>