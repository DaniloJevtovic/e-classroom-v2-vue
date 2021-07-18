<template>
  <div class="recived-messages">
    <h2>Recived messages ({{ recivedMessages.length }})</h2>
    <div v-for="message in recivedMessages" :key="message.id">
      <router-link
        :to="{ name: 'MessageDetails', params: { messId: message.id } }"
      >
        <div class="message">
          <p>
            Sender: {{ message.sender.firstName }} {{ message.sender.lastName }}
          </p>
          <p>Date: {{ message.date }}</p>
          <p>Subject: {{ message.subject }}</p>
          <p>Message: {{ message.message }}</p>
        </div>
      </router-link>
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

    const recivedMessages = ref([]);

    const getRecivedMessages = async () => {
      recivedMessages.value = await getSubItems(
        "messages",
        "recived",
        loggedUser.id
      );
    };

    onMounted(() => {
      getRecivedMessages();
    });

    return { recivedMessages };
  },
};
</script>

<style scoped>
.recived-messages {
  border: 1px solid darkblue;
  padding: 5px;
  background: white;
}

.message {
  color: darkblue;
  background: rgb(202, 250, 226);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}
</style>