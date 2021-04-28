<template>
  <div class="students-info">
    <h2>Students</h2>
    <!-- za predmet nadjes kojem razredu pripada, zatim sa tim id om nadjes sva odjeljenja -->
    <div class="students" v-for="student in students" :key="student.id">
      <button>{{ student.firstName }} {{ student.lastName }}</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const students = ref([]);
    const { getSubItems } = useCRUD();

    const getStudentsFromCourse = async () => {
      students.value = await getSubItems("students", "course", props.id);
    };

    onMounted(() => {
      getStudentsFromCourse();
    });

    return { students };
  },
};
</script>

<style>
</style>