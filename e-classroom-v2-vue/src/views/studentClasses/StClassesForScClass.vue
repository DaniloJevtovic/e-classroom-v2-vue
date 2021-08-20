<template>
  <div class="stCForCl">
    <div>
      <h3>St Classes</h3>
      <!-- <h3>total: {{ stClasses.length }}</h3> -->
    </div>

    <input type="text" placeholder="search by name" />

    <!-- dodavanje novog odjeljenja - komponenta -->
    <!-- <router-link :to="{ name: 'NewStudentClass' }">
      <button>New Student Class</button>
    </router-link> -->

    <!-- dodavanje novog odjeljenja - -->
    <button @click="toggleModal">New St Class</button>
    <div v-if="showNewStModal">
      <NewStClassModal
        :sc="id"
        @zatvoriModal="toggleModal"
        @dodajUListu="addToList"
      ></NewStClassModal>
    </div>
  </div>

  <div class="basic-grid">
    <div class="sclasses" v-for="stClass in stClasses" :key="stClass.id">
      <!-- ucitavanje detalja za razred -->
      <StudentClassDetails :stClass="stClass"></StudentClassDetails>

      <!-- izmjena odjljenja preko komponente -->
      <!-- <router-link
        :to="{ name: 'EditStudentClass', params: { stcId: stClass.id } }"
      >
        <h2>StClass: {{ stClass.name }}</h2>
      </router-link> -->

      <!-- ucitavanje ucenika u odjeljenju -->
      <!-- <StudentsForStClass :id="stClass.id" /> -->
      <br />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
// import StudentsForStClass from "../users/admin/StudentsForStClass.vue";
import StudentClassDetails from "./StudentClassDetails.vue";
import NewStClassModal from "./admin/NewStClassModal.vue";

export default {
  props: ["id"],
  components: {
    StudentClassDetails,
    //StudentsForStClass,
    NewStClassModal,
  },
  setup(props) {
    const { getSubItems } = useCRUD();
    const stClasses = ref([]);

    const getAllStClasses = async () => {
      stClasses.value = await getSubItems("stClasses", "scClass", props.id);
    };

    onMounted(() => {
      getAllStClasses();
    });

    const showNewStModal = ref(false);

    const toggleModal = () => {
      showNewStModal.value = !showNewStModal.value;
    };

    const addToList = (res) => {
      stClasses.value.push(res);
    };

    return { stClasses, showNewStModal, toggleModal, addToList };
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
  border-radius: 5px;
}

.search-studnets {
  display: flex;
}
input {
  margin: 0px;
}
</style>