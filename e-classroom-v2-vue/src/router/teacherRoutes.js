import TeacherHome from "../views/homePages/TeacherHome.vue";
import MyCourses from "../views/courses/teacher/MyCourses.vue";
import MyQuizzes from "../views/quizzes/teacher/MyQuizzes.vue";
import MyStudentClasses from "../views/courses/teacher/MyStudentClasses.vue";
import MyStudents from "../views/courses/teacher/MyStudents.vue";
import MyMaterials from "../views/materials/teacher/MyMaterials.vue";
import MyCourseInfo from "../views/courses/teacher/MyCourseInfo.vue";

import MyCourseDetails from "../views/courses/teacher/MyCourseDetails.vue";
import TeacherCourses from "../views/courses/TeacherCourses.vue";

import NewMaterial from "../views/materials/teacher/NewMaterial.vue";
import EditMaterial from "../views/materials/teacher/EditMaterial.vue";
import MaterialDetails from "../views/materials/teacher/MaterialDetails.vue";

import NewQuiz from "../views/quizzes/teacher/NewQuiz.vue";
import QuizDetails from "../views/quizzes/teacher/QuizDetails.vue";
import EditQuiz from "../views/quizzes/teacher/EditQuiz.vue";
import NewQuestion from "../views/quizzes/teacher/NewQuestion.vue";
import EditQuestion from "../views/quizzes/teacher/EditQuestion.vue";
import NewAnswer from "../views/quizzes/teacher/NewAnswer.vue";
import EditAnswer from "../views/quizzes/teacher/EditAnswer.vue";

export default [
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
    redirect: { name: "MyMaterials" },
    children: [
      {
        path: "materials",
        name: "MyMaterials",
        component: MyMaterials,
      },
      {
        path: "newMaterial",
        name: "NewMaterial",
        component: NewMaterial,
        props: true,
      },
      {
        path: "quizzes",
        name: "MyQuizzes",
        component: MyQuizzes,
      },
      {
        path: "students",
        name: "MyStudents",
        component: MyStudentClasses,
      },
    ],
  },
  {
    path: "/material/:id",
    name: "EditMaterial",
    component: EditMaterial,
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
  {
    path: "/myCourse/:id/editQuiz/:quizId",
    name: "EditQuiz",
    component: EditQuiz,
    props: true,
  },
  {
    path: "/myCourse/:id/quizDetails/:quizId/newQuestion",
    name: "NewQuestion",
    component: NewQuestion,
    props: true,
  },
  {
    path: "/myCourse/:id/quizDetails/:quizId/eitQuestion/:questionId",
    name: "EditQuestion",
    component: EditQuestion,
    props: true,
  },
  {
    path: "/myCourse/:id/quizDetails/:quizId/question/:questionId/newAnswer",
    name: "NewAnswer",
    component: NewAnswer,
    props: true,
  },
  {
    path:
      "/myCourse/:id/quizDetails/:quizId/question/:questionId/editAnswer/:answerId",
    name: "EditAnswer",
    component: EditAnswer,
    props: true,
  },
];
