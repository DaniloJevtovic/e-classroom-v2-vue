<template>
  <div>
    <h2>Sent messages</h2>
    <div v-for="message in sentMessages" :key="message.id">
      <div class="message">
        <p>Reciver: {{ message.reciver.firstName }}</p>
        <p>Subject: {{ message.subject }}</p>
        <p>Subject: {{ message.message }}</p>
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
.message {
  background: oldlace;
  border: 1px solid violet;
  margin: 5px;
}
</style>