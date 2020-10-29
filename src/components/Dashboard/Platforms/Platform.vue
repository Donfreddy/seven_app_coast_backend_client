<!-- 
  *This is the Platform page of admin dashboard. {@link name} 
  *@author Author/Freddy Tamwo, 
  *@date Aug 10/08/2020, 
  *Contributors: Contributors names,
-->

<template>
  <div class="container animate__animated animate__fadeIn">
    <div class="mt-5 text-dark">
      <div class="d-flex justify-content-md-between mt-5">
        <div>
          <h4 class="title animate__animated animate__fadeIn">
            {{ $t("platforms.select") }}
          </h4>
        </div>
        <button
          class="btn  add-modal text-white btnColor animate__animated animate__fadeIn"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          @click="addPlatform"
        >
          {{ $t("platforms.add") }}
        </button>
      </div>
      <hr class="mb-5" />
      <div class="center-loader text-center mb-5" v-if="isLoading">
        <div>
          <div
            class="spinner-border mt-3 custom-spinner animate__animated animate__fadeIn"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <div class="corps" v-if="!isLoading">
        <div class="row text-center">
          <app-item
            class="col-md-4 col-sm-6 animate__animated animate__rubberBand"
            v-for="item in platforms"
            :key="item.id"
            :base_price="item.base_price"
            :name="item.name"
            :id="item._id"
            :image="item.image"
            @close="getAllPlatform()"
          >
          </app-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { baseUrl } from "../../../global";
import addPlatform from "./Modals/createPlatformModal";

export default {
  data() {
    return {
      id: 1,
      platforms: [],
      plateform: "",
      price: "",

      isLoading: true,
    };
  },
  components: {
    "app-item": Item,
  },
  methods: {
    seeQuestion: function() {},
    beforeClose(event) {
      console.log("Closing..." + event);
      // What a gamble... 50% chance to cancel closing
      this.isLoadSpinner = true;
      this.getAllPlatform();
      this.$modal.hideAll();
    },
    getAllPlatform: function() {
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };

      this.$http
        .get(`${baseUrl}/platforms/${this.$route.params.id}`, option)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.platforms = data;
          this.platforms.reverse();
          this.isLoading = false;
        });
    },
    addPlatform: function() {
      this.$modal.show(
        addPlatform,
        {
          sector_id: this.$route.params.id,
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
  },
  created() {
    console.log("this is the parameter :" + this.$route.params.id);

    const option = {
      headers: {
        token: this.$localStorage.get("token"),
      },
    };

    this.$http
      .get(`${baseUrl}/platforms/${this.$route.params.id}`, option)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.platforms = data;
        this.platforms.reverse();
        console.log(this.platforms);
        this.isLoading = false;
      });
  },
};
</script>

<style scoped>
.add {
  transition: transform 0.2s;
}

.add:hover {
  transform: scale(1.1);
  /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.add-section {
  min-height: 215px;
}

.modalColor {
  background: #f79623;
  color: #ffffff;
}

.btnColor {
  background: #05ab9f;
}

.title {
  font-size: 50px;
  font-weight: bold;
}
</style>
