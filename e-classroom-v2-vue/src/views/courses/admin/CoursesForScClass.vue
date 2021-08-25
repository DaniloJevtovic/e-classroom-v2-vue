<template>
  <div>
    <div class="courses-info">
      <div>
        <h3>Courses</h3>
        <!-- <h3>Num of courses: {{ courses.length }}</h3> -->
      </div>

      <input type="text" placeholder="search course" />

      <div>
        <!-- <router-link
          :to="{ name: 'NewCourseForScClass', params: { scClassId: id } }"
        >
          <button>New Course For this sc</button>
        </router-link> -->

        <button @click="toggleModal">New Course For this sc</button>
        <div v-if="showNewCourseModal">
          <NewCourseModal
            :scClassId="id"
            @zatvoriModal="toggleModal"
            @dodajUListu="addToList"
          >
          </NewCourseModal>
        </div>

        <button @click="view = !view">view</button>
      </div>
    </div>

    <div class="basic-grid" v-if="view">
      <div v-for="course in courses" :key="course.id">
        <sc-course :course="course"></sc-course>

        <!-- <router-link :to="{ name: 'EditCourse', params: { id: course.id } }">
          <div class="sc-courses">
            <h2>Name: {{ course.name }}</h2>
            <p>description: {{ course.description }}</p>

            <router-link
              :to="{
                name: 'NewMessage',
                params: { reciverId: course.teacher.id },
              }"
            >
              <button style="padding: 4px 20px">
                Teacher: {{ course.teacher.firstName }}
                {{ course.teacher.lastName }}
              </button>
            </router-link>
          </div>
        </router-link> -->
      </div>
    </div>

    <div v-else>
      <table>
        <thead>
          <td>#</td>
          <td>Name</td>
          <td>Description</td>
          <td>School Class</td>
          <td>Teacher</td>
          <td>Action</td>
        </thead>
        <tr v-for="(course, index) in courses" :key="course.id">
          <td>{{ index + 1 }}.</td>
          <td>{{ course.name }}</td>
          <td>{{ course.description }}</td>
          <td>{{ course.schoolClass.name }}</td>
          <td>{{ course.teacher.firstName }} {{ course.teacher.lastName }}</td>
          <td>
            <router-link
              :to="{
                name: 'NewMessage',
                params: { reciverId: course.teacher.id },
              }"
            >
              <button>Contact teacher</button>
            </router-link>

            <router-link
              :to="{
                name: 'EditCourse',
                params: { id: course.id },
              }"
            >
              <button>Edit</button>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

import ScCourse from "./ScCourse.vue";
import NewCourseModal from "./NewCourseModal.vue";

export default {
  components: { ScCourse, NewCourseModal },
  props: ["id"],
  setup(props) {
    const router = useRouter();
    const { getSubItems } = useCRUD();
    const courses = ref([]);

    const getCoursesForScClass = async () => {
      courses.value = await getSubItems("courses", "schoolClass", props.id);
    };

    onMounted(() => {
      getCoursesForScClass();
    });

    const showNewCourseModal = ref(false);

    const toggleModal = () => {
      showNewCourseModal.value = !showNewCourseModal.value;
    };

    const addToList = (res) => {
      courses.value.push(res);
    };

    const view = ref(false);

    return { courses, view, showNewCourseModal, toggleModal, addToList };
  },
};
</script>

<style scoped>
.courses-info {
  background: rgb(67, 67, 163);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
}

.sc-courses {
  /* background: rgb(45, 45, 216); */
  color: darkblue;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid darkblue;
}

input {
  margin: 0px;
}
</style>