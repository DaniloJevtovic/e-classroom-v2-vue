<template>
  <div class="container">
    <div class="container-header">
      <child-navbar :links="links"></child-navbar>
    </div>

    <div class="container-body">
      <div class="scClass-admin">
        <h1>Name: {{ scClassInfo.name }}</h1>
        <h2>Description {{ scClassInfo.description }}</h2>
      </div>
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
}

.stClasses {
  display: inline;
}
</style>