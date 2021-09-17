import StudentCourses from "../views/courses/student/StudentCourses.vue";
import StudentCourseDetails from "../views/courses/student/StudentCourseDetails.vue";

import StudentMaterials from "../views/materials/student/StudentMaterials.vue";
import StudentMaterialDetails from "../views/materials/student/StudentMaterialDetails.vue";

import StudentQuizzes from "../views/quizzes/student/StudentQuizzes.vue";
import StudentQuizDetails from "../views/quizzes/student/StudentQuizDetails.vue";
import StudentSolveQuiz from "../views/quizzes/student/StudentSolveQuiz.vue";

import StudentAllResults from "../views/quizzes/student/res/StudentAllResults.vue";
import StudentQuizResults from "../views/quizzes/student/res/StudentQuizResults.vue";

import Wall from "../views/wall/Wall.vue";

export default [
  {
    path: "/studentCourses",
    name: "StudentCourses",
    component: StudentCourses,
  },
  {
    path: "/studentCourse/:id",
    name: "StudentCourseDetails",
    component: StudentCourseDetails,
    props: true,
    redirect: { name: "StudentWall" },
    children: [
      {
        path: "studentWall",
        name: "StudentWall",
        component: Wall,
        props: true,
      },
      {
        path: "materials",
        name: "StudentMaterials",
        component: StudentMaterials,
        props: true,
      },
      {
        path: "quizzes",
        name: "StudentQuizzes",
        component: StudentQuizzes,
        props: true,
      },
      {
        path: "quizzes/quiz/:quizId",
        name: "StudentQuizDetails",
        component: StudentQuizDetails,
        props: true,
      },
      {
        path: "quizzes/quiz/:quizId/solve",
        name: "StudentSolveQuiz",
        component: StudentSolveQuiz,
        props: true,
      },
    ],
  },
  {
    path: "/studentCourse/:id/materialDetails/:matId",
    name: "StudentMaterialDetails",
    component: StudentMaterialDetails,
    props: true,
  },
  {
    path: "/allMyResults",
    name: "StudentAllResults",
    component: StudentAllResults,
  },
  {
    path: "/resultDetails/:id",
    name: "StudentQuizResults",
    component: StudentQuizResults,
    props: true,
  },

  {
    path: "/StudentCourses2",
    name: "StudentCourses2",
    component: () => import("../views/courses/student/StudentCourses2.vue"),
    props: true,
    children: [
      {
        path: "/studentCourse/course/:id",
        name: "StudentCourseDetails",
        component: StudentCourseDetails,
        props: true,
        redirect: { name: "StudentWall" },
        children: [
          {
            path: "studentWall",
            name: "StudentWall",
            component: Wall,
            props: true,
          },
          {
            path: "materials",
            name: "StudentMaterials",
            component: StudentMaterials,
            props: true,
          },
          {
            path: "quizzes",
            name: "StudentQuizzes",
            component: StudentQuizzes,
            props: true,
          },
          {
            path: "quizzes/quiz/:quizId",
            name: "StudentQuizDetails",
            component: StudentQuizDetails,
            props: true,
          },
          {
            path: "quizzes/quiz/:quizId/solve",
            name: "StudentSolveQuiz",
            component: StudentSolveQuiz,
            props: true,
          },
        ],
      },
    ],
  },
];
