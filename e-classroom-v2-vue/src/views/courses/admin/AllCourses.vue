<template>
  <div class="container">
    <div class="container-header">
      <!-- <h2>All courses</h2> -->
      <router-link :to="{ name: 'NewCourse' }">
        <button>New Course</button>
      </router-link>
      <input type="text" placeholder="search" />
    </div>

    <div class="container-body">
      <!-- <h3>All Courses</h3> -->
      <!-- <div class="courses" v-for="course in courses" :key="course.id">
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
      </div> -->

      <div>
        <table>
          <thead>
            <td>Name</td>
            <td>Description</td>
            <td>School Class</td>
            <td>Teacher</td>
          </thead>
          <tr
            v-for="course in courses"
            :key="course.id"
            @click="editCourse(course.id)"
          >
            <td>{{ course.name }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.schoolClass.name }}</td>
            <td>
              {{ course.teacher.firstName }} {{ course.teacher.lastName }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { getAll } = useCRUD();

    const courses = ref([]);
    const getCourses = async () => {
      courses.value = await getAll("courses");
    };

    onMounted(getCourses);

    const editCourse = (id) => {
      console.log(id);
      router.push({ name: "CourseDetails", params: { id: id } });
    };

    return { courses, editCourse };
  },
};
</script>

<style scoped>
.courses {
  display: inline;
}

button {
  padding: 5px;
}

input {
  margin: 0;
  width: 92%;
}
</style>