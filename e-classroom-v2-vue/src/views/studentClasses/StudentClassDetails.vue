<template>
  <div class="container">
    <div class="container-header">
      <h2>
        Name: {{ stClassInfo.name }}
        <br />
        Description: {{ stClassInfo.description }}
        <br />
        School Class: {{ stClassId }}
        <br />
        Number of Students: {{ students.length }}
      </h2>
    </div>
    <div class="container-body">
      <h1>Students</h1>
      <div class="students" v-for="student in students" :key="student.id">
        <button>
          Name{{ student.firstName }} {{ student.lastName }} <hr>
          Email: {{ student.email }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["stClassId"],
  setup(props) {
    const { getById, getSubItems } = useCRUD();

    const stClassInfo = ref("");
    const students = ref([]);

    const getStClassDetails = async () => {
      stClassInfo.value = await getById("stClasses", props.stClassId);
    };

    const getStudents = async () => {
      students.value = await getSubItems(
        "students",
        "stClass",
        props.stClassId
      );
    };

    onMounted(() => {
      getStClassDetails();
      getStudents();
    });

    return { stClassInfo, students };
  },
};
</script>

<style>
.students {
  display: inline;
}
</style>