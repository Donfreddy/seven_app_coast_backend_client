<!-- 
  *This is modal to create platform. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 17/08/2020, 
  *Contributors: Contributors names, 
-->

/** **/
<template>
  <transition name="modal-fade">
    <div class="">
      <div class="header">
        <h5 class="titre  text-center text-white pt-4">
          {{ $t("platforms.add") }}
        </h5>
      </div>

      <div class="body px-5 py-2">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-12 pt-1">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  {{ $t("platforms.label.icon") }}
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="Icon"
                  v-validate="'required'"
                  v-model="platform.platform_icon"
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

          <div class="">
            <label for="">{{ $t("platforms.select") }}</label>
            <select
              class="custom-select form-control"
              v-model="platform.name"
              @click="select"
              name="Platform"
              v-validate="'required'"
              :class="{
                'is-invalid':
                  submitted && errors.has('Platform') ? true : false,
              }"
            >
              <option
                v-for="(item, index) in options"
                :key="index"
                :value="item"
                >{{ item }}</option
              >
            </select>
            <div
              v-if="submitted && errors.has('Platform')"
              class="invalid-feedback"
            >
              {{ errors.first("Platform") }}
            </div>
          </div>
          <div class="pt-2">
            <label for="">{{ $t("platforms.label.price") }}</label>
            <input
              class="form-control"
              type="number"
              name="Price"
               :placeholder="placeholder.price"
              v-model="platform.base_price"
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
                {{ $t("platforms.create") }}
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
  props: ["sector_id"],

  data() {
    return {
      submitted: false,
      renderComponent: true,
      isLoadSpinner: false,
      isLoading: false,
      platform: {
        name: "",
        platform_icon: "",
        base_price: "",
      },
      options: ["Mobile App", "Web App", "Mobile/Web"],
      placeholder: {
        name: this.$t('platforms.label.name'),
        icon: this.$t("platforms.label.icon"),
        price: this.$t('platforms.label.price'),
      },
    };
  },
  methods: {
    hideAll: function() {
      this.$modal.hideAll();
    },
    select: function() {
      console.log("this is the value : " + this.platform.name);
    },
    handleSubmit() {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          

          this.storePlatform();
        }
      });
    },
    storePlatform: function() {
      this.isLoadSpinner = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };
      //  if (this.platform.name == "Mobile App") {
      //           this.platform.platform_icon = '<i class="fas fa-mobile"></i>';
      //         } else if (this.platform.name == "Web App") {
      //           this.platform.platform_icon = '<i class="fab fa-chrome"></i>';
      //         } else {
      //           this.platform.platform_icon = '<i class="fas fa-file-code"></i>';
      //         }
      this.$http
        .post(
          `${baseUrl}/platforms`,
          {
            name: this.platform.name,
            image_url: this.platform.platform_icon,
            base_price: this.platform.base_price,
            image: this.platform.platform_icon,
            sector_id: this.sector_id,
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
  font-size: 25px;
  font-weight: bold;
}

.header {
  background-color: #f79623;
  min-height: 80px;
}

.storeButton {
  background-color: #05ab9f;
}
</style>
