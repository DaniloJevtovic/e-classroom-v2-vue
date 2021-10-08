<template>
  <div class="navbar">
    <nav>
      <div class="links">
        <router-link
          v-for="link in links"
          :key="link"
          :to="{ name: link.path }"
        >
          <button>
            {{ link.name }}
          </button>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["links"],
};
</script>

<style scoped>
/* nav {
  background: rgb(255, 145, 0);
} */

.links a.router-link-exact-active button {
  background: gold;
  color: indigo;
  /* font-weight: bold; */
}
</style>