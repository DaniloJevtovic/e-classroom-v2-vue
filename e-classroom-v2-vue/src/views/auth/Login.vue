<template>
  <form @submit.prevent="handleLogin">
    <h2>Login</h2>
    <input
      type="text"
      v-model="loginData.username"
      placeholder="username"
      required
    />
    <input
      type="password"
      v-model="loginData.password"
      placeholder="password"
      required
    />
    <button>Login</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const loginData = reactive({ username: "", password: "" });

    const handleLogin = async () => {
      console.log(loginData);
      await store.dispatch("login", loginData);
    };

    return { loginData, handleLogin };
  },
};
</script>

<style>
</style>