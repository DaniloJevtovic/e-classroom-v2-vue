<template>
  <div class="container" v-if="courseInfo">
    <div class="container-header">
      <child-navbar :links="linksForNavbar"></child-navbar>
    </div>
    <div class="container-body">
      <div class="course-info">
        <div>
          <h3>Course: {{ courseInfo.name }}</h3>
          <h3>Description: {{ courseInfo.description }}</h3>
        </div>

        <div>
          <h3>
            Teacher: {{ courseInfo.teacher.firstName }}
            {{ courseInfo.teacher.lastName }}
          </h3>
          <!-- slanje poruke - nova komponenta -->
          <!-- <router-link
            :to="{
              name: 'NewMessage',
              params: {
                senderId: loggedUser.id,
                reciverId: courseInfo.teacher.id,
              },
            }"
          >
            <button style="padding: 5px; margin: 0px">Send message</button>
          </router-link> -->

          <!-- slanje poruke modal -->
          <button
            @click.prevent="toggleMessageModal"
            style="padding: 3px 40px; margin: 0px; border-radius: 40px"
          >
            Send message
          </button>
          <div v-if="showNewMessageModal">
            <NewMessageModal
              :reciverId="courseInfo.teacher.id"
              @zatvoriModal="toggleMessageModal"
            >
            </NewMessageModal>
          </div>
        </div>
      </div>

      <router-view :id="id" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";
import ChildNavbar from "../../../components/ChildNavbar.vue";
import { useStore } from "vuex";
import NewMessageModal from "../../messages/NewMessageModal.vue";

export default {
  props: ["id"],
  components: { ChildNavbar, NewMessageModal },
  setup(props) {
    const { getById, getSubItems } = useCRUD();
    const store = useStore();

    const loggedUser = store.getters["getLoggedUser"];

    const linksForNavbar = ref([
      { name: "Back to my Courses", path: "StudentCourses" },
      { name: "Wall", path: "StudentWall" },
      { name: "Materials", path: "StudentMaterials" },
      { name: "Quizzes", path: "StudentQuizzes" },
    ]);

    const courseInfo = ref("");
    const materials = ref("");
    const quizzes = ref("");

    const getCourseDetails = async () => {
      courseInfo.value = await getById("courses", props.id);
    };

    const getCourseMaterials = async () => {
      materials.value = await getSubItems("materials", "course", props.id);
    };

    const getCourseQuizzes = async () => {
      quizzes.value = await getSubItems("quizzes", "course", props.id);
    };

    onMounted(() => {
      getCourseDetails();
      getCourseMaterials();
      getCourseQuizzes();
    });

    const showNewMessageModal = ref(false);

    const toggleMessageModal = () => {
      showNewMessageModal.value = !showNewMessageModal.value;
    };

    return {
      linksForNavbar,
      courseInfo,
      materials,
      quizzes,
      loggedUser,
      showNewMessageModal,
      toggleMessageModal,
    };
  },
};
</script>

<style scoped>
.course-info {
  padding: 10px;
  background: cyan;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>