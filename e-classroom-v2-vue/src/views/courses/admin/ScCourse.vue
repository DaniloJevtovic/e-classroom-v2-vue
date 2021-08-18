<template>
  <div class="coursee">
    <router-link
      :to="{ name: 'EditCourse', params: { id: course.id } }"
      style="color: cyan"
    >
      <h3>{{ course.name }}</h3>
      <p>{{ course.description }}</p>
    </router-link>

    <button
      @click.prevent="toggleMessageModal(course.teacher.id)"
      style="background: orange; padding: 2px 10px; border-radius: 20px"
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
import NewMessageModal from "../../messages/NewMessageModal.vue";

export default {
  components: { NewMessageModal },
  props: ["course"],
  setup() {
    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    return { showNewMessageModal, toggleMessageModal };
  },
};
</script>

<style scoped>
.coursee {
  color: aliceblue;
  background: darkblue;
  border-radius: 4px;
}
</style>