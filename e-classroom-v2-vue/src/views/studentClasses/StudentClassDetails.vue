<template>
  <div class="container">
    <div class="stClassInfo" @click="toggleModal">
      <h3>{{ stClass.name }}</h3>
      <p>
        <small>{{ stClass.description }}</small>
      </p>
    </div>
    <div v-if="showEditStModal">
      <EditStClassModal
        :stClass="stClass"
        @zatvoriModal="toggleModal"
      ></EditStClassModal>
    </div>

    <!-- ucitavanje ucenika u odjeljenju -->
    <StudentsForStClass :id="stClass.id" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import EditStClassModal from "./admin/EditStClassModal.vue";
import StudentsForStClass from "../users/admin/StudentsForStClass.vue";

export default {
  props: ["stClass"],
  components: { StudentsForStClass, EditStClassModal },
  setup(props) {
    const { getById, getSubItems } = useCRUD();

    const showEditStModal = ref(false);

    const toggleModal = () => {
      showEditStModal.value = !showEditStModal.value;
    };

    return { showEditStModal, toggleModal };
  },
};
</script>

<style scoped>
.stClassInfo {
  padding: 3px;
  cursor: pointer;
  background: rgb(175, 232, 255);
}
</style>