<template>
  <div class="stCForCl">
    <div>
      <h2>Studnet Classes</h2>
      <h3>total: {{ stClasses.length }}</h3>
    </div>

    <input type="text" placeholder="search by name" />

    <router-link :to="{ name: 'NewStudentClass' }">
      <button>New Student Class</button>
    </router-link>
  </div>

  <div class="basic-grid">
    <div class="sclasses" v-for="stClass in stClasses" :key="stClass.id">
      <router-link
        :to="{ name: 'EditStudentClass', params: { stcId: stClass.id } }"
      >
        <h2>StClass: {{ stClass.name }}</h2>
      </router-link>

      <!-- ucitavanje ucenika u odjeljenju -->
      <StudentsForSCClass :id="stClass.id" />
      <br />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import StudentsForSCClass from "../users/admin/StudentsForSCClass.vue";

export default {
  props: ["id"],
  components: { StudentsForSCClass },
  setup(props) {
    const { getSubItems } = useCRUD();
    const stClasses = ref([]);

    const getAllStClasses = async () => {
      stClasses.value = await getSubItems("stClasses", "scClass", props.id);
    };

    onMounted(() => {
      getAllStClasses();
    });

    return { stClasses };
  },
};
</script>

<style scoped>
.stClForScCl {
  background: deepskyblue;
}

.stCForCl {
  background: rgb(45, 145, 238);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

.sclasses {
  background: white;
  padding: 5px;
  border: 1px solid rgb(28, 43, 85);
  border-radius: 10px;
}

.search-studnets {
  display: flex;
}
input {
  margin: 0px;
}
</style>