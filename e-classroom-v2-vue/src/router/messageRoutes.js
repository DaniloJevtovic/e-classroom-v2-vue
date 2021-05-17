import NewMessage from "../views/messages/NewMessage.vue";
import Messages from "../views/messages/Messages.vue";
import RecivedMessages from "../views/messages/RecivedMessages.vue";
import SentMessages from "../views/messages/SentMessages.vue";
import MessageDetails from "../views/messages/MessageDetails.vue";

export default [
  {
    //path: "/sender/:senderId/newMessage/reciver/:reciverId",
    path: "/newMessage/reciver/:reciverId",
    name: "NewMessage",
    component: NewMessage,
    props: true,
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages,
    redirect: { name: "RecivedMessages" },
    props: true,
    children: [
      {
        path: "recived",
        name: "RecivedMessages",
        component: RecivedMessages,
      },
      {
        path: "sent",
        name: "SentMessages",
        component: SentMessages,
      },
      {
        path: "details/:messId",
        name: "MessageDetails",
        component: MessageDetails,
        props: true,
      },
    ],
  },
];
