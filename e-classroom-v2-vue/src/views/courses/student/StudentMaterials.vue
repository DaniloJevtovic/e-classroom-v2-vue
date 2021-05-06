<template>
  <div class="materials-info">
    <h1>Materials</h1>

    <input type="text" placeholder="search" />

    <div>
      <div class="materials" v-for="material in materials" :key="material.id">
        <router-link
          :to="{
            name: 'StudentMaterialDetails',
            params: { matId: material.id },
          }"
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
  background: rgb(27, 27, 184);
}

.materials {
  color: white;
  background: deepskyblue;
  padding: 8px;
  margin: 10px;
}
</style>