import useCRUD from "@/composables/useCRUD.js";

const { getAll, save } = useCRUD();

export default {
  namespaced: true,
  state() {
    return {
      recivedMesssages: null,
      sentMessages: null,
      unreadMessages: 0,
    };
  },
  mutations: {
    // moze da se iskoristi recimo kada se korisnik izloguje
    clearMessages(state) {
      state.recivedMesssages = null;
      state.sentMessages = null;
      state.unreadMessages = 0;
    },

    setRecivedMessages(state, messages) {
      state.recivedMesssages = messages;
    },

    setSentMessages(state, messages) {
      state.sentMessages = messages;
    },

    setNumUnreadMessages(state, number) {
      state.unreadMessages = number;
    },

    // smanjivanje broja neprocitanih poruka kada se procita poruka
    decNumOfUnreadMessages(state) {
      state.unreadMessages = state.unreadMessages - 1;
    },

    // dodavanje poruke u listu poslatih
    addToSent(state, message) {
      state.sentMessages.push(message);
    },

    setAsRead(state, index) {
      state.recivedMesssages.content[index].seen = true;
      console.log("oznacio kao procitano");
    },
  },
  actions: {
    // dobavljanje primljenih poruka BE
    async getRecivedMessages(context) {
      let res = await getAll(
        "messages/recived/page/" + context.rootState.loggedUser.id
      );

      return res;
    },

    //dobavljanje poslatih poruka BE
    async getSentMessages(state) {
      let res = await getAll(
        "messages/sent/page/" + context.rootState.loggedUser.id
      );

      return res;
    },

    // slanje poruke, bekend
    async sentMessage(context, message) {
      let res = await save("messages", message, true, true);

      // pozivanje mutacije za dodavanje poruke u listu poslatih
      context.commit("addToSent", res);
    },

    //brisanje poruka - store
    clearMessagesAction(context) {
      context.commit("clearMessages");
    },

    // dobavljanje broja neprocitanih poruka za korisnika
    async getNumOfUnreadMessages(context) {
      let num = await getAll(
        "messages/count/recived/" + context.rootState.loggedUser.id
      );

      context.commit("setNumUnreadMessages", num);

      return num;
    },
  },
  getters: {
    getRecivedMessages(state) {
      return state.recivedMesssages;
    },

    getSentMessages(state) {
      return state.sentMessages;
    },

    getNumOfUnreadMessages(state) {
      return state.unreadMessages;
    },
  },
};
