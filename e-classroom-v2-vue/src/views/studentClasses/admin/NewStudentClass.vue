<template>
  <form @submit.prevent="handleSubmit">
    <h2>New Student Class</h2>
    <h3>SchoolClass: {{ scClass.name }}</h3>
    <input type="text" v-model="newStClass.name" placeholder="name" required />
    <textarea
      rows="3"
      v-model="newStClass.description"
      placeholder="description"
      required
    >
    </textarea>
    <button>Save</button>
    <button @click="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";
import { useToast } from "vue-toastification";

export default {
  props: ["id"],
  setup(props) {
    const { getById, save } = useCRUD();
    const toast = useToast();

    const scClass = ref("");

    const getScClassById = async () => {
      scClass.value = await getById("scClasses", props.id);
    };

    onMounted(() => {
      getScClassById();
    });

    const newStClass = reactive({
      name: "",
      description: "",
      scClassId: props.id,
    });

    const router = useRouter();

    const handleSubmit = async () => {
      let res = await save("stClasses", newStClass, true, true);
    };

    return { scClass, newStClass, handleSubmit };
  },
};
</script>

<style scoped>
</style>