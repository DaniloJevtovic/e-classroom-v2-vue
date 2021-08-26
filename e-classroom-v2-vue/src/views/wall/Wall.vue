<template>
  <div class="wall">
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
.wall {
  margin: 4px auto;
  /* max-width: 70%; */
}
</style>