import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./adminRoutes.js";
import teacherRoutes from "./teacherRoutes.js";
import studentRoutes from "./studentRoutes.js";
import parentRoutes from "./parentRoutes.js";
import messageRoutes from "./messageRoutes.js";

import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import UserProfile from '../views/users/UserProfile.vue'

const routes = [
  ...adminRoutes,
  ...teacherRoutes,
  ...studentRoutes,
  ...parentRoutes,
  ...messageRoutes,
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
  {
    path: "/userProfile", 
    name: "UserProfile",
    component: UserProfile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
