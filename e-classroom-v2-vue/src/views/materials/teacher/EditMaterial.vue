<template>
  <form @submit.prevent="handleSubmit">
    <h2>Edit material</h2>
    <input type="text" v-model="material.name" placeholder="Name" required />
    <textarea rows="3" v-model="material.description" placeholder="Description">
    </textarea>
    <input type="file" placeholder="select" />

    <button>Save</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById, editById } = useCRUD();

    const router = useRouter();
    const material = reactive({});

    const getMaterial = async () => {
      let mat = await getById("materials", props.id);
      material.name = mat.name;
      material.description = mat.description;
    };

    onMounted(() => {
      getMaterial();
    });

    const handleSubmit = async () => {
      await editById("materials", props.id, material);
      router.go(-1);
    };

    return { material, handleSubmit };
  },
};
</script>

<style>
</style>