<template>
  <div>
    <h2>Recived messages</h2>
    <div v-for="message in recivedMessages" :key="message.id">
      <div class="message">
        <p>Sender: {{ message.sender.firstName }} {{ message.sender.lastName }}</p>
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
.message {
  background: oldlace;
  border: 1px solid violet;
  margin: 5px;
}
</style>