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
  margin: 10px;
  padding: 4px;
}

.message {
  background: skyblue;
  border: 2px solid violet;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
}
</style>