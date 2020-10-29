<!-- 
  *This is the Modal view answer. {@link name}
  *@author Author/Freddy Tamwo,
  *@date Aug 19/08/2020, 
  *Contributors: Contributors names,
-->

<template>
<transition name="modal-fade">
  <div class="">
    <div class="header d-flex justify-content-between">
      <div></div>
      <h5 class="titre  text-center text-white pt-4 animate__animated animate__fadeIn">
        {{ email }}
      </h5>
      <div>
        <i class="fas fa-times mr-5 mt-3 text-white fa-2x close animate__animated animate__fadeIn" @click="hideAll"></i>
      </div>
    </div>

    <div class="modal-content animate__animated animate__fadeIn">
      <div class="modal-body">
        <div class="p-5">
          <div class="row">
            <div class="col-md-6 ">
              <div class="d-flex bold">
                <h4>Selected Sector :</h4>
                <h4 class="color ml-2">{{ sector }}</h4>
              </div>
              <div class="d-flex">
                <p>Date :</p>
                <strong class="ml-2">{{
                    date | moment("dddd, MMMM Do YYYY")
                  }}</strong>
              </div>
              <div class="d-flex">
                <p>Name :</p>
                <strong class="ml-2 animate__animated animate__fadeIn">{{ name }}</strong>
              </div>
              <div class="d-flex">
                <p>Tel :</p>
                <strong class="ml-2 animate__animated animate__fadeIn"> {{ phone }}</strong>
              </div>
            </div>

            <div class="col-md-6">
              <div class="d-flex  justify-content-end">
                <h4>Selected Platform :</h4>
                <h4 class="color ml-2 animate__animated animate__fadeIn">{{ platform }}</h4>
              </div>
              <div class="d-flex justify-content-end animate__animated animate__fadeIn">
                <p>Estimate cost :</p>
                <strong class="ml-2">{{ price }} XAF</strong>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <v-data-table :headers="headers" :items="response" class="elevation-1 animate__animated animate__fadeIn"></v-data-table>
          </div>
          <div class="row "></div>
        </div>
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
    id: {},
    email: {},
    sector: {},
    platform: {},
    price: {},
    date: {},
    questions: {},
    response: {},
    name: {},
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
          value: "answer.title"
        },
        {
          text: "Price (XAF)",
          value: "answer.price"
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
.v-data-table-header {
  background: #05ab9f;
}

.modal-content {
  overflow-y: auto;
  max-height: 730px;
}

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
