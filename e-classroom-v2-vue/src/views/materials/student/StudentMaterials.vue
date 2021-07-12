<template>
  <div class="materials-info">
    <h2>Materials</h2>

    <div v-if="materials.length">
      <input type="text" placeholder="search materials by name" />

      <!-- <div class="materials">
        <div v-for="material in materials" :key="material.id">
          <div class="material">
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
      </div> -->

      <div>
        <table>
          <thead>
            <td>Num</td>
            <td>Name</td>
            <td>Description</td>
            <td>Date</td>
            <td>Author</td>
            <td>Details</td>
          </thead>
          <tr v-for="(material, index) in materials" :key="material.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ material.name }}</td>
            <td>{{ material.description }}</td>
            <td>{{ material.creationDate }}</td>
            <td>
              {{ material.course.teacher.firstName }}
              {{ material.course.teacher.lastName }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'StudentMaterialDetails',
                  params: { matId: material.id },
                }"
              >
                <button>Details</button>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div v-else class="no-materials">
      <h3>No materials yet</h3>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.material {
  padding: 10px;
  border-radius: 10px;
  background: white;
  margin: 10px;
}

.no-materials {
  margin: 20px;
  padding: 20px;
  background: red;
}

input {
  margin: 0px;
}
</style>