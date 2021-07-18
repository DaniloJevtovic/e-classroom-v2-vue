<template>
  <div class="parents-info">
    <div>
      <h3>All parents</h3>
      <h3>Number of parents: {{ parents.length }}</h3>
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
        <td>Full Name</td>
        <td>Email</td>
        <td>Childrens</td>
        <td>Message</td>
      </thead>
      <tr v-for="parent in parents" :key="parent.id">
        <td>{{ parent.firstName }} {{ parent.lastName }}</td>
        <td>{{ parent.email }}</td>
        <td>*</td>
        <td>
          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: parent.id },
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
import useCRUD from "@/composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const parents = ref([]);

    const getParents = async () => {
      parents.value = await getAll("stParents");
    };

    onMounted(() => {
      getParents();
    });

    return { parents };
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
</style>