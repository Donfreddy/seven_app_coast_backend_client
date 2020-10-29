<!-- 
  *This is the Modal view answer. {@link name}
  *@author Author/Freddy Tamwo,
  *@date Aug 19/08/2020, 
  *Contributors: Contributors names,
-->
/** **/
<template>
<transition name="modal-fade " class="">
  <div class="">
    <div class="header d-flex justify-content-between animate__animated animate__fadeIn">

      <div></div>
      <h5 class="titre  text-center text-white pt-4 animate__animated animate__fadeIn">
        {{ email }}
      </h5>
      <div>
        <i class="fas fa-times mr-5 mt-3 text-white fa-2x close animate__animated animate__fadeIn" @click="hideAll"></i>
      </div>
    </div>

    <div class="modal-content p-5 animate__animated animate__fadeIn">
      <div class="modal-body">

        <div class="d-flex animate__animated animate__fadeIn">
          <p>Date :</p>
          <strong class="ml-2 animate__animated animate__fadeIn">{{ date | moment("dddd, MMMM Do YYYY") }}</strong>
        </div>
        <div class="d-flex animate__animated animate__fadeIn">
          <p>Phone :</p>
          <strong class="ml-2 animate__animated animate__fadeIn">{{ phone }}</strong>
        </div>
        <div class="d-flex">
          <p>Subject :</p>
          <strong class="ml-2 animate__animated animate__fadeIn"> {{ subject }}</strong>
        </div>
        <p class="mt-5 font-weight-bold animate__animated animate__fadeIn">{{ message }}</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import {
  baseUrl
} from "../../../../global";
export default {
  props: {
    subject: {},
    email: {},
    message: {},
    date: {},
    phone: {},

  },

  data() {
    return {
      url: baseUrl,
      headers: [{
          text: "Questions",
          align: "start",
          value: "question",
        },
        {
          text: "Answers",
          sortable: false,
          value: "answer"
        },
        {
          text: "Price (XAF)",
          value: "price"
        },
      ],
    };
  },
  methods: {
    hideAll: function () {
      this.$modal.hideAll();
    },
  },
  created() {
    console.log(this.response);
  },
};
</script>

<style scoped>
.titre {
  font-size: 25px;
  font-weight: bold;
}

.header {
  background-color: #f79623;
  min-height: 80px;
}

.color {
  color: #05ab9f;
}

.storeButton {
  background-color: #05ab9f;
}

.bold {
  font-size: 40px;
  font-weight: bold;
}
</style>
