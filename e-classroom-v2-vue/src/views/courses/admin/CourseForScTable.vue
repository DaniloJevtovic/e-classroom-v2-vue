<template>
  <td>{{ index }}.</td>
  <td>{{ course.name }}</td>
  <td>{{ course.description }}</td>
  <td>{{ course.schoolClass.name }}</td>

  <td>
    <button @click.prevent="toggleMessageModal">
      {{ course.teacher.firstName }} {{ course.teacher.lastName }}
      <span>&#9993;</span>
    </button>
  </td>
  <td :class="{ deletedCourse: course.deleted }">
    <div v-if="!course.deleted">ACTIVE</div>
    <div v-else style="background: red">INACTIVE</div>
  </td>
  <td>
    <NewMessageModal
      v-if="showNewMessageModal"
      :reciverId="course.teacher.id"
      @zatvoriModal="toggleMessageModal"
    >
    </NewMessageModal>

    <!-- izmjena predmeta - nova komponenta (moze i izmjena razreda) -->
    <!-- <router-link
      :to="{
        name: 'EditCourse',
        params: { id: course.id },
      }"
    >
      <button>Edit</button>
    </router-link> -->

    <!-- izmjena predmeta - modal (ne moze promjena razreda) -->
    <button @click.prevent="toggleEditCourseModal">Edit course</button>
    <!-- modal za izmjenu predmeta -->
    <EditCourseModal
      v-if="showEditCourseModal"
      :course="course"
      @zatvoriModal="toggleEditCourseModal"
    >
    </EditCourseModal>
  </td>
</template>

<script>
import { ref } from "vue";
import EditCourseModal from "./EditCourseModal.vue";
import NewMessageModal from "../../messages/NewMessageModal.vue";

export default {
  props: ["course", "index"],
  components: { EditCourseModal, NewMessageModal },
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
.deletedCourse {
  background: red;
}
</style>