<template>
  <div class="sent-messages">
    <h2>Sent messages ({{ sentMessages.length }})</h2>
    <div v-for="message in sentMessages" :key="message.id">
      <div class="message">
        <p>
          Reciver: {{ message.reciver.firstName }}
          {{ message.reciver.lastName }}
        </p>
        <p>Subject: {{ message.subject }}</p>
        <p>Message: {{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const { getSubItems } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const sentMessages = ref([]);

    const getSentMessages = async () => {
      sentMessages.value = await getSubItems("messages", "sent", loggedUser.id);
    };

    onMounted(() => {
      getSentMessages();
    });

    return { sentMessages };
  },
};
</script>

<style scoped>
.sent-messages {
  margin: 10px;
  padding: 4px;
}

.message {
  background: rgb(241, 199, 121);
  border: 2px solid violet;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
}
</style>