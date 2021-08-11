<template>
  <form @submit.prevent="handleSubmit">
    <h2>New School Class</h2>
    <input type="text" v-model="newScClass.name" placeholder="name" required />
    <textarea
      rows="4"
      v-model="newScClass.description"
      placeholder="description"
      required
    >
    </textarea>
    <button>Save</button>
    <router-link :to="{ name: 'AllScClasses' }">
      <button>Cancel</button>
    </router-link>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../composables/useCRUD.js";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const { save } = useCRUD();
    const router = useRouter();
    const toast = useToast();

    const newScClass = reactive({ name: "", description: "" });

    const handleSubmit = async () => {
      let res = await save("scClasses", newScClass, true, true);
      //router.go(-1);
    };

    return { newScClass, handleSubmit };
  },
};
</script>

<style>
</style>