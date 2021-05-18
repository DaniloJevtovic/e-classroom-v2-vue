<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" />
      <h2>e-classroom</h2>

      <div class="links">
        <div v-if="loggedUser">
          <router-link v-for="link in links" :key="link" :to="{ name: link }">
            {{ link }}
          </router-link>
          <span>Hi, {{ loggedUser.firstName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const loggedUser = computed(() => {
      return store.getters["getLoggedUser"];
    });

    const links = computed(() => {
      return store.getters["getLinksForLoggedUser"];
    });

    const handleLogout = () => {
      store.dispatch("logout");
    };

    return { loggedUser, links, handleLogout };
  },
};
</script>

<style scoped>
.navbar {
  /* padding: 16px 10px; */
  margin-bottom: 20px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

nav h2 {
  margin-left: 10px; /*od lijeve ivice 20px */
}

nav .links {
  margin-left: auto; /*ovo ih poravna udesno?! */
}

nav .links a,
button {
  margin-left: 10px; /*razmak izmedju dugmica */
  /* font-size: 20px; */
}

/* .links a.router-link-exact-active { */
.links a.router-link-active {
  background: cyan;
  color: indigo;
  padding: 7px;
  /* font-weight: bold; */
  border-radius: 7px;
}

nav img {
  max-height: 30px;
}

span {
  display: inline-block;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border-left: 5px solid rgb(0, 253, 76); /*uspravna crtica mala*/
  color: white;
  background: indigo;
}
</style>