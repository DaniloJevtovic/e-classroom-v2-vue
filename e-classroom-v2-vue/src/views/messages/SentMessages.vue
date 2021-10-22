<template>
  <div class="sent-messages">
    <div class="messages-header">
      <div>
        <h3>Sent Messages [{{ sentMessages.totalElements }}]</h3>
      </div>

      <input type="text" placeholder="search" />

      <!-- <div>
        <button>New Message</button>
      </div> -->
    </div>

    <div class="mess-list">
      <div v-for="message in sentMessages.content" :key="message.id">
        <div class="message" @click="message.show = !message.show">
          <p>
            {{ message.reciver.firstName }}
            {{ message.reciver.lastName }}
            <span v-if="message.seen">&#10004;</span>
          </p>
          <p>Subject: {{ message.subject }}</p>

          <p>Date: {{ message.date }}</p>

          <p v-if="message.show">Message: {{ message.message }}</p>
        </div>
      </div>
    </div>

    <!-- dugmici za paginaciju -->
    <div class="page-buttons">
      <div v-for="(but, index) in sentMessages.totalPages" :key="but.id">
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

export default {
  setup() {
    const { getAll } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const sentMessages = ref([]);

    const getSentMessages = async () => {
      sentMessages.value = await getAll("messages/sent/page/" + loggedUser.id);

      sentMessages.value.content.forEach((message) => {
        message.show = false;
      });
    };

    const switchPage = async (page) => {
      sentMessages.value = await getAll(
        "messages/sent/page/" + loggedUser.id + "?page=" + page
      );
    };

    onMounted(() => {
      getSentMessages();
    });

    return { sentMessages, switchPage, selectedButton: ref("") };
  },
};
</script>

<style scoped>
.sent-messages {
  border: 1px solid darkblue;
  padding: 5px;
  background: white;
}

.messages-header {
  background: rgb(5, 181, 250);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

input {
  margin: 0px;
}

.message {
  display: grid;
  grid-template-columns: 1fr 2fr 0.7fr;
  background: rgb(238, 237, 236);
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