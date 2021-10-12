<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h2>New Parent</h2>
      <input
        type="email"
        v-model="newParent.email"
        placeholder="email"
        required
      />
      <input
        type="text"
        v-model="newParent.username"
        placeholder="username"
        required
      />
      <input
        type="text"
        v-model="newParent.firstName"
        placeholder="First name"
        required
      />
      <input
        type="text"
        v-model="newParent.lastName"
        placeholder="Last name"
        required
      />

      <button>Save</button>
      <button @click="$router.go(-1)">Cancel</button>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["studId", "studName"],
  setup() {
    const { save, getAll } = useCRUD();
    const router = useRouter();

    const newParent = reactive({
      email: "",
      username: "",
      password: "123",
      firstName: "",
      lastName: "",
    });

    const handleSubmit = async () => {
      await save("parents", newParent);
      router.go(-1);
    };

    return { newParent, handleSubmit };
  },
};
</script>

<style scoped>
</style>