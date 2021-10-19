<template>
  <div class="container">
    <div class="container-header">
      <h3>My Courses</h3>
    </div>
    <div class="container-body">
      <div class="courses" v-for="course in courses" :key="course.id">
        <router-link :to="{ name: 'CourseDetails', params: { id: course.id } }">
          <button>
            Name: {{ course.name }}
            <hr />
            Teacher: {{ course.teacher.firstName }}
            {{ course.teacher.lastName }}
            <hr />
            School Class: {{ course.schoolClass.name }}
            <hr />
            Description: {{ course.description }}
          </button>
        </router-link>
        <!-- <hr /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import useCRUD from "../../composables/useCRUD.js";

export default {
  setup() {
    const store = useStore();
    const { getSubItems } = useCRUD();

    const courses = ref([]);
    
    const getCourses = async () => {
      let teacher = store.getters["getLoggedUser"];
      courses.value = await getSubItems("courses", "teacher", teacher.id);
    };

    onMounted(getCourses);
    return { courses };
  },
};
</script>

<style scoped>
.courses {
  display: inline;
}
</style>