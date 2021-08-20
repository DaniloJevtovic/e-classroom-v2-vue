<template>
  <div class="container">
    <div class="container-header">
      <child-navbar :links="links"></child-navbar>
    </div>

    <div class="container-body">
      <!-- izmjena razreda - nova komponeta -->
      <!-- <router-link
        :to="{ name: 'EditSchoolClass', params: { id: scClassInfo.id } }"
      >
        <div class="scClass-admin">
          <h2>ScClass: {{ scClassInfo.name }}</h2>
          <p>Description: {{ scClassInfo.description }}</p>
        </div>
      </router-link> -->

      <div style="color: darkblue" class="scClass-admin" @click="toggleModal">
        <h2>ScClass: {{ scClassInfo.name }}</h2>
        <p>Description: {{ scClassInfo.description }}</p>
      </div>

      <!-- modal za izmjenu razreda -->
      <edit-sc-modal
        v-if="showEditScModal"
        :sc="scClassInfo"
        @zatvoriModal="toggleModal"
      >
      </edit-sc-modal>

      <!-- ruter-view sa child komponete unutar razreda (predmeti, ucenici) -->
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import ChildNavbar from "../../components/ChildNavbar.vue";
import EditScModal from "./EditScModal.vue";

export default {
  props: ["id"],
  components: { ChildNavbar, EditScModal },
  setup(props) {
    const scClassInfo = ref("");

    const { getById } = useCRUD();

    const links = ref([
      {
        name: "Back to SCClasses",
        path: "AllScClasses",
      },
      {
        name: "Courses for SC",
        path: "CoursesForScClass",
      },
      {
        name: "Students",
        path: "StClassesForScClass",
      },
    ]);

    const getDetailsSC = async () => {
      scClassInfo.value = await getById("scClasses", props.id);
    };

    onMounted(() => {
      getDetailsSC();
    });

    const showEditScModal = ref(false);

    const toggleModal = () => {
      showEditScModal.value = !showEditScModal.value;
    };

    return { scClassInfo, links, showEditScModal, toggleModal };
  },
};
</script>

<style scoped>
.scClass-admin {
  padding: 5px;
  background: cyan;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
}

.stClasses {
  display: inline;
}
</style>