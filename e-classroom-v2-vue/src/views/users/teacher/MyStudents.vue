<template>
  <!-- <div class="my-students-info">
    <h3>Students: {{ students.length }}</h3>
    <div class="basic-grid">
      <div class="my-students" v-for="student in students" :key="student.id">
        <h3>Name: {{ student.firstName }} {{ student.lastName }}</h3>

        <router-link
          :to="{
            name: 'NewMessage',
            params: { reciverId: student.id },
          }"
        >
          <button>Send message</button>
        </router-link>

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
          <button>Details</button>
        </router-link>
      </div>
    </div>
  </div> -->

  <div>
    <table v-if="students.length">
      <thead>
        <td>#</td>
        <td>Full Name</td>
      </thead>
      <tr
        v-for="(student, index) in students"
        :key="student.id"
        @click="stDetails(student.id)"
      >
        <td>{{ index + 1 }}.</td>
        <td>{{ student.firstName }} {{ student.lastName }}</td>
      </tr>
    </table>
    <div v-else>
      <h3 style="color: red">No students</h3>
    </div>
  </div>

  <!-- <div class="st-list">
    <div v-for="(student, index) in students" :key="student.id">
      <router-link
        :to="{ name: 'StDetailsProf', params: { studId: student.id } }"
      >
        <h2>{{ index + 1 }}. {{ student.firstName }} {{ student.lastName }}</h2>
      </router-link>
    </div>
  </div> -->
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

import { useRouter } from "vue-router";

export default {
  props: ["stClassId"],
  setup(props) {
    const router = useRouter();
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

    function stDetails(id) {
      router.push({ name: "StDetailsProf", params: { studId: id } });
    }

    return { students, stDetails };
  },
};
</script>

<style scoped>
.my-students-info {
  padding: 10px;
  background: rgb(33, 33, 161);
  margin: 5px;
  border-radius: 10px;
}

.my-students {
  color: hotpink;
  border: 2px solid cyan;
  background: rgb(11, 1, 20);
  padding: 8px;
  border-radius: 10px;
}

.st-list {
  background: rgb(196, 233, 255);
  margin: 5px;
}
</style>