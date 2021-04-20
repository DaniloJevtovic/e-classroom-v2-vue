<template>
  <form @submit.prevent="handleSubmit">
    <h2>New School Class</h2>
    <input type="text" v-model="newScClass.name" placeholder="name" />
    <textarea
      rows="4"
      v-model="newScClass.description"
      placeholder="description"
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

export default {
  setup() {
    const { save } = useCRUD();
    const router = useRouter();

    const newScClass = reactive({ name: "", description: "" });

    const handleSubmit = async () => {
      await save("scClasses", newScClass);
      router.push({ name: "AllScClasses" });
    };

    return { newScClass, handleSubmit };
  },
};
</script>

<style>
</style>