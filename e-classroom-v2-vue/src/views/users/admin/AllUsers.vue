<template>
  <div class="users-info">
    <div>
      <h3>All users</h3>
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
        <td>Details</td>
      </thead>
      <tr v-for="(user, index) in users.content" :key="user.id">
        <UserTable
          :user="user"
          :index="index + 1 + users.number * users.size"
        />
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
import useCRUD from "../../../composables/useCRUD.js";
import UserTable from "./UserTable.vue";

export default {
  components: { UserTable },
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