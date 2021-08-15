<template>
  <div class="courses-list">
    <div v-for="course in courses" :key="course.id">
      <router-link :to="{ name: 'EditCourse', params: { id: course.id } }">
        <div class="course">
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
          <!-- <p>
            Teacher: {{ course.teacher.firstName }}
            {{ course.teacher.lastName }}
          </p> -->

          <router-link
            :to="{
              name: 'NewMessage',
              params: { reciverId: course.teacher.id },
            }"
          >
            <button style="background: orange; padding: 2px 10px; border-radius: 20px">
              {{ course.teacher.firstName }} {{ course.teacher.lastName }}
              <span>&#9993;</span>
            </button>
          </router-link>
        </div>
      </router-link>
    </div>
    <router-link
      :to="{ name: 'NewCourseForScClass', params: { id: id, scClassId: id } }"
    >
      <button>+</button>
    </router-link>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCRUD from "@/composables/useCRUD.js";
import { useRouter } from "vue-router";

export default {
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

    const view = ref(true);

    return { courses, view };
  },
};
</script>

<style scoped>
.courses-list {
  margin: 3px;
}

.course {
  color: rgb(255, 117, 4);
  background: rgb(36, 4, 49);
  padding: 3px;
  margin: 3px;
  border-radius: 5px;
  /* border: 1px solid darkblue; */
}

input {
  margin: 0px;
}
</style>