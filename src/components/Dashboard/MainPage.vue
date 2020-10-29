<!-- 
  *This is the main page of admin dashboard. {@link name}
  *@author Freddy Tamwo,
  *@date Aug 10/08/2020,
  *Contributors: Contributors names,
-->

<template>
<div class="">
  <navbar></navbar>
  <div class="container">

    <router-view></router-view>
  </div>
</div>
</template>

<script>
import AppNavbar from "./nav/NavBar";
import background from "../../assets/img/background.png";

export default {
  data() {
    return {
      background,
    };
  },
  components: {
    navbar: AppNavbar,
  },
};
</script>

<style>
body {
  background-color: #f6f6f6;
}
</style>
