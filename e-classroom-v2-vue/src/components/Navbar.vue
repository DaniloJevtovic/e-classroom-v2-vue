<template>
  <div class="navbar">
    <nav>
      <h2>e-classroom</h2>

      <div class="links">
        <div v-if="loggedUser">
          <span>Hi, {{ loggedUser.firstName }}</span>
          <!-- <router-link v-for="link in links" :key="link" :to="{ name: link }">
            <button>{{ link }}</button>
          </router-link> -->

          <router-link
            v-for="link in links"
            :key="link"
            :to="{ name: link.path }"
          >
            <button>
              {{ link.name }}
            </button>
          </router-link>

          <!-- <router-link :to="{ name: 'Messages' }">
            <button>Poruke [{{numOfUnreadMessages}}]</button>
          </router-link> -->

          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Login' }">
            <button>Login</button>
          </router-link>
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
      console.log(store.getters["getLinksForLoggedUser"]);
      return store.getters["getLinksForLoggedUser"];
    });

    const numOfUnreadMessages = computed(() => {
      return store.getters["messages/getNumOfUnreadMessages"];
    });

    const handleLogout = () => {
      store.dispatch("logout");
    };

    return { loggedUser, links, handleLogout, numOfUnreadMessages };
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 10px;
  background: rgb(116, 138, 170);
  /* background: rgb(124, 140, 197); */
  margin: auto;
}

nav {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
}

nav h2 {
  margin-left: 10px; /*od lijeve ivice 20px */
}

nav .links {
  margin-left: auto; /*ovo ih poravna udesno?! */
}

nav .links a,
button {
  margin-left: 3px; /*razmak izmedju dugmica */
  /* font-size: 20px; */
}

/* .links a.router-link-exact-active { */
.links a.router-link-active button {
  background: cyan;
  color: darkblue;
}

nav img {
  max-height: 30px;
}

span {
  display: inline-block;
  margin: 0 10px;
  color: white;
  font-weight: bold;
}
</style>