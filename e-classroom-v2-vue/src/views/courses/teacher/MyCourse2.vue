<template>
  <div class="container-header"></div>
  <h3>{{ course.name }}</h3>

  {{ posts }}
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import ChildNavbar from "../../../components/ChildNavbar.vue";

export default {
  props: ["course", "id"],
  components: { ChildNavbar },
  setup(props) {
    const { getSubItems} = useCRUD();
    const posts = ref([]);

    const getPosts = async () => {
      posts.value = await getSubItems("posts", "course", props.course.id);
    };

    onMounted(() => {
      getPosts();
    });

    return { posts };
  },
};
</script>

<style scoped>
</style>