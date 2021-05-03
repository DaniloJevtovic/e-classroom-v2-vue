import StudentCourses from "../views/courses/student/StudentCourses.vue";
import StudentCourseDetails from "../views/courses/student/StudentCourseDetails.vue";

import StudentMaterials from "../views/courses/student/StudentMaterials.vue";
import StudentQuizzes from "../views/courses/student/StudentQuizzes.vue";

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
    ],
  },
];
