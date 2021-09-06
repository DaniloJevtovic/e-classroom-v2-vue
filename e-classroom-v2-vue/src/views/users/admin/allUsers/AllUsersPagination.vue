<template>
  <div class="users-info">
    <div>
      <h3>All users</h3>
      <!-- <h3>Number of users: {{ users.length }}</h3> -->
    </div>

    <input type="text" placeholder="filter by first and last name" />

    <div></div>
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
      <tr v-for="(user, index) in users.content" :key="user.id">
        <UserPaginationTable
          :user="user"
          :index="index + 1 + users.number * users.size"
        />

        <!-- <td>{{ index + 1 + users.number * users.size }}.</td>
        <td>{{ user.firstName }} {{ user.lastName }}.</td>
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
        </td> -->
      </tr>
    </table>

    <!-- dugmici za paginaciju -->
    <div class="page-buttons">
      <div v-for="(but, index) in users.totalPages" :key="but.id">
        <button
          @click="switchPage(index), (selectedButton = index)"
          :class="{ highlight: index == selectedButton }"
        >
          {{ but }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../../composables/useCRUD.js";
import UserPaginationTable from "./UserPaginationTable.vue";

export default {
  components: { UserPaginationTable },
  setup() {
    const { getAll } = useCRUD();

    const users = ref([]);

    const getUsers = async () => {
      users.value = await getAll("users/page");
      console.log(users.value);
    };

    onMounted(getUsers);

    const switchPage = async (page) => {
      console.log(page);
      users.value = await getAll("users/page" + "?page=" + page);
      console.log(users.value);
    };

    return { users, switchPage, selectedButton: ref("") };
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

.page-buttons {
  padding: 5px;
  display: flex;
}

.highlight {
  background: hotpink;
}
</style>