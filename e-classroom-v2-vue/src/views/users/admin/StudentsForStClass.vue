<template>
  <div class="stsForClass">
    <!-- <router-link :to="{ name: 'EditStudentClass', params: { stcId: id } }">
      <button>Edit StClass</button>
    </router-link> -->

    <!-- <input type="text" placeholder="search"> -->

    <div class="students">
      <div v-for="(student, index) in students" :key="student.id">
        <div draggable="true">
          <router-link
            :to="{ name: 'StDetailsAdmin', params: { studId: student.id } }"
          >
            <div class="student">
              <h3>
                {{ index + 1 }}. {{ student.firstName }} {{ student.lastName }}
              </h3>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- dodavanje novog ucenika i roditelja - nova komponenta -->
    <!-- <router-link :to="{ name: 'NewStudentForStClass', params: { id } }">
      <button style="border-radius: 100px">+</button>
    </router-link> -->

    <!-- dodavanje novog ucenika - modal -->
    <button @click="toggleModal">+</button>
    <div v-if="showNewStModal">
      <NewStudentModal
        :id="id"
        @zatvoriModal="toggleModal"
        @dodajUListu="addToList"
      >
      </NewStudentModal>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import NewStudentModal from "./NewStudentModal.vue";

export default {
  components: { NewStudentModal },
  props: ["id"],
  setup(props) {
    const { getSubItems } = useCRUD();
    const students = ref([]);

    const getStudentsForStClass = async () => {
      students.value = await getSubItems("students", "stClass", props.id);
    };

    onMounted(() => {
      getStudentsForStClass();
    });

    const showNewStModal = ref(false);

    const toggleModal = () => {
      showNewStModal.value = !showNewStModal.value;
    };

    const addToList = (res) => {
      students.value.push(res);
    };

    return { students, showNewStModal, toggleModal, addToList };
  },
};
</script>

<style scoped>
.stsForClass {
  background: rgb(180, 233, 231);
}

.student {
  color: darkblue;
  background: rgb(0, 206, 196);
}

.student:hover {
  color: cyan;
  background: rgb(5, 20, 85);
}
</style>