<template>
  <div class="students-info">
    <h2>All parents</h2>
    <h2>Number of parents: {{ parents.length }}</h2>
    <!-- <router-link :to="{ name: 'NewParent' }">
      <button>New parent</button>
    </router-link> -->
    <div class="search-parents">
      <input type="text" placeholder="filter by name" />
      <input type="text" placeholder="filter by stClass" />
    </div>
  </div>
  <div class="parents">
    <div v-for="parent in parents" :key="parent.id">
      <div class="parent">
        <h2>{{ parent.firstName }} {{ parent.lastName }}</h2>
        <h2>Email: {{ parent.email }}</h2>
        <router-link
          :to="{
            name: 'NewMessage',
            params: { reciverId: parent.id },
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
import useCRUD from "@/composables/useCRUD.js";

export default {
  setup() {
    const { getAll } = useCRUD();

    const parents = ref([]);

    const getStudents = async () => {
      parents.value = await getAll("stParents");
    };
    onMounted(getStudents);

    return { parents };
  },
};
</script>

<style scoped>
.students-info {
  background: rgb(107, 142, 189);
  padding: 10px;
}
.parents {
  background: blue;
  padding: 3px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.parent {
  background: white;
  padding: 3px;
  margin: 5px;
  border-radius: 10px;
}

.search-parents {
  display: flex;
}

input {
  margin: 10px;
}
</style>