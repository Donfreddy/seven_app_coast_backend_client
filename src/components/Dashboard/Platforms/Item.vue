<!-- 
  *This is the Card of platform page. {@link name} 
  *@author Author/Freddy Tamwo, 
  *@date Aug 11/08/2020, 
  *Contributors: Contributors names,
-->
/**  **/

<template>
  <div class="">

    <div class="card my-2 content">
      <div class="card-body">
        <div class="card-title d-flex justify-content-between">
          <div class="">
            <a
              class="fa fa-pencil text-info edit"
              data-toggle="modal"
              :href="'#modal' + id"
              @click="editModal"
            ></a>
          </div>
          <div class="div">
            <i
              class="fa fa-trash text-danger trash"
              @click="deletePlatform"
            ></i>
          </div>
        </div>
        <div @click="seeQuestion(id)">
          <!-- <font-awesome-icon
            size="4x"
            :icon="{ prefix: 'fas', iconName: 'ambulance' }"
            class="mb-2 text-dark"
          /> -->
          <div v-html="image" :class="{ 'fa-7x': true }"></div>
        </div>
        <h6 class="card-subtitle mb-2 mt-2 text-dark font-weight-bold">
          {{ name }}
        </h6>
        <p class="card-text">
          {{ base_price }} XAF
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import editModal from "./Modals/EditPlatformModal";
import deleteModal from "./Modals/DeletePlatformModal";

export default {
  props: ["base_price", "name", "id", "image"],
  data() {
    return {};
  },
  methods: {
      beforeClose() {
      this.$emit("close");
      this.$modal.hideAll();
    },
    editModal: function() {
      this.$modal.show(
        editModal,
        {
       
          image: this.image,
          base_price: this.base_price,
          id:this.id,
          name:this.name
        },
      { height: "auto",clickToClose: false },
        {
          "before-close": this.beforeClose,
        }
      );
    },
    deletePlatform: function() {
      this.$modal.show(
        deleteModal,
        {
          image: this.image,
          name:this.name,
          id:this.id
        },
       { height: "auto", },
        {
          "before-close": this.beforeClose,
        }
      );
    },

    seeQuestion: function(id) {
      this.$router.push({ name: "questions", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.content {
  background-image: url("../../../assets/img/background.png");
  background-size: cover;
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
.priceColor {
  color: #05ab9f;
  font-weight: bold;
}
</style>
