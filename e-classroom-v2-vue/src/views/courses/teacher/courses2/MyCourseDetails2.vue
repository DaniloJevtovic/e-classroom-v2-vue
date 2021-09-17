<template>
  <div class="container" v-if="courseInfo">
    <div class="container-body">
      <div class="course-info">
        <h3>Course: {{ courseInfo.name }}</h3>
        <h3>Description: {{ courseInfo.description }}</h3>
        <h3>SchoolClass: {{ courseInfo.schoolClass.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById } = useCRUD();
    const courseInfo = ref("");

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    onMounted(() => {
      console.log(props.id);
      getCourseDetails();
    });

    return { courseInfo };
  },
};
</script>

<style scoped>
.course-info {
  color: white;
  background: rgb(223, 79, 27);
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 10px;
}
</style>