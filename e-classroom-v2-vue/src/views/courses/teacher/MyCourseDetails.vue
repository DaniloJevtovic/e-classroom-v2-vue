<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <h2>
        Name: {{ courseInfo.name }}
        <br />
        Description: {{ courseInfo.description }}
      </h2>
       <router-link :to="{ name: 'MyCourses' }">
      <button>Back to my Courses</button>
    </router-link>
    </div>
    <div class="container-body">
      <h2>Materials</h2>
      <button>New Material</button>
    </div>

   
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const courseInfo = ref("");
    const { getById } = useCRUD();

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    onMounted(getCourseDetails);

    return { courseInfo };
  },
};
</script>

<style>
</style>