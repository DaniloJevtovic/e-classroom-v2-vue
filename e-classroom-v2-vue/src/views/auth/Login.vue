<template>
  <form @submit.prevent="handleLogin">
    <h2>Login</h2>
    <input
      type="email"
      v-model="loginData.email"
      placeholder="email"
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

export default {
  setup() {
    const loginData = reactive({ email: "", password: "" });

    const handleLogin = () => {
      console.log(loginData);
    };

    return { loginData, handleLogin };
  },
};
</script>

<style>
</style>