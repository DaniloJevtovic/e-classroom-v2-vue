<template>
  <div
    type="button"
    @click="showModal"
    class="message"
    :class="{ readed: message.seen }"
  >
    <p>{{ message.sender.firstName }} {{ message.sender.lastName }}</p>
    <p>Subject: {{ message.subject }}</p>
    <p>Date: {{ message.date }}</p>
  </div>

  <ModalSlot v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      {{ message.sender.firstName }} {{ message.sender.lastName }} | Date:
      {{ message.date }}
    </template>

    <template v-slot:body>
      <div class="mess-text">
        <h3>Subject: {{ message.subject }}</h3>
        <p>{{ message.message }}</p>
      </div>

      <textarea rows="10" v-model="reply.message" placeholder="reply">
      </textarea>
      <button @click.prevent="sendReply" style="width: 100%; margin: 0">
        Reply
      </button>
    </template>

    <template v-slot:footer>
      <div></div>
      <!-- <p>Date: {{ message.date }}</p> -->
    </template>
  </ModalSlot>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import useCRUD from "@/composables/useCRUD.js";

import ModalSlot from "../../components/ModalSlot.vue";

export default {
  props: ["message"],
  components: { ModalSlot },
  setup(props) {
    const { save, getById } = useCRUD();

    const isModalVisible = ref(false);

    const showModal = () => {
      isModalVisible.value = true;

      // ako poruka nije pregledana posalji zahtjev da se poruka oznaci kao procitana
      if (!props.message.seen) {
        markAsRead();
        console.log("poslao");

        props.message.seen = true;
      }
    };

    const closeModal = () => {
      isModalVisible.value = false;
      reply.message = "";
    };

    const reply = reactive({
      message: "",
      subject: "RE: " + props.message.subject,
      senderId: props.message.reciver.id,
      reciverId: props.message.sender.id,
    });

    const sendReply = async () => {
      console.log(reply);

      let res = await save("messages", reply, false, true);

      closeModal();
    };

    //oznacavanje poruke kao procitane kada se klikne
    const markAsRead = async () => {
      let mess = await getById("messages/seen", props.message.id);
    };

    return {
      showModal,
      closeModal,
      isModalVisible,
      reply,
      sendReply,
    };
  },
};
</script>

<style scoped>
.mess-text {
  margin: 5px;
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

textarea {
  border: 1px solid indigo;
  border-radius: 4px;
}
</style>