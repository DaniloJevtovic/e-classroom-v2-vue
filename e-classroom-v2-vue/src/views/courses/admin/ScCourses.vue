<template>
  <div class="courses-list">
    <div>
      <div v-for="course in courses" :key="course.id">
        <div class="coursess">
          <sc-course :course="course"></sc-course>
        </div>
      </div>
    </div>

    <!-- novi predmet - komponenta -->
    <!-- <router-link
      :to="{ name: 'NewCourseForScClass', params: { id: id, scClassId: id } }"
    >
      <button>+</button>
    </router-link> -->

    <!-- dodavanje predmeta preko modala -->
    <button @click="toggleModal">+</button>
    <div v-if="showNewCourseModal">
      <NewCourseModal
        :scClassId="id"
        @zatvoriModal="toggleModal"
        @dodajUListu="addToList"
      >
      </NewCourseModal>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import ScCourse from "./ScCourse.vue";
import NewCourseModal from "./NewCourseModal.vue";
import NewMessageModal from "../../messages/NewMessageModal.vue";

export default {
  components: { ScCourse, NewCourseModal, NewMessageModal },
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

    const showNewCourseModal = ref(false);

    const toggleModal = () => {
      showNewCourseModal.value = !showNewCourseModal.value;
    };

    const addToList = (res) => {
      courses.value.push(res);
    };

    const view = ref(true);

    return {
      courses,
      view,
      showNewCourseModal,
      toggleModal,
      addToList,
    };
  },
};
</script>

<style scoped>
.courses-list {
  margin: 3px;
}

.coursess {
  color: rgb(255, 117, 4);
  border-radius: 5px;
}

input {
  margin: 0px;
}
</style>