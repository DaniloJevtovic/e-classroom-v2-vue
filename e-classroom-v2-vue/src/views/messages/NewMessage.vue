<template>
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

export default {
  props: ["senderId, reciverId"],
  setup(props) {
    const { getById, save } = useCRUD();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const loggedUser = store.getters["getLoggedUser"];

    const message = reactive({
      subject: "",
      message: "",
      //senderId: route.params.senderId,
      senderId: loggedUser.id,
      reciverId: route.params.reciverId,
    });

    const reciver = ref("");

    const getReciver = async () => {
      reciver.value = await getById("users", route.params.reciverId);
    };

    const sendMessage = async () => {
      await save("messages", message);
      router.go(-1);
    };

    onMounted(() => {
      console.log(route.params.senderId);
      getReciver();
    });

    return { message, sendMessage, reciver };
  },
};
</script>

<style scoped>
form {
  min-width: 800px;
}
</style>