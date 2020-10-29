<!-- 
  *This is the Sectors page of admin dashboard. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 17/08/2020, 
  *Contributors: Contributors names,
-->

<template>
  <transition name="modal-fade">
    <div class="">
      <div class="header">
        <h5 class="titre  text-center text-white pt-4">
          {{ $t("sectors.create") }}
        </h5>
      </div>

      <div class="body px-5 py-2">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">{{
                  $t("sectors.label.name")
                }}</label>
                <input
                  type="text"
                  name="sector"
                  v-validate="'required'"
                  class="form-control"
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
                  v-validate="'required'"
                  name="Icon"
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
              v-validate="'required'"
              name="Description"
              :placeholder="placeholder.desc"
              rows="3"
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
          <div class="row">
            <div class="col-md-6">
              <label for="">{{ $t("sectors.label.platform.name") }}</label>
              <select
                class="custom-select form-control"
                v-model="platform.name"
                @click="select"
                name="Platform"
                v-validate="'required'"
                :placeholder="placeholder.platform.name"
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
            <div class="col-md-6">
              <label for="">{{ $t("sectors.label.platform.price") }}</label>
              <input
                class="form-control"
                type="number"
                v-model="platform.base_price"
                v-validate="'required'"
                :placeholder="placeholder.platform.price"
                name="Price"
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
                {{ $t("sectors.create") }}
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
  data() {
    return {
      submitted: false,
      renderComponent: true,
      isLoadSpinner: false,
      isLoading: false,
      isInvalidTitle: false,

      sector: {
        title: "",
        desc: "",
        sector_icon: "",
      },
      platform: {
        name: "",
        platform_icon: "",
        base_price: "",
      },
      options: ["Mobile App", "Web App", "Mobile/Web"],
      placeholder: {
        name: this.$t("sectors.label.name"),
        icon: this.$t("sectors.label.icon"),
        desc: this.$t("sectors.label.desc"),
        platform: {
          name: this.$t("sectors.label.platform.name"),
          price: this.$t("sectors.label.platform.price"),
        },
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
          this.storeData();
        }
      });
    },
    select: function() {
      console.log("this is the value : " + this.platform.name);
    },
    storeData: function() {
      if (this.sector.title == "") {
        this.isInvalidTitle = true;
      } else {
        //statement
      }
      this.isLoadSpinner = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };
      console.log(this.sector.image);
      this.$http
        .post(
          `${baseUrl}/sectors`,
          {
            title: this.sector.title,
            image_url: this.sector.sector_icon,
            image: this.sector.sector_icon,
            desc: this.sector.desc,
            status: false,
            platforms: [],
          },
          option
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // create platforn
          if (this.platform.name == "Mobile App") {
            this.platform.platform_icon = '<i class="fas fa-mobile"></i>';
          } else if (this.platform.name == "Web App") {
            this.platform.platform_icon = '<i class="fab fa-chrome"></i>';
          } else {
            this.platform.platform_icon = '<i class="fas fa-file-code"></i>';
          }
          this.$http
            .post(
              `${baseUrl}/platforms`,
              {
                name: this.platform.name,
                image_url: this.platform.platform_icon,
                base_price: this.platform.base_price,
                image: this.platform.platform_icon,
                sector_id: data.id,
                questions: [],
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
