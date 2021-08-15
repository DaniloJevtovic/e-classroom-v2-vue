<template>
  <form @submit.prevent="handleSubmit">
    <h2>Edit Student Class</h2>
    <h2>SchoolClass: {{ scClass.name }}</h2>
    <input type="text" v-model="stClass.name" placeholder="name" required />
    <textarea
      rows="3"
      v-model="stClass.description"
      placeholder="description"
      required
    >
    </textarea>
    <button>Save</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useCRUD from "../../../composables/useCRUD.js";
import { useToast } from "vue-toastification";

export default {
  props: ["id", "stcId"],
  setup(props) {
    const { getById, editById } = useCRUD();
    const router = useRouter();
    const toast = useToast();

    const scClass = ref("");
    const stClass = reactive({});

    const getScClassById = async () => {
      scClass.value = await getById("scClasses", props.id);
    };

    const getStClassById = async () => {
      let studentClass = await getById("stClasses", props.stcId);
      console.log(studentClass);
      stClass.name = studentClass.name;
      stClass.description = studentClass.description;
      stClass.scClassId = studentClass.schoolClass.id;
    };

    onMounted(() => {
      getScClassById();
      getStClassById();
    });

    const handleSubmit = async () => {
      let res = await editById("stClasses", props.stcId, stClass, true, true);

      // toast.info(res, {
      //   timeout: 2000,
      // });

      // router.go(-1);
    };

    return { scClass, stClass, handleSubmit };
  },
};
</script>

<style>
</style>