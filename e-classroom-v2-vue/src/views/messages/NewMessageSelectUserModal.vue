<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="sendMessage">
        <h3>New Message</h3>

        <select name="users" v-model="message.reciverId" required>
          <option disabled value="">Select reciver</option>
          <option v-for="user in users" :key="user" :value="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>

        <input
          type="text"
          v-model="message.subject"
          placeholder="subject"
          required
        />
        <textarea
          rows="12"
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
  props: [],
  setup(props, context) {
    const { getAll, save } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const users = ref([]);

    const message = reactive({
      subject: "",
      message: "",
      senderId: loggedUser.id,
      reciverId: "",
    });

    const loadUsers = async () => {
      users.value = await getAll("users");
    };

    const sendMessage = async () => {
      let res = await save("messages", message, false, true);
      closeModal();
    };

    onMounted(() => {
      loadUsers();
    });

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { message, sendMessage, users, closeModal };
  },
};
</script>

<style scoped>
form {
  max-width: 700px;
}

.modal {
  width: 700px;
}
</style>