<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="sendMessage">
        <h2>New Message</h2>
        <h2 v-if="reciver">
          Reciver: {{ reciver.firstName }} {{ reciver.lastName }}
        </h2>

        <input
          type="text"
          v-model="message.subject"
          placeholder="subject"
          required
        />
        <textarea
          rows="8"
          v-model="message.message"
          placeholder="message"
          required
        >
        </textarea>
        <button>Send</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";

export default {
  props: ["reciverId"],
  setup(props, context) {
    const { getById, save } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const message = reactive({
      subject: "",
      message: "",
      senderId: loggedUser.id,
      reciverId: props.reciverId,
    });

    const reciver = ref("");

    const getReciver = async () => {
      console.log("id prof", props.reciverId);
      reciver.value = await getById("users", props.reciverId);
    };

    const sendMessage = async () => {
      let res = await save("messages", message, false, true);
      closeModal();
    };

    onMounted(() => {
      getReciver();
    });

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { closeModal, message, sendMessage, reciver };
  },
};
</script>

<style scoped>
</style>