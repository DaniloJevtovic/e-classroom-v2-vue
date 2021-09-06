<template>
  <td>{{ index }}.</td>
  <td>{{ user.firstName }} {{ user.lastName }}</td>
  <td>{{ user.email }}</td>
  <td>{{ user.authorities[0].authority }}</td>
  <td>
    <button @click.prevent="toggleMessageModal">
      Send message
      <span>&#9993;</span>
    </button>

    <NewMessageModal
      v-if="showNewMessageModal"
      :reciverId="user.id"
      @zatvoriModal="toggleMessageModal"
    >
    </NewMessageModal>
  </td>
  <td>
    <ModalSlot v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> User details </template>

      <template v-slot:body>
        <h2>Full Name: {{ user.firstName }} {{ user.lastName }}</h2>
        <h3>Email: {{ user.email }}</h3>
        <h3>ROLE: {{ user.authorities[0].authority }}</h3>
        <h3 v-if="user.authorities[0].authority == 'ROLE_TEACHER'">
          Subjects: {{ user.subjects }}
        </h3>
        <div v-if="user.authorities[0].authority == 'ROLE_STUDENT'">
          <h3>St Class: {{ user.studentClass.name }}</h3>
          <h3>
            Parent: {{ user.stParent.firstName }} {{ user.stParent.firstName }}
          </h3>
          <router-link
            :to="{ name: 'StUserDetailsAdmin', params: { studId: user.id } }"
          >
            <button style="margin: 10px">Results</button>
          </router-link>
        </div>
      </template>

      <template v-slot:footer>
        <p>Last seen:</p>
      </template>
    </ModalSlot>

    <button type="button" class="btn" @click="showModal">View Details!</button>

    <!-- <button>Contact parent</button>
    <button>Contact student</button> -->
  </td>
</template>

<script>
import { ref } from "vue";
import NewMessageModal from "../../messages/NewMessageModal.vue";
import ModalSlot from "./../../../components/ModalSlot.vue";

export default {
  props: ["user", "index"],
  components: { NewMessageModal, ModalSlot },
  setup() {
    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    const isModalVisible = ref(false);

    const showModal = () => {
      isModalVisible.value = true;
    };
    const closeModal = () => {
      isModalVisible.value = false;
    };

    return {
      showNewMessageModal,
      toggleMessageModal,
      showModal,
      closeModal,
      isModalVisible,
    };
  },
};
</script>

<style>
</style>