<template>
  <div class="users-info">
    <div>
      <h3>All users</h3>
      <!-- <h3>Number of users: {{ users.length }}</h3> -->
    </div>

    <input type="text" placeholder="filter by first and last name" />

    <div>
      <!-- <router-link :to="{ name: 'NewTeacher' }">
        <button>New teacher</button>
      </router-link>
      <router-link :to="{ name: 'NewStudent' }">
        <button>New student</button>
      </router-link> -->
    </div>
  </div>

  <div>
    <table>
      <thead>
        <td>#</td>
        <td>Full Name</td>
        <td>Email</td>
        <td>ROLE</td>
        <td>Message</td>
      </thead>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{ index + 1 }}.</td>
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

input {
  margin: 0px;
}
</style>