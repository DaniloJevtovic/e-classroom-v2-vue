import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";

import AdminHome from "../views/homePages/AdminHome.vue";
import AllUsers from "../views/users/AllUsers.vue";
import AllTeachers from "../views/users/AllTeachers.vue";
import NewTeacher from "../views/users/NewTeacher.vue";
import AllStudents from "../views/users/AllStudents.vue";
import NewStudent from "../views/users/NewStudent.vue";

import AllCourses from "../views/courses/admin/AllCourses.vue";
import NewCourse from "../views/courses/admin/NewCourse.vue";
import CourseDetails from "../views/courses/admin/CourseDetails.vue";

import AllSchoolClasses from "../views/schoolClasses/AllSchoolClasses.vue";
import SchoolClassDetails from "../views/schoolClasses/SchoolClassDetails.vue";
import NewSchoolClass from "../views/schoolClasses/NewSchoolClass.vue";

import AllStudentClasses from "../views/studentClasses/AllStudentClasses.vue";
import StudentClassDetails from "../views/studentClasses/StudentClassDetails.vue";
import NewStudentClass from "../views/studentClasses/NewStudentClass.vue";

import TeacherHome from "../views/homePages/TeacherHome.vue";
import MyCourses from "../views/courses/teacher/MyCourses.vue";
import MyCourseDetails from "../views/courses/teacher/MyCourseDetails.vue";
import TeacherCourses from "../views/courses/TeacherCourses.vue";

import NewMaterial from "../views/materials/teacher/NewMaterial.vue";
import MaterialDetails from "../views/materials/teacher/MaterialDetails.vue";

import NewQuiz from "../views/quizzes/teacher/NewQuiz.vue";
import QuizDetails from "../views/quizzes/teacher/QuizDetails.vue";

import StudentHome from "../views/homePages/StudentHome.vue";
import StudentCourses from "../views/courses/student/StudentCourses.vue";
import StudentCourseDetails from "../views/courses/student/StudentCourseDetails.vue";
import StudentQuizDetails from "../views/quizzes/student/StudentQuizDetails.vue";
import StudentSolveQuiz from "../views/quizzes/student/StudentSolveQuiz.vue";

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
      {
        path: "/newTeacher",
        name: "NewTeacher",
        component: NewTeacher,
      },
      {
        path: "/newStudent",
        name: "NewStudent",
        component: NewStudent,
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
  {
    path: "/scoolClass/:scId/stClass/:stClassId",
    name: "StudentClassDetails",
    component: StudentClassDetails,
    props: true,
  },
  {
    path: "/sc/:id/newStudentClass",
    name: "NewStudentClass",
    component: NewStudentClass,
    props: true,
  },

  //teacher
  {
    path: "/teacherHome",
    name: "TeacherHome",
    component: TeacherHome,
  },
  {
    path: "/myCourses",
    name: "MyCourses",
    component: MyCourses,
  },
  {
    path: "/myCourse/:id",
    name: "MyCourseDetails",
    component: MyCourseDetails,
    props: true,
  },
  {
    path: "/teacherCourses",
    name: "TeacherCourses",
    component: TeacherCourses,
  },
  {
    path: "/myCourse/:id/newMaterial",
    name: "NewMaterial",
    component: NewMaterial,
    props: true,
  },
  {
    path: "/myCourse/:id/materialDetails/:matId",
    name: "MaterialDetails",
    component: MaterialDetails,
    props: true,
  },
  {
    path: "/myCourse/:id/newQuiz",
    name: "NewQuiz",
    component: NewQuiz,
    props: true,
  },
  {
    path: "/myCourse/:id/quizDetails/:quizId",
    name: "QuizDetails",
    component: QuizDetails,
    props: true,
  },

  //student
  {
    path: "/studentHome",
    name: "StudentHome",
    component: StudentHome,
  },
  {
    path: "/studentCourses",
    name: "StudentCourses",
    component: StudentCourses,
  },
  {
    path: "/studentCourses/:id",
    name: "StCourseDetails",
    component: StudentCourseDetails,
    props: true,
  },
  {
    path: "/studentCourses/:id/quizDetails/:quizId",
    name: "StudentQuizDetails",
    component: StudentQuizDetails,
    props: true,
  },
  {
    path: "/studentCourses/:id/solveQuiz/:quizId",
    name: "StudentSolveQuiz",
    component: StudentSolveQuiz,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
