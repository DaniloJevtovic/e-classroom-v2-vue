<template>
  <div class="materials-info">
    <h2>Materials</h2>
    <router-link :to="{ name: 'NewMaterial', params: { id: id } }">
      <button>New Material</button>
    </router-link>

    <div class="materials" v-for="material in materials" :key="material.id">
      <h2>Name: {{ material.name }}</h2>
      <h3>Description: {{ material.description }}</h3>
      <router-link
        :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
      >
        <button>details</button>
      </router-link>
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

    const { getById, getSubItems } = useCRUD();

    const getMaterialsForCourse = async () => {
      materials.value = await getSubItems("materials", "course", props.id);
    };

    onMounted(() => {
      getMaterialsForCourse();
    });

    return { materials };
  },
};
</script>

<style scoped>
.materials-info {
  padding: 10px;
  background: rgb(27, 27, 184);
}

.materials {
  color: yellow;
  border: 2px solid pink;
  background: darkred;
  padding: 8px;
}
</style>