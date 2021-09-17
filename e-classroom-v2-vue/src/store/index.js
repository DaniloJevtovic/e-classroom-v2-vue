import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index.js";

export default createStore({
  state: {
    loggedUser: null,
    linksForLoggedUser: [],

    adminLinks: [
      "AllScClasses",
      "AllScClasses2",
      "Users",
      "AllCourses",
      "Messages",
      "UserProfile",
    ],
    teacherLinks: ["MyCourses", "MyCourses2", "Messages", "UserProfile"],
    studentLinks: [
      "StudentCourses",
      "StudentCourses2",
      "StudentAllResults",
      "Messages",
      "UserProfile",
    ],
    parentLinks: ["ParentStList", "Messages", "UserProfile"],
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
          console.log(state.adminLinks);
          state.linksForLoggedUser = state.adminLinks;
          router.push({ name: "AllScClasses" });
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

    setLoggedUser(state) {
      state.loggedUser = JSON.parse(localStorage.getItem("user"));
      console.log("ul. kor", state.loggedUser);
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
  plugins: [createPersistedState()],
});
