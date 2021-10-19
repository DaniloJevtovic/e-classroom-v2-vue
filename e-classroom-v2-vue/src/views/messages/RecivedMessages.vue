<template>
  <div class="recived-messages">
    <div style="display: flex; align-items: center">
      <h3>Recived messages ({{ recivedMessages.totalElements }})</h3>
      <button class="pill-button">Sort by date</button>
      <button class="pill-button">Sort by sender</button>
    </div>
    <div v-for="message in recivedMessages.content" :key="message.id">
      <!-- prikaz poruke nova komponenta-->
      <!-- <router-link
        :to="{ name: 'MessageDetails', params: { messId: message.id } }"
      >
        <div class="message" :class="{ readed: message.seen }">
          <p>{{ message.sender.firstName }} {{ message.sender.lastName }}</p>
          <p>Subject: {{ message.subject }}</p>
          <p>Date: {{ message.date }}</p>
        </div>
      </router-link> -->

      <Message :message="message" />
    </div>

    <!-- dugmici za paginaciju -->
    <div class="page-buttons">
      <div v-for="(but, index) in recivedMessages.totalPages" :key="but.id">
        <button
          @click="switchPage(index), (selectedButton = index)"
          :class="{ highlight: index == selectedButton }"
        >
          {{ but }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import Message from "./Message.vue";

export default {
  components: { Message },
  setup() {
    const { getAll } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const recivedMessages = ref([]);

    const getRecivedMessages = async () => {
      recivedMessages.value = await getAll(
        "messages/recived/page/" + loggedUser.id
      );
    };

    const switchPage = async (page) => {
      recivedMessages.value = await getAll(
        "messages/recived/page/" + loggedUser.id + "?page=" + page
      );
    };

    onMounted(() => {
      getRecivedMessages();
    });

    return {
      recivedMessages,
      switchPage,
      selectedButton: ref(""),
    };
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
  display: grid;
  grid-template-columns: 1fr 2fr 0.7fr;
  color: darkblue;
  background: rgb(119, 218, 6);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}

.readed {
  color: darkblue;
  background: rgb(235, 236, 221);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}

.page-buttons {
  padding: 5px;
  display: flex;
}

.highlight {
  background: hotpink;
}
</style>