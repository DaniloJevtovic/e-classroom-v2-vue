<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back</button>
    </div>
    <div class="container-body">
      <h2>Message details</h2>
      <div class="message-details">
        <h2>Subject: {{ message.subject }}</h2>
        <p>{{ message.message }}</p>
      </div>
      <div class="replay-message">
        <textarea rows="5" v-model="reply.message" placeholder="replay">
        </textarea>
        <button @click.prevent="sendReply">Send</button>
        <button @click.prevent="$router.go(-1)">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";

export default {
  props: ["messId"],
  setup(props) {
    const { getById, save } = useCRUD();
    const router = useRouter();

    const message = ref("");

    const reply = reactive({ message: "" });

    const getMessage = async () => {
      let mess = await getById("messages", props.messId);

      message.value = mess;
      
      reply.subject = "RE: " + mess.subject;
      //obrnuto je u odnosu na originalnu poruku
      reply.senderId = mess.reciver.id;   
      reply.reciverId = mess.sender.id;
    };

    const sendReply = async () => {
      console.log(reply);
      await save("messages", reply);

      router.go(-1);
    };

    onMounted(() => {
      getMessage();
    });

    return { message, reply, sendReply };
  },
};
</script>

<style scoped>
.replay-message {
  padding: 10px;
}

textarea {
  border-radius: 5px;
  margin: 0px;
}
</style>