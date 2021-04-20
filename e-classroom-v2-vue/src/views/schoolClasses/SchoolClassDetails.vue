<template>
  <div class="container">
    <div class="container-header" v-if="scClassInfo">
      <h2>
        Name: {{ scClassInfo.name }}
        <hr />
        Description {{ scClassInfo.description }}
      </h2>
    </div>

    <div class="container-body">
      <h2>Student classes:</h2>
      <div class="stClasses" v-for="stClass in stClasses" :key="stClass.id">
        <button>
          Name: {{ stClass.name }}
          <hr />
          Description: {{ stClass.description }}
        </button>
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