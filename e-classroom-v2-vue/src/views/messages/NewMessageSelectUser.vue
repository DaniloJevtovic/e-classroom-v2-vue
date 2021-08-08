<template>
  <form @submit.prevent="sendMessage">
    <h2>New Message</h2>

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
    <textarea rows="8" v-model="message.message" placeholder="message" required>
    </textarea>
    <button>Send</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
  props: [],
  setup(props) {
    const { getAll, getById, save } = useCRUD();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

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
      let res = await save("messages", message, true, true);

      // toast.info(res, {
      //   timeout: 2000,
      // });

      // router.go(-1);
    };

    onMounted(() => {
      loadUsers();
    });

    return { message, sendMessage, users };
  },
};
</script>

<style scoped>
form {
  max-width: 100%;
}
</style>