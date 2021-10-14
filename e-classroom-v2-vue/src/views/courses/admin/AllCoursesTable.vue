<template>
  <div class="container">
    <div>
      <button @click="toggleModal">new course</button>

      <div v-if="showNewCourseModal">
        <NewCourseSelectClassModal
          @zatvoriModal="toggleModal"
          @dodajUListu="addToList"
        >
        </NewCourseSelectClassModal>
      </div>

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
import NewCourseSelectClassModal from "./NewCourseSelectClassModal.vue";

export default {
  components: { ScClasses, CourseForScTable, NewCourseSelectClassModal },
  setup() {
    const router = useRouter();
    const { getAll } = useCRUD();

    const courses = ref([]);

    const getCourses = async () => {
      // courses.value = await getAll("courses");
      courses.value = await getAll("courses/page");
    };

    onMounted(getCourses);

    const selectedButton = ref("");

    const switchPage = async (page) => {
      courses.value = await getAll("courses/page" + "?page=" + page);
      selectedButton.value = page;
    };

    const showNewCourseModal = ref(false);

    const toggleModal = () => {
      showNewCourseModal.value = !showNewCourseModal.value;
    };

    const addToList = (res) => {
      switchPage(courses.value.totalPages - 1);
      courses.value.content.push(res);
    };

    return {
      courses,
      view: ref(true),
      switchPage,
      selectedButton,
      showNewCourseModal,
      toggleModal,
      addToList,
    };
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