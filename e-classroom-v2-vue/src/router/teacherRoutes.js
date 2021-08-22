import TeacherHome from "../views/homePages/TeacherHome.vue";
import MyCourses from "../views/courses/teacher/MyCourses.vue";
import MyCourses2 from "../views/courses/teacher/MyCourses2.vue";

import MyQuizzes from "../views/quizzes/teacher/MyQuizzes.vue";
import MyStudentClasses from "../views/studentClasses/teacher/MyStudentClasses.vue";
import MyStudents from "../views/users/teacher/MyStudents.vue";
import StudentProfileDetails from "../views/users/StudentProfileDetails.vue";
import MyMaterials from "../views/materials/teacher/MyMaterials.vue";

import MyCourseDetails from "../views/courses/teacher/MyCourseDetails.vue";
import TeacherCourses from "../views/courses/TeacherCourses.vue";

import NewMaterial from "../views/materials/teacher/NewMaterial.vue";
import EditMaterial from "../views/materials/teacher/EditMaterial.vue";
import MaterialDetails from "../views/materials/teacher/MaterialDetails.vue";

import NewQuiz from "../views/quizzes/teacher/NewQuiz.vue";
import QuizDetails from "../views/quizzes/teacher/QuizDetails.vue";
import NewQuestion from "../views/quizzes/teacher/NewQuestion.vue";
// import QuestionInfoEdit from "../views/quizzes/teacher/QuestionInfoEdit.vue";
import NewAnswer from "../views/quizzes/teacher/NewAnswer.vue";
import EditAnswer from "../views/quizzes/teacher/EditAnswer.vue";

import ResultsListForQuiz from "../views/quizzes/teacher/ResultsListForQuiz.vue";

import Wall from "../views/wall/Wall.vue";

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
    path: "/myCourses2",
    name: "MyCourses2",
    component: MyCourses2,
    props: true,
    children: [
      {
        path: "/myCourses2/details/:id",
        name: "MyCourseDetails2",
        //component: MyCourseDetails2,
        component: () => import("../views/courses/teacher/MyCourseDetails2.vue"),
        props: true,
        // children: [
        //   {
        //     path: "teacherWall2",
        //     name: "TeacherWall2",
        //     component: Wall,
        //     props: true,
        //   },
        // ],
      },
    ],
  },
  {
    path: "/myCourses/:id",
    name: "MyCourseDetails",
    component: MyCourseDetails,
    props: true,
    redirect: { name: "TeacherWall" },
    children: [
      {
        path: "teacherWall",
        name: "TeacherWall",
        component: Wall,
        props: true,
      },
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
      {
        path: "students/:studId",
        name: "StDetailsProf",
        component: StudentProfileDetails,
        props: true,
      },
      {
        path: "results/quiz/:quizId",
        name: "ProfResForQuiz",
        component: ResultsListForQuiz,
        props: true,
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
    path: "/myCourse/:id/quizDetails/:quizId/newQuestion",
    name: "NewQuestion",
    component: NewQuestion,
    props: true,
  },
  // {
  //   path: "/myCourse/:id/quizDetails/:quizId/eitQuestion/:questionId",
  //   name: "EditQuestion",
  //   component: QuestionInfoEdit,
  //   props: true,
  // },
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
