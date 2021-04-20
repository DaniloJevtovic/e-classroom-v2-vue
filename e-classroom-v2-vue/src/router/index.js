import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";

import AdminHome from "../views/admin/AdminHome.vue";
import AllUsers from "../views/admin/AllUsers.vue";
import AllTeachers from "../views/admin/AllTeachers.vue";
import AllStudents from "../views/admin/AllStudents.vue";
import AllCourses from "../views/admin/AllCourses.vue";
import AllSchoolClasses from "../views/admin/AllSchoolClasses.vue";
import AllStudentClasses from "../views/admin/AllStudentClasses.vue";

import TeacherHome from "../views/teacher/TeacherHome.vue";

import StudentHome from "../views/student/StudentHome.vue";

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
    path: '/allSchoolClases',
    name: 'AllScClasses',
    component: AllSchoolClasses
  },
  {
    path: '/allStudentClases',
    name: 'AllStClasses',
    component: AllStudentClasses
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
