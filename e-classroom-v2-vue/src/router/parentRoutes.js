import ParentHome from "../views/homePages/ParentHome.vue";
import ParentStudentsList from "../views/users/parent/ParentStudentsList.vue";
import ParentStudentsList2 from "../views/users/parent/ParentStudentsList2.vue";
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
    path: "/parentStudents2",
    name: "ParentStList2",
    component: ParentStudentsList2,
  },
  {
    path: "/parentStudents/student/:studId",
    name: "ParentStDetails",
    component: StudentProfileDetails,
    props: true,
  },
];
