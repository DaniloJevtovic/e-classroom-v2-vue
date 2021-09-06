import AdminHome from "../views/homePages/AdminHome.vue";
import Users from "../views/users/admin/Users.vue";
import AllUsers from "../views/users/admin/AllUsers.vue";
import AllUsersPagination from "../views/users/admin/allUsers/AllUsersPagination.vue";
import AllTeachers from "../views/users/admin/AllTeachers.vue";
import NewTeacher from "../views/users/admin/NewTeacher.vue";
import AllStudents from "../views/users/admin/AllStudents.vue";
import AllParents from "../views/users/admin/AllParents.vue";
import NewStudent from "../views/users/admin/NewStudent.vue";
import NewParent from "../views/users/admin/NewParent.vue";
import NewStudentForStClass from "../views/users/admin/NewStudentForStClass.vue";
import StudentProfileDetails from "../views/users/StudentProfileDetails.vue";

import AllCourses from "../views/courses/admin/AllCourses.vue";
// import ScClasses from "../views/courses/admin/ScClasses.vue";

import NewCourse from "../views/courses/admin/NewCourse.vue";
import CourseDetails from "../views/courses/admin/CourseDetails.vue";
import EditCourse from "../views/courses/admin/EditCourse.vue";

import AllSchoolClasses from "../views/schoolClasses/AllSchoolClasses.vue";
import SchoolClassDetails from "../views/schoolClasses/SchoolClassDetails.vue";
import NewSchoolClass from "../views/schoolClasses/NewSchoolClass.vue";
import EditSchoolClass from "../views/schoolClasses/EditSchoolClass.vue";

import AllStudentClasses from "../views/studentClasses/admin/AllStudentClasses.vue";
//import StudentClassDetails from "../views/studentClasses/StudentClassDetails.vue";
import NewStudentClass from "../views/studentClasses/admin/NewStudentClass.vue";
import EditStudentClass from "../views/studentClasses/admin/EditStudentClass.vue";
import CoursesForScClass from "../views/courses/admin/CoursesForScClass.vue";
import StClassesForScClass from "../views/studentClasses/StClassesForScClass.vue";
import NewCourseForScClass from "../views/courses/admin/NewCourseForScClass.vue";

export default [
  {
    path: "/adminHome",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    redirect: {
      name: "AllUsers",
      //name: 'AllTeachers'   //preusmjerice na sve profesore
    },
    children: [
      {
        path: "allUsers",
        name: "AllUsers",
        component: AllUsers,
      },
      {
        path: "allUsersPagination",
        name: "AllUsersPagination",
        component: AllUsersPagination,
      },
      {
        path: "allTeachers",
        name: "AllTeachers",
        component: AllTeachers,
      },
      {
        path: "allStudents",
        name: "AllStudents",
        component: AllStudents,
      },
      // i dole imas istu ovu komponentu kad detaljima pristupas iz odjeljenja!
      {
        path: "allStudents/:studId",
        name: "StUserDetailsAdmin",
        component: StudentProfileDetails,
        props: true,
      },
      {
        path: "allParents",
        name: "AllParents",
        component: AllParents,
      },
    ],
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
  {
    path: "/newParent",
    name: "NewParent",
    component: NewParent,
    props: true,
  },

  {
    path: "/allCourses",
    name: "AllCourses",
    component: AllCourses,
  },
  // {
  //   path: "/allScCourses",
  //   name: "AllScCourses",
  //   component: ScClasses,
  // },
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
    path: "/editCourse/:id",
    name: "EditCourse",
    component: EditCourse,
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
    path: "/editSchoolClass/:id",
    name: "EditSchoolClass",
    component: EditSchoolClass,
    props: true,
  },
  {
    path: "/scClassDetails/:id",
    name: "ScClassDetails",
    component: SchoolClassDetails,
    //https://stackoverflow.com/questions/55484090/vue-router-default-child-route-not-loading-initially
    redirect: {
      name: "CoursesForScClass",
    },
    props: true,
    children: [
      {
        path: "courses",
        name: "CoursesForScClass",
        component: CoursesForScClass,
        props: true,
      },

      {
        path: "students",
        name: "StClassesForScClass",
        component: StClassesForScClass,
        props: true,
      },
      {
        path: "studentDetails/:studId",
        name: "StDetailsAdmin",
        component: StudentProfileDetails,
        props: true,
      },
    ],
  },

  // {
  //   path: "/students/:id",
  //   name: "StDetailsAdmin",
  //   component: StudentProfileDetails,
  //   props: true,
  // },
  {
    path: "/stClass/:id/newStudent",
    name: "NewStudentForStClass",
    component: NewStudentForStClass,
    props: true,
  },
  {
    path: "/allStudentClases",
    name: "AllStClasses",
    component: AllStudentClasses,
  },
  // {
  //   path: "/scoolClass/:scId/stClass/:stClassId",
  //   name: "StudentClassDetails",
  //   component: StudentClassDetails,
  //   props: true,
  // },
  {
    path: "/sc/:id/newStudentClass",
    name: "NewStudentClass",
    component: NewStudentClass,
    props: true,
  },
  {
    path: "/sc/:id/stClass/:stcId/edit",
    name: "EditStudentClass",
    component: EditStudentClass,
    props: true,
  },
  {
    path: "/sc/:id/newCourse",
    name: "NewCourseForScClass",
    component: NewCourseForScClass,
    props: true,
  },
];
