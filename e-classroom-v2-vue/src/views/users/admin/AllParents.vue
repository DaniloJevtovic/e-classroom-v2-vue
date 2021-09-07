<template>
  <div class="parents-info">
    <div>
      <h3>All parents</h3>
      <!-- <h3>Number of parents: {{ parents.length }}</h3> -->
    </div>

    <!-- <router-link :to="{ name: 'NewParent' }">
      <button>New parent</button>
    </router-link> -->

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
      <tr v-for="(parent, index) in parents.content" :key="parent.id">
        <UserTable
          :user="parent"
          :index="index + 1 + parents.number * parents.size"
        />

        <!-- <td>{{ index + 1 }}.</td>
        <td>{{ parent.firstName }} {{ parent.lastName }}</td>
        <td>{{ parent.email }}</td>
        <td>
          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: parent.id },
            }"
          >
            <button>Send message</button>
          </router-link>
        </td> -->
      </tr>
    </table>

    <!-- dugmici za paginaciju -->
    <div class="page-buttons">
      <div v-for="(but, index) in parents.totalPages" :key="but.id">
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
import useCRUD from "@/composables/useCRUD.js";
import UserTable from "./UserTable.vue";

export default {
  components: { UserTable },
  setup() {
    const { getAll } = useCRUD();

    const parents = ref([]);

    const getParents = async () => {
      // parents.value = await getAll("stParents");
      parents.value = await getAll("stParents/page");
    };

    onMounted(() => {
      getParents();
    });

    const switchPage = async (page) => {
      parents.value = await getAll("stParents/page" + "?page=" + page);
    };

    return { parents, switchPage, selectedButton: ref("") };
  },
};
</script>

<style scoped>
.parents-info {
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