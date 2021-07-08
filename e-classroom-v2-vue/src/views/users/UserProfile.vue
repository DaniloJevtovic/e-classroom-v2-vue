<template>
  <div>
    <form>
      <h3>My info</h3>
      <input
        type="text"
        v-model="user.username"
        placeholder="kor.ime"
        disabled
      />
      <input type="text" v-model="user.firstName" placeholder="First Name" />
      <input type="text" v-model="user.lastName" placeholder="Last Name" />
      <input type="text" v-model="user.email" placeholder="Email" />

      <input
        type="password"
        v-model="user.newPassword"
        placeholder="new password"
      />

      <button @click.prevent="updateUser">Save changes</button>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const { getById, editById } = useCRUD();
    const toast = useToast();

    const user = reactive({});
    const store = useStore();
    const loggedUser = store.getters["getLoggedUser"];

    const getUser = async () => {
      let usr = await getById("users", loggedUser.id);
      user.username = usr.username;
      user.firstName = usr.firstName;
      user.lastName = usr.lastName;
      user.email = usr.email;
    };

    const updateUser = async () => {
      console.log(user);
      const res = await editById("users", loggedUser.username, user);

      toast.info(res.message, {
        timeout: 2000,
      });

      localStorage.setItem("user", JSON.stringify(res.user));
      store.commit("setLoggedUser");
    };
    onMounted(() => getUser());
    return { user, updateUser, loggedUser };
  },
};
</script>

<style>
</style>