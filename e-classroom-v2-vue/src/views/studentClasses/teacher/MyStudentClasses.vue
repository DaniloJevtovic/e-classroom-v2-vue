<template>
  <div class="my-stClass-info">
    <div class="my-stClasses" v-for="stClass in stClasses" :key="stClass.id">
      <div class="my-stClass">
        <h2>Student class: {{ stClass.name }}</h2>

        <my-students :stClassId="stClass.id"></my-students>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import MyStudents from "../../users/teacher/MyStudents.vue";

export default {
  props: ["id"],
  components: { MyStudents },
  setup(props) {
    const { getSubItems } = useCRUD();
    const stClasses = ref([]);

    const getStudentClassesForCourse = async () => {
      stClasses.value = await getSubItems("stClasses", "course", props.id);
    };

    onMounted(() => {
      getStudentClassesForCourse();
    });

    return { stClasses };
  },
};
</script>

<style scoped>
.my-stClass-info {
  background: chartreuse;
  padding: 10px;
}
.my-stClasses {
  background: rgb(0, 26, 255);
  padding: 20px;
}
.my-stClass {
  border: 3px solid yellow;
}
.my-stClass h2 {
  padding: 10px;
}
</style>