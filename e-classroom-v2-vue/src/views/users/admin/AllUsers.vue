<template>
  <div class="users-info">
    <h1>All users</h1>
    <h2>Number of users: {{ users.length }}</h2>
    <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link>
    <router-link :to="{ name: 'NewStudent' }">
      <button>New student</button>
    </router-link>
  </div>
  <div class="users" v-for="user in users" :key="user.id">
    <div class="user">
      <h1>Full Name: {{ user.firstName }} {{ user.lastName }}</h1>
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
  background: darkkhaki;
  padding: 10px;
}
.users {
  background: blue;
  padding: 10px;
}
.user {
  background: white;
  padding: 10px;
}
</style>