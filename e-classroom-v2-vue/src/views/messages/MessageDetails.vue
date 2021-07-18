<template>
  <div class="container">
    <div class="container-header">
      <button @click="$router.go(-1)">Back</button>
    </div>
    <div class="container-body" v-if="message">
      <div class="mes-rep">
        <div class="message-details">
          <h3>Subject: {{ message.subject }}</h3>
          <h4>
            Sender: {{ message.sender.firstName }} {{ message.sender.lastName }}
          </h4>
          <h4>Date: {{ message.date }}</h4>
          <br />
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
  </div>
</template>

<script>
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import { useToast } from "vue-toastification";

export default {
  props: ["messId"],
  setup(props) {
    const { getById, save } = useCRUD();
    const router = useRouter();
    const toast = useToast();

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
      let res = await save("messages", reply);

      toast.info(res, {
        timeout: 2000,
      });

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
.mes-rep {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.message-details {
  margin: 10px;
  padding: 10px;
  text-align: left;
  border: 1px solid darkcyan;
  border-radius: 5px;
}

.replay-message {
  padding: 10px;
}

textarea {
  border-radius: 3px;
  margin: 0px;
  border: 1px solid darkblue;
}
</style>