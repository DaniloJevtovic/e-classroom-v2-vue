import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./adminRoutes.js";
import teacherRoutes from "./teacherRoutes.js";
import studentRoutes from "./studentRoutes.js";

import Home from "../views/Home.vue";

import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";

const routes = [
  ...adminRoutes,
  ...teacherRoutes,
  ...studentRoutes,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
