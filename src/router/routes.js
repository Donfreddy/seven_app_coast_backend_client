/**
 *This is the app route. {@link name}
 *@author Freddy Tamwo,
 *@date Aug 14/08/2020,
 *Contributors: Contributors names,
 **/


import Vue from "vue";
import VueRouter from "vue-router";
import store from "../utils/store";

import MainPage from "../components/Dashboard/MainPage.vue";
import Login from "../components/login/Login.vue";
import Sector from "../components/Dashboard/sectors/Sector.vue";
import Platform from "../components/Dashboard/Platforms/Platform.vue";
import Question from "../components/Dashboard/questions/Question.vue";
import Email from "../components/Dashboard/email/Email.vue";
import Message from "../components/Dashboard/message/Message.vue";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",

  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: Login, name: "login" },
    {
      path: "/dashboard",
      component: MainPage,
      children: [
        { path: "", component: Sector },
        {
          path: ":id/platform",
          component: Platform,
          name: "platforms",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: ":id/question",
          component: Question,
          name: "questions",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "email",
          component: Email,
          name: "email",
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "message",
          component: Message,
          name: "message",
          meta: {
            requiresAuth: true,
          },
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    //{ path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("");
  } else {
    next();
  }
});

export default router;
