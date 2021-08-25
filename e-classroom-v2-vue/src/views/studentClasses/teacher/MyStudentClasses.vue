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
  background: white;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.my-stClass {
  border: 1px solid rgb(0, 68, 255);
  border-radius: 2px;
  margin: 4px
}
.my-stClass h3 {
  padding: 4px;
}
</style>