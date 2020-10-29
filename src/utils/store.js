/**
 *This is use for vue store. {@link name}
 *@author Freddy Tamwo,
 *@date Aug 18/08/2020,
 *Contributors: Contributors names,
 **/

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { baseUrl } from "../global";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    admin: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, admin) {
      state.status = "success";
      state.token = token;
      state.admin = admin;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
    login({ commit }, admin) {
      return new Promise((resolve, reject) => {
        commit("auth_request");

        axios({
          url: `${baseUrl}/login`,
          data: admin,
          method: "POST",
        })
          .then((resp) => {
            console.log(resp);
            const token = resp.data.token;
            const admin = resp.data.admin;
            localStorage.setItem("token", token);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, admin);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
});

