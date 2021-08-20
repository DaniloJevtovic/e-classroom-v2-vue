<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h3>Edit course</h3>

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
          <option
            v-for="teacher in teachers"
            :key="teacher"
            :value="teacher.id"
          >
            {{ teacher.firstName }} {{ teacher.lastName }} - ({{
              teacher.subjects
            }})
          </option>
        </select>

        <button>Save</button>
        <button @click.prevent="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["course"],
  setup(props, context) {
    // vodi racuna da u setup() metodi prvi parametar mora biti props
    // pa tek onda moze context!!!
    const { getAll, editById } = useCRUD();

    const teachers = ref([]);

    const courseToEdit = reactive({
      name: props.course.name,
      description: props.course.description,
      teacherId: props.course.teacher.id,
      schoolClassId: props.course.schoolClass.id,
    });

    const loadTeachers = async () => {
      teachers.value = await getAll("teachers");
    };

    onMounted(() => {
      console.log(props.course);
      loadTeachers();
    });

    const handleSubmit = async () => {
      let res = await editById(
        "courses",
        props.course.id,
        courseToEdit,
        false,
        true
      );

      console.log("zer", res);

      if (res.status != 400) {
        //update u roditeljskoj komponenti - nekako sirotinjski :/
        props.course.name = courseToEdit.name;
        props.course.description = courseToEdit.description;
        props.course.teacher = res.teacher;

        closeModal();
      }
    };

    const closeModal = () => {
      context.emit("zatvoriModal");
    };

    return { courseToEdit, teachers, handleSubmit, closeModal };
  },
};
</script>

<style scoped>
</style>