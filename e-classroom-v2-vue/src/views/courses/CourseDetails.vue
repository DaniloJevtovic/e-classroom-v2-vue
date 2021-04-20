<template>
  <form v-if="courseInfo">
    <h2>Name: {{ courseInfo.name }}</h2>
    <h3>Description: {{ courseInfo.description }}</h3>
    <hr />
    <hr />
    <h4>
      Teacher: {{ courseInfo.teacher.firstName }}
      {{ courseInfo.teacher.lastName }}
    </h4>
    <h4>Teacher Email: {{ courseInfo.teacher.email }}</h4>

    <router-link :to="{name: 'AllCourses'}">
        <button>Back to all Courses</button>
    </router-link>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";

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