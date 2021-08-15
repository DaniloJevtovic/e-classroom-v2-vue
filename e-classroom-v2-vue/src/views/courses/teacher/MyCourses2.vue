<template>
  <div class="container">
    <div class="container-header">
      <h2>My Courses</h2>
    </div>
    <div class="container-body">
      <div class="courses-details">
        <!-- svi predmeti - lijeva strana -->
        <div class="courses">
          <div v-for="course in courses" :key="course.id">
            <router-link
              :to="{ name: 'MyCourseDetails2', params: { id: course.id } }"
            >
              <button>
                {{ course.name }}
              </button>
            </router-link>
          </div>
        </div>

        <!-- prikaz odabranog predmeta - desna strana -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  setup() {
    const store = useStore();
    const { getSubItems, getById } = useCRUD();

    const courses = ref([]);

    const getCourses = async () => {
      let teacher = store.getters["getLoggedUser"];
      courses.value = await getSubItems("courses", "teacher", teacher.id);
    };

    onMounted(getCourses);
    return { courses };
  },
};
</script>

<style scoped>
.courses-details {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.courses {
  background: blue;
}

.course-details {
  background: springgreen;
}

.st-course {
  padding: 5px;
  /* color: rgb(229, 229, 231); */
  color: darkblue;
  /* background: rgb(29, 4, 48); */
  border-radius: 5px;
  border: 1px solid indigo;
}

button {
  width: 90%;
}
</style>