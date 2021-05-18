<template>
  <div class="my-students-info">
    <h3>Students: {{ students.length }}</h3>
    <div class="basic-grid">
      <div class="my-students" v-for="student in students" :key="student.id">
        <h2>Name: {{ student.firstName }} {{ student.lastName }}</h2>
        <h3>email: {{ student.email }}</h3>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { reciverId: student.id },
          }"
        >
          <button>Send message</button>
        </router-link>
        <!-- ako ima registrovanog roditelja -->
        <router-link
          v-if="student.stParent"
          :to="{
            name: 'NewMessage',
            params: { reciverId: student.stParent.id },
          }"
        >
          <button>Contact parent</button>
        </router-link>

        <router-link
          :to="{ name: 'StDetailsProf', params: { studId: student.id } }"
        >
          <button>View Profile</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["stClassId"],
  setup(props) {
    const { getSubItems } = useCRUD();

    const students = ref([]);

    const getStudentsFromStClass = async () => {
      students.value = await getSubItems(
        "students",
        "stClass",
        props.stClassId
      );
    };

    onMounted(() => {
      getStudentsFromStClass();
    });

    return { students };
  },
};
</script>

<style scoped>
.my-students-info {
  padding: 10px;
  background: rgb(27, 27, 184);
}

.my-students {
  color: yellow;
  border: 2px solid pink;
  background: blueviolet;
  padding: 8px;
}
</style>