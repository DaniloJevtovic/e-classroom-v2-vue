<template>
  <div class="container">
    <div class="container-header">
      <button @click="toggleMessageModal">New Message</button>

      <div v-if="showNewMessageModal">
        <NewMessageSelectUserModal @zatvoriModal="toggleMessageModal" />
      </div>

      <child-navbar :links="links"></child-navbar>
    </div>

    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";
import ChildNavbar from "../../components/ChildNavbar.vue";
import NewMessageSelectUserModal from "./NewMessageSelectUserModal.vue";

export default {
  components: { ChildNavbar, NewMessageSelectUserModal },
  setup() {
    const links = [
      // { name: "New Message", path: "NewMessageSelectUser" },
      { name: "Recived messages", path: "RecivedMessages" },
      { name: "Sent Messages", path: "SentMessages" },
    ];

    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    return { links, showNewMessageModal, toggleMessageModal };
  },
};
</script>

<style scoped>
</style>