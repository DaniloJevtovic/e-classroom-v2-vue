<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <h2>
        Name: {{ courseInfo.name }}
        <br />
        Description: {{ courseInfo.description }}
        <br />
        SchoolClass: {{ courseInfo.schoolClass.name }}
      </h2>
      <router-link :to="{ name: 'MyCourses' }">
        <button>Back to my Courses</button>
      </router-link>
    </div>
    <div class="container-body">
      <h2>Materials</h2>

      <!-- moze ja mislim: params: { id: courseInfo.id } ili params: { id: id} -->
      <router-link :to="{ name: 'NewMaterial', params: { id: courseInfo.id } }">
        <button>New Material</button>
      </router-link>

      <div class="materials" v-for="material in materials" :key="material.id">
        <h2>Name: {{ material.name }}</h2>
        <h3>Description: {{ material.description }}</h3>
        <router-link
          :to="{ name: 'MaterialDetails', params: { matId: material.id } }"
          ><button>details</button></router-link
        >
        <hr />
      </div>
      <!-- {{ materials }} -->

      <hr />
      <h2>Quizzes</h2>
      <button>New Quiz</button>

      <hr />
      <h2>Students</h2>
      <!-- za predmet nadjes kojem razredu pripada, zatim sa tim id om nadjes sva odjeljenja -->
      <div class="students" v-for="student in students" :key="student.id">
        <button>{{ student.firstName }} {{ student.lastName }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const courseInfo = ref("");
    const materials = ref([]);
    const students = ref([]);
    const { getById, getSubItems } = useCRUD();

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    const getMaterialsForCourse = async () => {
      materials.value = await getSubItems("materials", "course", props.id);
    };

    const getStudentsFromCourse = async () => {
      students.value = await getSubItems("students", "course", props.id);
    };

    onMounted(() => {
      getCourseDetails();
      getMaterialsForCourse();
      getStudentsFromCourse();
    });

    return { courseInfo, materials, students };
  },
};
</script>

<style>
.materials {
  color: yellow;
}
</style>