import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";

import AdminHome from "../views/homePages/AdminHome.vue";
import AllUsers from "../views/users/AllUsers.vue";
import AllTeachers from "../views/users/AllTeachers.vue";
import AllStudents from "../views/users/AllStudents.vue";

import AllCourses from "../views/courses/AllCourses.vue";
import NewCourse from "../views/courses/NewCourse.vue";
import CourseDetails from "../views/courses/CourseDetails.vue";

import AllSchoolClasses from "../views/schoolClasses/AllSchoolClasses.vue";
import SchoolClassDetails from "../views/schoolClasses/SchoolClassDetails.vue";
import NewSchoolClass from "../views/schoolClasses/NewSchoolClass.vue";

import AllStudentClasses from "../views/studentClasses/AllStudentClasses.vue";

import TeacherHome from "../views/homePages/TeacherHome.vue";

import StudentHome from "../views/homePages/StudentHome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  //admin
  {
    path: "/adminHome",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/allUsers",
    name: "AllUsers",
    component: AllUsers,
    children: [
      {
        path: "/allTeachers",
        name: "AllTeachers",
        component: AllTeachers,
      },
      {
        path: "/allStudents",
        name: "AllStudents",
        component: AllStudents,
      },
    ],
  },
  {
    path: "/allCourses",
    name: "AllCourses",
    component: AllCourses,
  },
  {
    path: "/newCourse",
    name: "NewCourse",
    component: NewCourse,
  },
  {
    path: "/courseDetails/:id",
    name: "CourseDetails",
    component: CourseDetails,
    props: true,
  },
  {
    path: "/allSchoolClases",
    name: "AllScClasses",
    component: AllSchoolClasses,
  },
  {
    path: "/newSchoolClass",
    name: "NewSchoolClass",
    component: NewSchoolClass,
  },
  {
    path: "/scClassDetails/:id",
    name: "ScClassDetails",
    component: SchoolClassDetails,
    props: true,
  },
  {
    path: "/allStudentClases",
    name: "AllStClasses",
    component: AllStudentClasses,
  },

  //teacher
  {
    path: "/teacherHome",
    name: "TeacherHome",
    component: TeacherHome,
  },

  //student
  {
    path: "/studentHome",
    name: "StudentHome",
    component: StudentHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
