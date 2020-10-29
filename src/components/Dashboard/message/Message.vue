<!-- 
  *This is page to display clients messages. {@link name} 
  *@author Author/Freddy Tamwo,
  *@date Aug 20/08/2020, 
  *Contributors: Contributors names, 
-->

<template>
<div class="animate__animated animate__fadeIn">
  <div class="text-center mt-5 animate__animated animate__fadeIn">
    <h4 class="title">Messages</h4>
  </div>
  <hr class="mb-5" />
  <h4 class="title " v-if="isLoading == false && messages.length == 0 ">
    No Message
  </h4>

  <div class="text-center animate__animated animate__fadeIn" v-if="isLoading">
    <div class="spinner-border mt-3 custom-spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div class="animate__animated animate__fadeIn" v-if="messages.length > 0">
    <v-data-table :headers="headers" :items="messages" :lenght="20" class="elevation-1 animate__animated animate__fadeIn" @update:items-per-page="updateSize" @update:page="updatePage" @close="getAllMessage">
      <template v-slot:item.actions="{ item }">
        <i class="fas fa-eye trash fa-2x eyesIcon animate__animated animate__fadeIn" data-toggle="modal" data-target="#exampleModalCenter" @click="viewMessage(item)"></i>
        <i class="fa fa-trash trash fa-2x trashIcon ml-4 animate__animated animate__fadeIn" data-toggle="modal" data-target="#exampleModalCenter" @click="deleteMessage(item)"></i>
        <!-- <i
              class="fa fa-trash text-danger fa-2x"
             @click="deleteItem(item)"
            ></i> -->
      </template>
    </v-data-table>
  </div>
</div>
</template>

<script>
import {
  baseUrl
} from "../../../global";
import messageModal from "./modals/viewMessageModal.vue";
import deleteModal from "./modals/DeleteMessageModal.vue";

export default {
  data() {
    return {
      isLoading: true,
      headers: [
        // { text: "Creation date", sortable: false, value: "date" },
        {
          text: "Email",
          sortable: false,
          value: "email"
        },
        {
          text: "Subject",
          value: "subject",
          sortable: false
        },
        // { text: "Message", value: "message", sortable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        },
      ],
      messages: [],

      email: "",
      date: "",
      subject: "",
      message: "",
      phone: "",
    };
  },
  created() {
    this.isLoading = true;
    this.getAllMessage();
    console.log("this is the parameter :" + this.$route.params.id);
  },

  methods: {
    updateSize(e) {
      this.size = e;
      this.getAllEmail(this.pagination.currentPage, this.size);
      console.log("Size: " + e);
    },
    updatePage(e) {
      console.log("Page: " + e);
    },
    seeItem(item) {
      return item;
    },
    beforeClose(e) {
      console.log("Closing..." + e);
      this.getAllMessage();
      this.$modal.hideAll();
    },
    viewMessage: function (item) {
      this.$modal.show(
        messageModal, {
          phone: item.phone,
          email: item.email,
          date: item.date,
          subject: item.subject,
          message: item.message,
        }, {
          height: "auto",
          width: "70%",
          clickToClose: false
        }, {
          "before-close": this.beforeClose,
        }
      );
      this.seeItem(item);
    },
    deleteMessage: function (item) {
      this.$modal.show(
        deleteModal, {
          id: item._id,
        }, {
          height: "auto",
          width: "50%"
        }, {
          "before-close": this.beforeClose,
        }
      );
      this.seeItem(item);
    },
    getAllMessage() {
      const option = {
        headers: {
          token: this.$localStorage.get("token")
        },
      };

      this.$http
        .get(`${baseUrl}/messages`, option)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          this.messages = result.reverse();
        });
    },
  },
};
</script>

<style scoped>
.v-data-table-header {
  background-color: #05ab9f;
}

.iconBg {
  color: gray;
}

span {
  color: white;
}

@media screen and (max-width: 700px) {

  .v-data-table tbody tr:not(:last-child) td:last-child,
  .v-data-table tbody tr td,
  .v-data-table thead tr:last-child th,
  .v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
    border-bottom: medium solid rgba(0, 0, 0, 0.12);
  }
}
</style>
