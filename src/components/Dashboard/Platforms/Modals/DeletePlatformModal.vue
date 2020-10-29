<!-- 
  *This is modal for delete platform. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 17/08/2020, 
  *Contributors: Contributors names,
-->

<template>
<div class="text-center p-5">
  <h5 class="my-2">{{$t('platforms.label.delete')}} {{ name }} ?</h5>
  <!-- Loader element -->
  <div class="center-loader text-center my-3" v-if="isLoadSpinner == true">
    <div>
      <div class="spinner-border mt-3 custom-spinner" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <!-- Button element -->
  <div class="row " v-if="isLoadSpinner == false">
    <div class="col-md-6">
      <button type="submit" class="btn btn-block btn-danger mt-3 mb-3 text-white" @click="hideAll">
        {{$t('single.close')}}
      </button>
    </div>
    <div class="col-md-6">
      <button @click="deletePlatform" type="submit" class="btn btn-block storeButton mt-3 mb-3 text-white">
        {{$t('platforms.delete')}}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {
  baseUrl
} from "../../../../global";

export default {
  props: ["id", "name"],
  data() {
    return {
      isLoadSpinner: false,
      isLoading: false,
    };
  },
  methods: {
    hideAll: function () {
      this.$modal.hideAll();
    },
    deletePlatform: function () {
      this.isLoadSpinner = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token")
        },
      };
      this.$http
        .delete(`${baseUrl}/platforms/${this.id}`, option)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("this is the sector id: " + data._id);
          this.$emit("close");
          this.isLoadSpinner = false;
        });
    },
  },
};
</script>

<style scoped></style>
