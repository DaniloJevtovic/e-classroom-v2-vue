<template>
  <div class="stCForCl">
    <h1>StClasses</h1>
    <router-link :to="{ name: 'NewStudentClass' }">
      <button>New Student Class</button>
    </router-link>
    <div class="search-studnets">
      <input type="text" placeholder="search by name" />
      <input type="text" placeholder="search by stClass" />
    </div>
  </div>
  <div class="basic-grid">
    <div class="sclasses" v-for="stClass in stClasses" :key="stClass.id">
      <h1>StClass: {{ stClass.name }}</h1>


      <StudentsForSCClass :id="stClass.id" />
      <br />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import StudentsForSCClass from "../users/StudentsForSCClass.vue";

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
  background: orange;
}

.sclasses {
  border: 3px solid rgb(28, 43, 85);
  border-radius: 10px;
}

.search-studnets {
  display: flex;
}
input {
  margin: 10px;
}
</style>