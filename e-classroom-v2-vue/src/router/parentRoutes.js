import ParentHome from "../views/homePages/ParentHome.vue";
import ParentStudentsList from "../views/users/parent/ParentStudentsList.vue";
import StudentProfileDetails from "../views/users/StudentProfileDetails.vue";

export default [
  {
    path: "/parentHome",
    name: "ParentHome",
    component: ParentHome,
  },
  {
    path: "/parentStudents",
    name: "ParentStList",
    component: ParentStudentsList,
  },
  {
    path: "/parentStudents/student/:id",
    name: "ParentStDetails",
    component: StudentProfileDetails,
    props: true,
  },
];
