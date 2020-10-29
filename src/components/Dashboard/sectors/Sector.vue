<!-- 
  *This is the Sectors page of admin dashboard. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 10/08/2020, 
  *Contributors: Contributors names
-->

<template>
  <div class="" v-if="renderComponent">
    <div
      class="d-flex justify-content-md-between mt-5 animate__animated animate__fadeIn"
    >
      <div>
        <h4 class="title">{{ $t("sectors.select") }}</h4>
      </div>
      <button
        class="btn  add-modal text-white btnColor "
        data-toggle="modal"
        data-target="#exampleModalCenter"
        @click="createModal"
      >
        {{ $t("sectors.add") }}
      </button>
    </div>
    <hr class="mb-5 animate__animated animate__fadeIn" />
    <!-- center element -->
    <div
      class="center-loader animate__animated animate__fadeIn"
      v-if="isLoadSpinner"
    >
      <div>
        <div class="spinner-border mt-3 custom-spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <!-- Sector element -->
    <div class=" animate__animated animate__fadeIn" v-if="!isLoadSpinner">
      <div class="row text-center">
        <app-item
          class="col-md-4 animate__animated animate__rubberBand"
          v-for="item in sectors"
          :key="item.id"
          :title="item.title"
          :description="item.desc"
          :id="item._id"
          :image="item.image_url"
          :base_price="item.base_price"
          :status="item.active"
          @deleted="getSectionAgain()"
          @close="getSectionAgain()"
        ></app-item>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { baseUrl } from "../../../global";
import modal from "./Modals/createSectorModal.vue";

export default {
  data() {
    return {
      renderComponent: true,
      isLoadSpinner: true,
      formd: "",
      isLoading: false,
      id: 1,
      sectorFile: null,
      platformFile: null,
      sector: {
        title: "",
        image_url: "",
        image: "",
        desc: "",
      },
      platform: {
        name: "",
        image_url: "image_link",
        base_price: "",
      },
      sectors: [],
    };
  },
  components: {
    "app-item": Item,
  },
  computed: {},
  methods: {
    // seePlatform: function() {
    //   this.$router.push({ path: `dashboard/${this.id}/platform` });
    // },
    beforeClose(event) {
      console.log("Closing..." + event);
      // What a gamble... 50% chance to cancel closing
      this.isLoadSpinner = true;
      this.getSectionAgain();
      this.$modal.hideAll();
    },
    createModal: function() {
      this.$modal.show(
        modal,
        {
          text: "Hello",
        },
        {
          height: "auto",
          clickToClose: false,
        },
        {
          "before-close": this.beforeClose,
        }
      );
    },
    getSectionAgain: function() {
      console.log("this is token : " + localStorage.getItem("token"));
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };

      try {
        this.$http
          .get(`${baseUrl}/sectors`, option)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.sectors = data;
            this.sectors.reverse();
            this.isLoadSpinner = false;
          });
      } catch (error) {
        console.log("fredddddddddddddddddd");
        console.log(error.response);
      }
    },
    onChange(e) {
      if (!e.target.files.length) return;
      const formData = new FormData();
      this.formd = formData.append("file", e.target.files[0]);
      console.log(formData);
    },
  },

  created() {
    this.getSectionAgain();
  },
};
</script>

<style scoped>
.add-section {
  min-height: 258px;
}

.add {
  transition: transform 0.2s;
}

.add:hover {
  transform: scale(1.1);
  /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.modalColor {
  background: #f79623;
  color: #ffffff;
}

.btnColor {
  background: #05ab9f;
}

.center-loader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 50px;
  font-weight: bold;
}
</style>
