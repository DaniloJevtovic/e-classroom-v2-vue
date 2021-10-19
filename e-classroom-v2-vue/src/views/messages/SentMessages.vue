<template>
  <div class="sent-messages">
    <h2>Sent messages ({{ sentMessages.length }})</h2>
    <div v-for="message in sentMessages" :key="message.id">
      <div class="message">
        <p>
          Reciver: {{ message.reciver.firstName }}
          {{ message.reciver.lastName }}
        </p>
        <p>Date: {{ message.date }}</p>
        <p>Subject: {{ message.subject }}</p>
        <p>Message: {{ message.message }}</p>
        <p v-if="message.seen" style="background: springgreen">Seen</p>
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
  border: 1px solid darkblue;
  padding: 5px;
  background: white;
}

.message {
  background: rgb(238, 237, 236);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}
</style>