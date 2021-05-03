<template>
  <div class="stsForClass">
    <router-link :to="{ name: 'NewStudentForStClass', params: { id } }">
      <button>Add new Student</button>
    </router-link>
    <div>
      <div v-for="(student, index) in students" :key="student.id">
      <div>
        <h3>
          {{ index + 1 }}. {{ student.firstName }} {{ student.lastName }}
        </h3>
      </div>
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
    const { getSubItems } = useCRUD();
    const students = ref([]);

    const getStudentsForStClass = async () => {
      students.value = await getSubItems("students", "stClass", props.id);
    };

    onMounted(() => {
      getStudentsForStClass();
    });

    return { students };
  },
};
</script>

<style scoped>
/* .stsForClass {
  background: oldlace;
} */
</style>