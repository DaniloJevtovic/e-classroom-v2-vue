<template>
  <div>
    <div>
      <h1>Courses</h1>
      <router-link
        :to="{ name: 'NewCourseForScClass', params: { scClassId: id } }"
      >
        <button>New Course For this sc</button>
      </router-link>
    </div>
    <div class="basic-grid">
      <div v-for="course in courses" :key="course.id">
        <router-link
          :to="{ name: 'CourseDetailsForScClass', params: { id: course.id } }"
        >
          <div class="sc-courses">
            <h1>Name: {{ course.name }}</h1>
            <h2>
              Teacher: {{ course.teacher.firstName }}
              {{ course.teacher.lastName }}
            </h2>
            <h3>description: {{ course.description }}</h3>
            <router-link
              :to="{
                name: 'NewMessage',
                params: { reciverId:  course.teacher.id },
              }"
            >
              <button>Send message</button>
            </router-link>
          </div>
        </router-link>
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

<style scoped>
.sc-courses {
  background: indigo;
  color: aqua;
  padding: 10px;
  border-radius: 7px;
}
</style>