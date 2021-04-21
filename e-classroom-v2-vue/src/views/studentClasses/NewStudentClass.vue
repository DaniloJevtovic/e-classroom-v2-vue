<template>
  <form @submit.prevent="handleSubmit">
    <h2>New Student Class</h2>
    <input type="text" v-model="newStClass.name" placeholder="name" />
    <textarea
      rows="3"
      v-model="newStClass.description"
      placeholder="description"
    ></textarea>
    <button>Save</button>
    <router-link :to="{ name: 'ScClassDetails', params: { id: id } }">
      <button>Cancel</button>
    </router-link>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { save } = useCRUD();
    const newStClass = reactive({
      name: "",
      description: "",
      scClassId: props.id,
    });

    const router = useRouter();

    const handleSubmit = async () => {
      await save("stClasses", newStClass);
      router.push({ name: "ScClassDetails", params: { id: props.id } });
    };

    return { newStClass, handleSubmit };
  },
};
</script>

<style>
</style>