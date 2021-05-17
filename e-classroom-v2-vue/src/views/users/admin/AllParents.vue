<template>
  <div class="students-info">
    <h1>All parents</h1>
    <h2>Number of parents: {{ parents.length }}</h2>
    <!-- <router-link :to="{ name: 'NewParent' }">
      <button>New parent</button>
    </router-link> -->
    <div class="search-parents">
      <input type="text" placeholder="filter by name" />
      <input type="text" placeholder="filter by stClass" />
    </div>
  </div>
  <div class="parents" v-for="parent in parents" :key="parent.id">
    <div class="parent">
      <h1>Full Name: {{ parent.firstName }} {{ parent.lastName }}</h1>
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
  background: darkkhaki;
  padding: 10px;
}
.parents {
  background: blue;
  padding: 10px;
}
.parent {
  background: white;
  padding: 10px;
}

.search-parents {
  display: flex;
}

input {
  margin: 10px;
}
</style>