<template>
  <div class="container">
    <posts-lists :courseId="id"></posts-lists>
  </div>
</template>

<script>
import PostsLists from "./PostsList.vue";

export default {
  components: { PostsLists },
  props: ["id"],
  setup() {},
};
</script>

<style scoped>
</style>