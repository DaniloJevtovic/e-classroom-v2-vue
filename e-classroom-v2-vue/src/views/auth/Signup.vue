<template>
  <form @submit.prevent="handleSignup">
    <h2>Signup</h2>
    <input type="email" v-model="regData.email" placeholder="Email" required />
    <input
      type="password"
      v-model="regData.password"
      placeholder="Password"
      required
    />
    <input
      type="text"
      v-model="regData.firstname"
      placeholder="First Name"
      required
    />
    <input
      type="text"
      v-model="regData.lastname"
      placeholder="Last Name"
      required
    />
    <input type="text" v-model="regData.phone" placeholder="Phone" required />
    <button>Signup</button>
  </form>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const regData = reactive({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
    });

    const handleSignup = () => {
      console.log(regData);
    };

    return { regData, handleSignup };
  },
};
</script>

<style scoped>
</style>