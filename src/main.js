import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

/********************** Vue import ********************************/

// Axios
import Axios from "axios";

import store from "./utils/store";

//bootstrap
import "bootstrap";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

// vee validate
import VeeValidate from "vee-validate";

// Router
import router from "./router/routes";
import VueResource from "vue-resource";

// Import Vue Toast
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

// Vue plugin for translate
import VueI18n from "vue-i18n";
import { languages } from "./i18n/index.js";
import { defaultLocale } from "./i18n/index.js";

//font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//local storage
import VueLocalStorage from "vue-localstorage";

// vue modal
import VModal from "vue-js-modal";
import vuetify from "./plugins/vuetify";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
//vue export to xls

/********************** Vue use *********************************/
Vue.use(VueMoment, {
  moment,
});

Vue.use(VueI18n);

const messages = Object.assign(languages);
var i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: "fr",
  messages,
});

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

//font awesome
library.add(fab, fas, far);

Vue.use(VeeValidate);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueResource);

// Access the response object which comes back from the api.
Vue.http.interceptors.push((request, next) => {
  next(function(response) {
    if (response.status == 401 && response.statusText == "Unauthorized") {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  });
});

Vue.use(VueLocalStorage);
// UseVue Toast
Vue.use(VueToast);
Vue.use(VModal);
Vue.use(Vuex);

// Router
Vue.config.productionTip = false;

/********************** Vue instance *********************************/

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  store,
  i18n,
}).$mount("#app");
