import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index.js";

export default createStore({
  state: {
    loggedUser: null,
    linksForLoggedUser: [],

    adminLinks: [
      // "AdminHome",
      "Users",
      "AllCourses",
      "AllScClasses",
      "Messages"
    ],
    teacherLinks: ["MyCourses", "Messages"],
    studentLinks: ["StudentCourses", "StudentAllResults", "Messages"],
    parentLinks: ['ParentStList', "Messages"],
  },
  getters: {
    getLoggedUser(state) {
      return state.loggedUser;
    },
    getLinksForLoggedUser(state) {
      return state.linksForLoggedUser;
    },
  },
  mutations: {
    parseTokenAndSaveUser(state) {
      let token = localStorage.getItem("token");
      console.log("token storage", token);

      if (token != null) {
        var base64Payload = token.split(".")[1];
        var payload = Buffer.from(base64Payload, "base64");

        let user = JSON.parse(payload.toString());
        localStorage.setItem("user", JSON.stringify(user.user));

        state.loggedUser = user.user;
      }
    },

    setLinksForLoggedUser(state) {
      if (state.loggedUser) {
        if (state.loggedUser.authorities[0].authority === "ROLE_ADMIN") {
          state.linksForLoggedUser = state.adminLinks;
          router.push({ name: "AdminHome" });
        } else if (
          state.loggedUser.authorities[0].authority === "ROLE_TEACHER"
        ) {
          state.linksForLoggedUser = state.teacherLinks;
          router.push({ name: "MyCourses" });
        } else if (
          state.loggedUser.authorities[0].authority === "ROLE_STUDENT"
        ) {
          state.linksForLoggedUser = state.studentLinks;
          router.push({ name: "StudentCourses" });
        } else if (
          state.loggedUser.authorities[0].authority === "ROLE_PARENT"
        ) {
          state.linksForLoggedUser = state.parentLinks;
          router.push({ name: "ParentStList" });
        } else {
          state.loggedUserLinks = [];
          router.push({ name: "Login" });
        }
      }
    },

    logout(state) {
      state.loggedUser = null;
      state.linksForLoggedUser = [];
      localStorage.clear();
      router.push({ name: "Login" });
    },
  },
  actions: {
    async login(context, payload) {
      try {
        const response = await axios.post(
          "http://localhost:5555/auth/login/",
          JSON.stringify(payload),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.setItem("token", response.data.accessToken);

        context.commit("parseTokenAndSaveUser");
        context.commit("setLinksForLoggedUser");

        console.log(response);
      } catch (err) {
        console.log("greska", err.message);
      }
    },

    loginRefresh(context) {
      context.commit("parseTokenAndSaveUser");
      context.commit("setLinksForLoggedUser");
    },

    logout(context) {
      context.commit("logout");
    },
  },
  modules: {},
});
