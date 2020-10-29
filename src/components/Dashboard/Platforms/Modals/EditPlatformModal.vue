<template>
  <transition name="modal-fade">
    <div class="">
      <div class="header">
        <h5 class="titre  text-center text-white pt-4">
          {{ $t("platforms.edit") }}
        </h5>
      </div>
      <div class="body px-5 py-2">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-12 pt-1">
              <div class="form-group">
                <label for="exampleInputEmail1">{{
                  $t("platforms.label.icon")
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  v-validate="'required'"
                  name="Icon"
                  :placeholder="placeholder.icon"
                  v-model="image"
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
            <label for="exampleInputEmail1">{{
              $t("platforms.label.name")
            }}</label>
            <input
              type="text"
              class="form-control"
              name="Platform"
              v-model="name"
              :placeholder="placeholder.name"
              v-validate="'required'"
              :class="{
                'is-invalid':
                  submitted && errors.has('Platform') ? true : false,
              }"
            />
            <div
              v-if="submitted && errors.has('Platform')"
              class="invalid-feedback"
            >
              {{ errors.first("Platform") }}
            </div>
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">{{
              $t("platforms.label.price")
            }}</label>
            <input
              type="number"
              class="form-control"
              name="Price"
              v-model="base_price"
              :placeholder="placeholder.price"
              v-validate="'required'"
              :class="{
                'is-invalid': submitted && errors.has('Price') ? true : false,
              }"
            />
            <div
              v-if="submitted && errors.has('Price')"
              class="invalid-feedback"
            >
              {{ errors.first("Price") }}
            </div>
          </div>

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
                @click="$emit('close')"
              >
                {{ $t("single.close") }}
              </button>
            </div>
            <div class="col-md-6">
              <button
                type="submit"
                class="btn btn-block storeButton mt-3 mb-3 text-white"
              >
                {{ $t("platforms.update") }}
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
  props: ["id", "image", "base_price", "name"],
  data() {
    return {
      submitted: false,
      isLoadSpinner: false,
      isLoading: false,
      options: ["Android", "Web", "Android / Web"],
      placeholder: {
        name: this.$t("platforms.label.name"),
        icon: this.$t("platforms.label.icon"),
        price: this.$t("platforms.label.price"),
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.updateData();
        }
      });
    },
    updateData: function() {
      this.isLoadSpinner = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };
      console.log(this.image);
      this.$http
        .patch(
          `${baseUrl}/platforms/${this.id}`,
          {
            name: this.name,
            image_url: this.image,
            base_price: this.base_price,
            image: this.image,
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
