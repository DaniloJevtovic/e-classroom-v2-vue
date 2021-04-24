<template>
  <form @submit.prevent="handleSubmit">
    <h2>New material</h2>
    <input type="text" v-model="newMaterial.name" placeholder="Name" required />
    <textarea
      rows="3"
      v-model="newMaterial.description"
      placeholder="Description"
    >
    </textarea>
    <input type="file" placeholder="select" />

    <button>Save</button>
    <button @click="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { save } = useCRUD();

    const router = useRouter();
    const newMaterial = reactive({
      name: "",
      description: "",
      file: "",
      courseId: props.id,
    });

    const handleSubmit = async () => {
      await save("materials", newMaterial);
      console.log(newMaterial);
      router.go(-1);
    };

    return { newMaterial, handleSubmit };
  },
};
</script>

<style>
</style>