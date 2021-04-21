<template>
  <div class="container">
    <div class="container-header" v-if="scClassInfo">
      <h2>
        Name: {{ scClassInfo.name }}
        <br />
        Description {{ scClassInfo.description }}
      </h2>

      <!-- id iz propa da ne selektujes razred -->
      <router-link :to="{ name: 'NewStudentClass', params: { id: id } }">
        <button>New Student Class</button>
      </router-link>

      <router-link :to="{ name: 'AllScClasses' }">
        <button>Back to all SchoolClasses</button>
      </router-link>
    </div>

    <div class="container-body">
      <h2>Student classes:</h2>
      <div class="stClasses" v-for="stClass in stClasses" :key="stClass.id">
        <router-link
          :to="{ name: 'StudentClassDetails', params: { scId: id, stClassId: stClass.id } }"
        >
          <button>
            Name: {{ stClass.name }}
            <hr />
            SchoolCLass: {{ stClass.schoolClass.name }}
            <hr />
            Description: {{ stClass.description }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const scClassInfo = ref("");
    const stClasses = ref([]);
    const { getById, getSubItems } = useCRUD();

    //2 zahtjeva :/

    //informacije o razredu
    const getDetailsSC = async () => {
      scClassInfo.value = await getById("scClasses", props.id);
    };

    //spisak svih odjeljenja
    const getAllStClasses = async () => {
      stClasses.value = await getSubItems("stClasses", "scClass", props.id);
    };

    onMounted(() => {
      getDetailsSC();
      getAllStClasses();
    });

    return { scClassInfo, stClasses };
  },
};
</script>

<style scoped>
.stClasses {
  display: inline;
}
</style>