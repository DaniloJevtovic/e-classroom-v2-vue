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

  <!-- <div>
    <table>
      <thead>
        <td>Num</td>
        <td>Full Name</td>
        <td>Email</td>
        <td>Message</td>
        <td>Details</td>
      </thead>
      <tr v-for="(student, index) in students" :key="student.id">
        <td>{{ index + 1 }}.</td>
        <td>{{ student.firstName }} {{ student.lastName }}</td>
        <td>{{ student.email }}</td>

        <td>
          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: student.id },
            }"
          >
            <button>Send message</button>
          </router-link>
        </td>
        <td>
          <router-link
            :to="{ name: 'StDetailsProf', params: { studId: student.id } }"
          >
            <button>Details</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div> -->

  <div class="st-list">
    <div v-for="(student, index) in students" :key="student.id">
      <router-link
        :to="{ name: 'StDetailsProf', params: { studId: student.id } }"
      >
        <h2>{{ index + 1 }}. {{ student.firstName }} {{ student.lastName }}</h2>
      </router-link>
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