<template>
  <td>{{ index }}.</td>
  <td>{{ user.firstName }} {{ user.lastName }}.</td>
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
 
</template>

<script>
import { ref } from "vue";
import NewMessageModal from "../../messages/NewMessageModal.vue";

export default {
  props: ["user", "index"],
  components: { NewMessageModal },
  setup() {
    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    return {
      showNewMessageModal,
      toggleMessageModal,
    };
  },
};
</script>

<style>
</style>