<!-- 
  *This is the modal to delete question {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 17/08/2020, 
  *Contributors: Contributors names,
-->

<template>
<div class="text-center p-5">
  <h2 class="my-2">{{ $t('sectors.delete') }} {{ title }} ?</h2>
  <!-- Loader element -->
  <div class="center-loader text-center my-3" v-if="isLoadSpinner == true">
    <div>
      <div class="spinner-border mt-3 custom-spinner" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <!-- Button element -->
  <div class="row pt-3" v-if="isLoadSpinner == false">
    <div class="col-md-6">
      <button type="submit" class="btn btn-block btn-danger mt-3 mb-3 text-white" @click="hideAll">
         {{ $t("single.close") }}
      </button>
    </div>
    <div class="col-md-6">
      <button @click="deleteSector(id)" type="submit" class="btn btn-block storeButton mt-3 mb-3 text-white">
        {{ $t('sectors.label.delete') }}
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
  props: ["description", "title", "id", "image", "base_price"],
  data() {
    return {
      //statement
      isLoadSpinner: false,
    };
  },
  methods: {
    hideAll: function () {
      this.$modal.hideAll();
    },
    deleteSector: function (id) {
      //statement
      const option = {
        headers: {
          token: this.$localStorage.get("token")
        },
      };
      this.$http
        .delete(`${baseUrl}/sectors/${id}`, option)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("this is the sector id: " + data.id);
          this.$emit("close");
        });
    },
  },

};
</script>

<style scoped></style>
