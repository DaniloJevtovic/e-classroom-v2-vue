<template>
  <div>
    <div>
      <router-link
        :to="{ name: 'NewCourseForScClass', params: { scClassId: id } }"
      >
        <button>New Course For this sc</button>
      </router-link>
    </div>
    <div v-for="course in courses" :key="course.id">
      <div>
        <h1>Name: {{ course.name }}</h1>
        <h2>
          Teacher: {{ course.teacher.firstName }} {{ course.teacher.lastName }}
        </h2>
        <h3>description: {{ course.description }}</h3>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getSubItems } = useCRUD();
    const courses = ref([]);

    const getCoursesForScClass = async () => {
      courses.value = await getSubItems("courses", "schoolClass", props.id);
    };

    onMounted(() => {
      getCoursesForScClass();
    });

    return { courses };
  },
};
</script>

<style>
</style>