<template>
  <div class="users-info">
    <h2>All users</h2>
    <h2>Number of users: {{ users.length }}</h2>
    <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link>
    <router-link :to="{ name: 'NewStudent' }">
      <button>New student</button>
    </router-link>
  </div>

  <div class="users">
    <div v-for="user in users" :key="user.id">
      <div class="user">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <h2>Email: {{ user.email }}</h2>
        <h3>Role: {{ user.authorities[0].authority }}</h3>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { reciverId: user.id },
          }"
        >
          <button>Send message</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const users = ref([]);

    const getUsers = async () => {
      users.value = await getAll("users");
    };
    onMounted(getUsers);

    return { users };
  },
};
</script>

<style scoped>
.users-info {
  background: rgb(66, 116, 136);
  padding: 10px;
}
.users {
  background: blue;
  padding: 3px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.user {
  background: white;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
}
</style>