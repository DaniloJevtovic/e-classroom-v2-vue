import StudentCourses from "../views/courses/student/StudentCourses.vue";
import StudentCourseDetails from "../views/courses/student/StudentCourseDetails.vue";

import StudentMaterials from "../views/courses/student/StudentMaterials.vue";
import StudentMaterialDetails from "../views/materials/student/StudentMaterialDetails.vue";

import StudentQuizzes from "../views/quizzes/student/StudentQuizzes.vue";
import StudentQuizDetails from "../views/quizzes/student/StudentQuizDetails.vue";
import StudentSolveQuiz from "../views/quizzes/student/StudentSolveQuiz.vue";

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
    redirect: { name: "StudentMaterials" },
    children: [
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
        path: "quizzes/res/:stRes/quiz/:quizId/solve",
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
];
