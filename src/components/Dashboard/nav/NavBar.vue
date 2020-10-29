<!-- 
  *This is the navigation bar. {@link name} 
  *@author Author/Freddy Tamwo,
  *@date Aug 10/08/2020, 
  *Contributors: Contributors names, 
-->

/** **/

<template>
  <nav class="navbar navbar-expand-md navbar-dark bgNav">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ">
          <li
            class="nav-item  text-center mr-3"
            :class="{ active: dashBoardIsClick }"
            @click="gotoDashBoard"
          >
            <a
              ><i
                class="fa fa-home "
                :class="{
                  isCurrent: dashBoardIsClick,
                  unCurrent: dashBoardleft,
                }"
              ></i
            ></a>
            <a
              class="nav-link"
              :class="{ isCurrent: dashBoardIsClick, unCurrent: dashBoardleft }"
              >{{ $t("navBar.dashBoard") }}
            </a>
          </li>
          <li
            class="nav-item text-center"
            :class="{ active: emailIsClick }"
            @click="gotoEmail"
          >
            <a
              ><i
                class="fa fa-envelope-open"
                :class="{ isCurrent: emailIsClick, unCurrent: emailleft }"
              ></i
            ></a>
            <a
              class="nav-link"
              :class="{ isCurrent: emailIsClick, unCurrent: emailleft }"
              >{{ $t("navBar.Email address") }}</a
            >
          </li>
          <li
            class="nav-item text-center "
            :class="{ active: messageIsClick }"
            @click="gotoMessage"
          >
            <a
              ><i
                class="fas fa-comment-alt "
                :class="{ isCurrent: messageIsClick, unCurrent: messageleft }"
              ></i
            ></a>
            <a
              class="nav-link"
              :class="{ isCurrent: messageIsClick, unCurrent: messageleft }"
              >{{ $t("navBar.Messages") }}</a
            >
          </li>
        </ul>

        <div class="navbar-nav mr-auto ml-auto logo">
          <img :src="logo" alt="" width="200px" />
        </div>
        <div>
          <select class="custom-select lang" v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item text-center ml-3">
            <a
              ><i
                class="fa fa-sign-out unCurrent
          "
              ></i
            ></a>
            <a class="nav-link" @click="logout" href="#">
              {{ $t("navBar.logout") }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "../../../assets/img/logo.png";
import logoEn from "../../../assets/en.png";
import logoFr from "../../../assets/fr.png";

export default {
  name: "navbar",
  data() {
    return {
      langs: ["en", "fr"],
      options: ["Mobile App", "Web App", "Mobile/Web"],
      value: "",
      logoEn,
      logoFr,
      logo,
      //email
      emailIsClick: false,
      emailleft: true,
      //dashboard
      dashBoardIsClick: false,
      dashBoardleft: true,
      //message
      messageIsClick: false,
      messageleft: true,
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({
          name: "home",
        });
      });
    },
    gotoEmail: function() {
      this.emailIsClick = true;
      this.dashBoardIsClick = false;
      this.dashBoardleft = true;
      this.messageIsClick = false;
      this.messageleft = true;
      this.$router.push({
        name: "email",
      });
    },
    gotoMessage: function() {
      this.messageIsClick = true;
      this.messageleft = false;
      this.dashBoardIsClick = false;
      this.dashBoardleft = true;
      this.emailIsClick = false;
      this.emailleft = true;
      this.$router.push({
        name: "message",
      });
    },
    gotoDashBoard: function() {
      this.dashBoardIsClick = true;
      this.dashBoardleft = false;
      this.messageIsClick = false;
      this.messageleft = true;
      this.emailIsClick = false;
      this.emailleft = true;
      this.$router.push({
        path: "/dashBoard",
      });
    },
    changeLang() {},
  },
};
</script>

<style scoped>
.lang {
  width: 180%;
}
.unCurrent {
  color: #8fd5cf;
}

.isCurrent {
  color: white;
}

@media screen and (max-width: 767px) {
  .logo,
  .fa {
    display: none;
  }
}

.bgNav {
  background: #05ab9f;
}

.social-icon {
  width: 150px;
}

i {
  font-size: 30px;
}
</style>
