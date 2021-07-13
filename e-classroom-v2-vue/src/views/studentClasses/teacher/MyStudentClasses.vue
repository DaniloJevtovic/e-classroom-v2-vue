<template>
  <div class="my-stClass-info">
    <div class="my-stClasses">
      <div v-for="stClass in stClasses" :key="stClass.id">
        <div class="my-stClass">
          <h3>Student class: {{ stClass.name }}</h3>

          <!-- ucitavanje svih ucenika za odjeljenje -->
          <my-students :stClassId="stClass.id"></my-students>
        </div>
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
  background: rgb(197, 210, 235);
  padding: 5px;
}
.my-stClasses {
  background: rgb(0, 26, 255);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.my-stClass {
  border: 2px solid cyan;
  border-radius: 2px;
  margin: 5px
}
.my-stClass h2 {
  padding: 10px;
}
</style>