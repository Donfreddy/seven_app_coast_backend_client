/** *This is the Sectors page of admin dashboard. {@link name} *@author Freddy
Tamwo, *@date Aug 17/08/2020, *Contributors: Contributors names, **/
<template>
  <div class="text-center p-5">
    <h5 class="my-2">Delete this Question ?</h5>
    <!-- Button element -->
    <div class="row " v-if="isLoadSpinner == false">
      <div class="col-md-6">
        <button
          type="submit"
          class="btn btn-block btn-danger mt-3 mb-3 text-white"
          @click="hideAll"
        >
          Close
        </button>
      </div>
      <div class="col-md-6">
        <button
          @click="deleteQuestion"
          type="submit"
          class="btn btn-block storeButton mt-3 mb-3 text-white"
        >
          Delete question
        </button>
      </div>
    </div>
    <!-- Loader element -->
        <div
          class="center-loader text-center my-3"
          v-if="isLoadSpinner == true"
        >
          <div>
            <div class="spinner-border mt-3 custom-spinner" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import { baseUrl } from "../../../../global";

export default {
  props: ["id"],
  data() {
    return {
      isLoadSpinner: false,
      isLoading: false,
    };
  },
  methods: {
      hideAll: function() {
      this.$modal.hideAll();
    },
    deleteQuestion: function() {
      this.isLoadSpinner = true;
      console.log("this is the id : " + this.id);
      const option = {
        headers: { token: this.$localStorage.get("token") },
      };
      this.$http
        .delete(`${baseUrl}/questions/${this.id}`, option)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("this is the delete response : " + data);
          this.$emit("close");
        });
    },
  },
};
</script>

<style scoped></style>
