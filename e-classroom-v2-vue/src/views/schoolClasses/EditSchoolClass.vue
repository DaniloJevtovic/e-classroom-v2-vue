<template>
  <form>
    <h2>Edit School Class</h2>
    <input type="text" v-model="scClass.name" placeholder="name" required />
    <textarea
      rows="4"
      v-model="scClass.description"
      placeholder="description"
      required
    >
    </textarea>
    <button @click.prevent="handleSubmit">Save</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../composables/useCRUD.js";
import { useToast } from "vue-toastification";

export default {
  props: ["id"],
  setup(props) {
    const { getById, editById } = useCRUD();
    const toast = useToast();
    const router = useRouter();

    const scClass = reactive({});

    const getScClass = async () => {
      let sc = await getById("scClasses", props.id);
      scClass.name = sc.name;
      scClass.description = sc.description;
    };

    onMounted(() => {
      getScClass();
    });

    const handleSubmit = async () => {
      let res = await editById("scClasses", props.id, scClass);

      toast.info(res, {
        timeout: 2000,
      });

      router.go(-1);
    };

    return { scClass, handleSubmit };
  },
};
</script>

<style>
</style>