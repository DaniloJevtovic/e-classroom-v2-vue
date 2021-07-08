<template>
  <div class="users-info">
    <div>
      <h3>All users</h3>
      <h3>Number of users: {{ users.length }}</h3>
    </div>

    <!-- <router-link :to="{ name: 'NewTeacher' }">
      <button>New teacher</button>
    </router-link>
    <router-link :to="{ name: 'NewStudent' }">
      <button>New student</button>
    </router-link> -->
    <input type="text" placeholder="filter by first and last name" />

    <div></div>
  </div>

  <!-- <div class="users">
    <div v-for="user in users" :key="user.id">
      <div class="user">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <h3>Email: {{ user.email }}</h3>
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
  </div> -->

  <div>
    <table>
      <thead>
        <td>Full Name</td>
        <td>Email</td>
        <td>ROLE</td>
        <td>Message</td>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.authorities[0].authority }}</td>
        <td>
          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: user.id },
            }"
          >
            <button>Send message</button>
          </router-link>
        </td>
      </tr>
    </table>
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
  background: rgb(5, 181, 250);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
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

input {
  margin: 0px;
}
</style>