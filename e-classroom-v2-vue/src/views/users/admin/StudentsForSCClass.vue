<template>
  <div class="stsForClass">
    <!-- <router-link :to="{ name: 'EditStudentClass', params: { stcId: id } }">
      <button>Edit StClass</button>
    </router-link> -->

    <!-- <input type="text" placeholder="search"> -->

    <div>
      <div v-for="(student, index) in students" :key="student.id">
        <div>
          <router-link
            :to="{ name: 'StDetailsAdmin', params: { studId: student.id } }"
          >
            <div class="student">
              <h3>
                {{ index + 1 }}. {{ student.firstName }} {{ student.lastName }}
              </h3>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'NewStudentForStClass', params: { id } }">
      <button style="border-radius: 100px">++</button>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCRUD from "../../../composables/useCRUD.js";

export default {
  props: ["id"],
  setup(props) {
    const { getSubItems } = useCRUD();
    const students = ref([]);

    const getStudentsForStClass = async () => {
      students.value = await getSubItems("students", "stClass", props.id);
    };

    onMounted(() => {
      getStudentsForStClass();
    });

    return { students };
  },
};
</script>

<style scoped>
/* .stsForClass {
  background: oldlace;
} */

.student {
  color: darkblue;
  background: rgb(147, 241, 241);
  border-radius: 10px;
  margin: 10px;
}
</style>