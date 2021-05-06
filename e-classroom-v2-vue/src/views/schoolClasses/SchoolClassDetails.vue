<template>
  <div class="container">
    <div class="container-header">
      <child-navbar :links="links"></child-navbar>
    </div>

    <div class="container-body">
      <router-link
        :to="{ name: 'EditSchoolClass', params: { id: scClassInfo.id } }"
      >
        <div class="scClass-admin">
          <h1>ScClass: {{ scClassInfo.name }}</h1>
          <p>Description: {{ scClassInfo.description }}</p>
        </div>
      </router-link>

      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../composables/useCRUD.js";
import ChildNavbar from "../../components/ChildNavbar.vue";

export default {
  props: ["id"],
  components: { ChildNavbar },
  setup(props) {
    const scClassInfo = ref("");

    const { getById } = useCRUD();

    const links = ref([
      {
        name: "Back to SCClasses",
        path: "AllScClasses",
      },
      {
        name: "Courses for SC",
        path: "CoursesForScClass",
      },
      {
        name: "Students",
        path: "StClassesForScClass",
      },
    ]);

    const getDetailsSC = async () => {
      scClassInfo.value = await getById("scClasses", props.id);
    };

    onMounted(() => {
      getDetailsSC();
    });

    return { scClassInfo, links };
  },
};
</script>

<style scoped>
.scClass-admin {
  padding: 10px;
  background: cyan;
  font-family: 'Courier New', Courier, monospace;
}

.stClasses {
  display: inline;
}
</style>