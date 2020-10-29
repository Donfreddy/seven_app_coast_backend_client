<!-- 
  *This is the login page. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 10/08/2020, 
  *Contributors: Contributors names,
-->
/** **/

<template>
  <div class="text-center main_div bg">
    <div class="vue-tempalte my-auto d-block mx-auto">
      <div class="form-header text-white">
        <h2>{{ $t("login.title") }}</h2>
      </div>

      <div class="form-style">
        <form>
          <font-awesome-icon
            size="6x"
            :icon="{ prefix: 'far', iconName: 'user' }"
            class="mb-4 icon-color"
          />
          <div class="form-group">
            <input
              type="email"
              class="form-control form-control-lg"
              v-model="admin.email"
              :placeholder="$t('login.username')"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control form-control-lg"
              v-model="admin.password"
              :placeholder="$t('login.password')"
            />
          </div>

          <div v-if="showBtn">
            <button
              type="submit"
              class="btn  btn-lg btn-block custom-btn text-white"
              @click.prevent="login"
            >
              {{ $t("login.login") }}
            </button>
          </div>
          <div v-if="isLoading">
            <div class="spinner-border mt-3 custom-spinner" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import background from "../../assets/img/background.png";
import { baseUrl } from "../../global";
//import axios from 'axios';

export default {
  data() {
    return {
      admin: {
        email: "",
        password: "",
      },

      background,
      showBtn: true,
      isLoading: false,
    };
  },
  methods: {
    // login: function() {
    //   this.isLoading = true;
    //   this.showBtn = false;

    //   let username = this.admin.email;
    //   let password = this.admin.password;
    //   this.$store
    //     .dispatch("login", { username, password })
    //     .then(() => {
    //       this.isLoading = true;
    //       this.showBtn = false;
    //       this.$toast.open({
    //         message: "Auth successful!",
    //         type: "info",
    //       });

    //       this.$router.push("/dashBoard");
    //     })
    //     .catch((err) => {
    //       console.log("Something wrong: " + err);
    //       this.$toast.open({
    //         message: "Auth fail! try again",
    //         type: "error",
    //       });
    //       this.isLoading = false;
    //       this.showBtn = true;
    //     });
    // },
    login: function() {
      this.isLoading = true;
      this.showBtn = false;

      this.$http
        .post(`${baseUrl}/login`, {
          username: this.admin.email,
          password: this.admin.password,
        })
        .then((response) => {
          this.$localStorage.set("token", response.body.token);

          return response.json();
        })
        .then((data) => {
          if (data.status == true) {
            this.isLoading = true;
            this.$toast.open({
              message: "Auth successful!",
              type: "info",
            });
            this.$router.push({
              path: "/dashBoard",
            });
          } else {
            this.$toast.open({
              message: "Auth fail! try again",
              type: "error",
            });
            this.isLoading = false;
            this.showBtn = true;
          }
        });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.bg {
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  align-items: center;
  background-color: #05ab9f;
}

.custom-btn {
  background-color: #05ab9f;
}

.custom-spinner {
  color: #05ab9f;
}

.vue-tempalte {
  box-sizing: border-box;
  background: white !important;
  height: 490px;
  display: flex;
  font-weight: 400;
  position: relative;
}

.form-header {
  padding: 20px;
  height: 300;
  background: #f79623;
}

.form-style {
  padding: 50px;
}

.icon-color {
  color: #707070;
}
</style>
