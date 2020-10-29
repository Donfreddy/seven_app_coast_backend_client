<!-- 
  *This is modal to edit sector. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 17/08/2020, 
  *Contributors: Contributors names,
-->

<template>
  <transition name="modal-fade">
    <div class="">
      <div class="header">
        <h5 class="titre  text-center text-white pt-4">
          {{ $t("sectors.edit") }}
        </h5>
      </div>
      <div class="body px-5 pt-4">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">{{
                  $t("sectors.label.name")
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  name="sector"
                  v-validate="'required'"
                  v-model="sector.title"
                  :placeholder="placeholder.name"
                  :class="{
                    'is-invalid':
                      submitted && errors.has('sector') ? true : false,
                  }"
                />
                <div
                  v-if="submitted && errors.has('sector')"
                  class="invalid-feedback"
                >
                  {{ errors.first("sector") }}
                </div>
              </div>
            </div>
            <div class="col-md-6 ">
              <div class="form-group">
                <label for="exampleInputEmail1">{{
                  $t("sectors.label.icon")
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  name="Icon"
                  v-validate="'required'"
                  v-model="sector.sector_icon"
                  :placeholder="placeholder.icon"
                  :class="{
                    'is-invalid':
                      submitted && errors.has('Icon') ? true : false,
                  }"
                />
                <div
                  v-if="submitted && errors.has('Icon')"
                  class="invalid-feedback"
                >
                  {{ errors.first("Icon") }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">{{
              $t("sectors.label.desc")
            }}</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="Description"
              :placeholder="placeholder.desc"
              v-validate="'required'"
              v-model="sector.desc"
              :class="{
                'is-invalid':
                  submitted && errors.has('Description') ? true : false,
              }"
            ></textarea>
            <div
              v-if="submitted && errors.has('Description')"
              class="invalid-feedback"
            >
              {{ errors.first("Description") }}
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
          <!-- Button element -->
          <div class="row " v-if="isLoadSpinner == false">
            <div class="col-md-6">
              <button
                type="submit"
                class="btn btn-block btn-danger mt-3 mb-3 text-white"
                @click="hideAll"
              >
                {{ $t("single.close") }}
              </button>
            </div>
            <div class="col-md-6">
              <button
                type="submit"
                class="btn btn-block storeButton mt-3 mb-3 text-white"
              >
                {{ $t("sectors.update") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { baseUrl } from "../../../../global";
export default {
  props: ["description", "title", "id", "image", "base_price"],
  data() {
    return {
      submitted: false,
      isLoadSpinner: false,
      sector: {
        title: this.title,
        desc: this.description,
        sector_icon: this.image,
      },
      placeholder: {
        name: this.$t("sectors.label.name"),
        icon: this.$t("sectors.label.icon"),
        desc: this.$t("sectors.label.desc"),
      },
    };
  },
  methods: {
    hideAll: function() {
      this.$modal.hideAll();
    },
    handleSubmit() {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.updateData(this.id);
        }
      });
    },
    updateData: function(id) {
      this.isLoadSpinner = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };
      console.log(this.sector.image);
      this.$http
        .patch(
          `${baseUrl}/sectors/${id}`,
          {
            title: this.sector.title,
            image_url: this.sector.sector_icon,
            image: this.sector.sector_icon,
            desc: this.sector.desc,
            platforms: [],
          },
          option
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.isLoadSpinner = false;
          this.$emit("close");
        });
    },
  },
};
</script>

<style scoped>
.titre {
  font-size: 30px;
  font-weight: bold;
}

.header {
  background-color: #f79623;
  min-height: 80px;
  display: flex;
  flex-direction: column;
}

.storeButton {
  background-color: #05ab9f;
}
</style>
