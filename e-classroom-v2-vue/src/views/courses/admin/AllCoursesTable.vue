<template>
  <div class="container">
    <div>
      <table>
        <thead>
          <td>#</td>
          <td>Name</td>
          <td>Description</td>
          <td>School Class</td>
          <td>Teacher</td>
          <td>Action</td>
        </thead>
        <tr v-for="(course, index) in courses.content" :key="course.id">
          <!-- td-ovi u posebnoj komponenti -->
          <CourseForScTable
            :course="course"
            :index="index + 1 + courses.number * courses.size"
          />
        </tr>
      </table>

      <!-- dugmici za paginaciju -->
      <div class="page-buttons">
        <div v-for="(but, index) in courses.totalPages" :key="but.id">
          <button
            @click="switchPage(index), (selectedButton = index)"
            :class="{ highlight: index == selectedButton }"
          >
            {{ but }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";
import ScClasses from "./ScClasses.vue";
import CourseForScTable from "./CourseForScTable.vue";

export default {
  components: { ScClasses, CourseForScTable },
  setup() {
    const router = useRouter();
    const { getAll } = useCRUD();

    const courses = ref([]);
    const getCourses = async () => {
      // courses.value = await getAll("courses");
      courses.value = await getAll("courses/page");
    };

    onMounted(getCourses);

    const switchPage = async (page) => {
      courses.value = await getAll("courses/page" + "?page=" + page);
      console.log(courses.value);
    };

    return { courses, view: ref(true), switchPage, selectedButton: ref("") };
  },
};
</script>

<style scoped>
.courses {
  display: inline;
}

input {
  margin: 0;
  width: 75%;
}

.page-buttons {
  padding: 5px;
  display: flex;
}

.highlight {
  background: hotpink;
}
</style>