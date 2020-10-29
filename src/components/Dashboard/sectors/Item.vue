<!-- 
  *This is the Card of sector page. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 10/08/2020, 
  *Contributors: Contributors names,
-->

<template>
<div class="">
  <div class="card my-2 ">
    <div class="card-body">
      <div class="card-title d-flex justify-content-between">
        <div class="">
          <a class="fa fa-pencil text-info edit" data-toggle="modal" :href="'#modal' + id" @click="editModal"></a>

        </div>
        <div class="">
          <label class="switch">
            <input type="checkbox" v-model="checkboxState" @change="changeStatus(id)" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="div">
          <i class="fa fa-trash text-danger trash" @click="deleteModal(id)"></i>
        </div>
      </div>
      <div @click="seePlatform(id)">

        <div v-html="image" :class="{ 'fa-7x': true }"></div>
      </div>
      <h6 class="card-subtitle mb-2 mt-2 text-dark font-weight-bold">
        {{ title }}
      </h6>
      <p class="card-text">
        {{ description }}
      </p>
    </div>
  </div>
</div>
</template>

<script>
import background from "../../../assets/img/background.png";
import modal from "./Modals/EditSectorModal.vue";
import deleteModal from "./Modals/DeleteModal.vue";
import {
  baseUrl
} from "../../../global";

export default {
  data() {
    return {
      background,
      checkboxState: this.$props.status,
    };
  },
  props: ["description", "title", "id", "image", "base_price", "status"],
  methods: {
    beforeClose() {
      this.$emit("close");
      this.$modal.hideAll();
    },
    changeStatus: function (id) {
      const option = {
        headers: {
          token: this.$localStorage.get("token")
        },
      };
      this.$http
        .patch(
          `${baseUrl}/sectors/${id}`, {
            active: this.checkboxState,
          },
          option
        )
        .then((response) => {
          return response.json();
        })
        .then(() => {
          this.$toast.open({
            message: "Status  successful Updated",
            type: "success",
            position: "top"
          });

        });
      console.log(id, this.checkboxState);
    },
    editModal: function () {
      this.$modal.show(
        modal, {
          description: this.description,
          title: this.title,
          image: this.image,
          base_price: this.base_price,
          id: this.id,
        }, {
          height: "auto",
          clickToClose: false
        }, {
          "before-close": this.beforeClose,
        }
      );
    },
    deleteModal: function (id) {
      this.$modal.show(
        deleteModal, {
          description: this.description,
          title: this.title,
          image: this.image,
          base_price: this.base_price,
          id: id,
        }, {
          height: "auto",
          clickToClose: false
        }, {
          "before-close": this.beforeClose,
        }
      );
    },
    seePlatform: function () {
      this.$router.push({
        path: `dashboard/${this.id}/platform`
      });
    },
  },
};
</script>

<style scoped>
.content {
  background-image: url("../../../assets/img/background.png");
  background-size: cover;
  cursor: pointer;
}

.item {
  transition: transform 0.2s;
  cursor: pointer;
}

.item:hover {
  transform: scale(1.1);
}

.edit {
  transition: transform 0.2s;
  cursor: pointer;
  font-size: 23px;
}

.edit:hover {
  transform: scale(1.4);
}

.trash {
  transition: transform 0.2s;
  cursor: pointer;
  font-size: 23px;
}

.trash:hover {
  transform: scale(1.4);
}

/********************************* Togle Bottton ***************************************/

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #2196f3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/*  */
</style>
