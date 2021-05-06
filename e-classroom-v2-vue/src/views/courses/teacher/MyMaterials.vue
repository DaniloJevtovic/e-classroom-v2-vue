<template>
  <div class="materials-info">
    <h2>Materials</h2>

    <router-link :to="{ name: 'NewMaterial', params: { id: id } }">
      <button>New Material</button>
    </router-link>

    <input type="text" placeholder="search" />

    <div class="te-materials">
      <div class="materials" v-for="material in materials" :key="material.id">
        <!-- <router-link
          :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
        > -->
        <router-link
          :to="{ name: 'EditMaterial', params: { id: material.id } }"
        >
          <h2>Name: {{ material.name }}</h2>
          <h3>Description: {{ material.description }}</h3>
        </router-link>
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
  background: wheat;
}

.materials {
  color: white;
  background: deepskyblue;
  padding: 8px;
  margin: 10px;
}

/* .te-materials {
  margin: 10px;
} */
</style>