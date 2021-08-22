<template>
  <div class="coursee">
    <!-- izmjena predmeta - nova komponenta -->
    <!-- <router-link
      :to="{ name: 'EditCourse', params: { id: course.id } }"
      style="color: cyan"
    >
      <h2>{{ course.name }}</h2>
      <p>{{ course.description }}</p>
    </router-link> -->

    <div @click.prevent="toggleEditCourseModal">
      <h3>{{ course.name }}</h3>
      <p>{{ course.description }}</p>
    </div>

    <!-- modal za izmjenu predmeta -->
    <div v-if="showEditCourseModal">
      <EditCourseModal :course="course" @zatvoriModal="toggleEditCourseModal">
      </EditCourseModal>
    </div>

    <button
      @click.prevent="toggleMessageModal(course.teacher.id)"
      style="background: hotpink; padding: 2px 10px; border-radius: 20px"
    >
      {{ course.teacher.firstName }} {{ course.teacher.lastName }}
      <span>&#9993;</span>
    </button>
    <div v-if="showNewMessageModal">
      <NewMessageModal
        :reciverId="course.teacher.id"
        @zatvoriModal="toggleMessageModal"
      >
      </NewMessageModal>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import EditCourseModal from "./EditCourseModal.vue";
import NewMessageModal from "../../messages/NewMessageModal.vue";

export default {
  components: { EditCourseModal, NewMessageModal },
  props: ["course"],
  setup() {
    const showEditCourseModal = ref(false);

    const toggleEditCourseModal = () => {
      showEditCourseModal.value = !showEditCourseModal.value;
    };

    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    return {
      showEditCourseModal,
      toggleEditCourseModal,
      showNewMessageModal,
      toggleMessageModal,
    };
  },
};
</script>

<style scoped>
.coursee {
  color: darkblue;
  background: rgb(0, 252, 176);
  border-radius: 4px;
  cursor: pointer;
}
</style>