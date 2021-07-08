<template>
  <div>
    <div class="courses-info">
      <div>
        <h2>Courses</h2>
        <h3>Num of courses: {{ courses.length }}</h3>
      </div>

      <input type="text" placeholder="search course" />

      <router-link
        :to="{ name: 'NewCourseForScClass', params: { scClassId: id } }"
      >
        <button>New Course For this sc</button>
      </router-link>
    </div>
    <div class="basic-grid">
      <div v-for="course in courses" :key="course.id">
        <router-link
          :to="{ name: 'CourseDetailsForScClass', params: { id: course.id } }"
        >
          <div class="sc-courses">
            <h1>Name: {{ course.name }}</h1>
            <h3>
              Teacher: {{ course.teacher.firstName }}
              {{ course.teacher.lastName }}

              <router-link
                :to="{
                  name: 'NewMessage',
                  params: { reciverId: course.teacher.id },
                }"
              >
                <button>Send message</button>
              </router-link>
            </h3>
            <h3>description: {{ course.description }}</h3>

            <!-- <router-link
              :to="{
                name: 'NewMessage',
                params: { reciverId: course.teacher.id },
              }"
            >
              <button>Send message</button>
            </router-link> -->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getSubItems } = useCRUD();
    const courses = ref([]);

    const getCoursesForScClass = async () => {
      courses.value = await getSubItems("courses", "schoolClass", props.id);
    };

    onMounted(() => {
      getCoursesForScClass();
    });

    return { courses };
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
  background: rgb(45, 45, 216);
  color: aqua;
  padding: 10px;
  border-radius: 7px;
}

input {
  margin: 0px;
}
</style>