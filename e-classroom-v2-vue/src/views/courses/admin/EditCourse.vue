<template>
  <form v-if="courseToEdit" @submit.prevent="handleUpdate">
    <h2>Edit course</h2>

    <input
      type="text"
      v-model="courseToEdit.name"
      placeholder="name"
      required
    />
    <textarea
      v-model="courseToEdit.description"
      placeholder="description"
      rows="3"
    />

    <select name="teachers" v-model="courseToEdit.teacherId" required>
      <!-- <option disabled value="">Select teacher</option> -->
      <option v-for="teacher in teachers" :key="teacher" :value="teacher.id">
        {{ teacher.firstName }} {{ teacher.lastName }} - ({{
          teacher.subjects
        }})
      </option>
    </select>

    <select name="scClasses" v-model="courseToEdit.schoolClassId" required>
      <option disabled value="">Select school class</option>
      <option v-for="scClass in scClasses" :key="scClass" :value="scClass.id">
        {{ scClass.name }}
      </option>
    </select>

    <button>Save</button>
    <button @click.prevent="$router.go(-1)">Cancel</button>
  </form>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getById, getAll, editById } = useCRUD();

    const courseToEdit = reactive({});
    const teachers = ref([]);
    const scClasses = ref([]);

    const getCourseDetails = async () => {
      let course = await getById("courses", props.id);
      console.log(course);
      //moram ovako prekopirati jer sa bekenda dobijam objekat sa svim povezanim entitetima!
      courseToEdit.name = course.name;
      courseToEdit.description = course.description;
      courseToEdit.teacherId = course.teacher.id;
      courseToEdit.schoolClassId = course.schoolClass.id;
    };

    const loadTeachers = async () => {
      teachers.value = await getAll("teachers");
    };

    const loadScClasses = async () => {
      scClasses.value = await getAll("scClasses");
    };

    onMounted(() => {
      getCourseDetails();
      loadTeachers();
      loadScClasses();
    });

    const handleUpdate = async () => {
      let res = await editById("courses", props.id, courseToEdit, true, true);
    };

    return { courseToEdit, teachers, scClasses, handleUpdate };
  },
};
</script>

<style>
</style>