<!-- 
  *This is page to display clients emails. {@link name} 
  *@author Author/Freddy Tamwo,
  *@date Aug 19/08/2020, 
  *Contributors: Contributors names, 
-->

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="d-flex justify-content-between text-center mt-5">
      <h4 class="title">Email Addresses</h4>
      <button
        type="button"
        class="btn btnXlsx text-white"
        v-on:click="onexport"
      >
        Export to XLS
      </button>
    </div>
    <hr class="mb-5" />
    <h4
      class="title animate__animated animate__fadeIn"
      v-if="isLoading == false && emails.length == 0"
    >
      No Email
    </h4>
    <div class="text-center" v-if="isLoading">
      <div
        class="spinner-border mt-3 custom-spinner animate__animated animate__fadeIn"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="" v-if="emails.length > 0">
      <v-data-table
        :headers="headers"
        :items="emails"
        :lenght="20"
        class="elevation-1"
        @update:items-per-page="updateSize"
        @update:page="updatePage"
      >
        <template
          v-slot:item.actions="{ item }"
          class="animate__animated animate__fadeIn"
        >
          <i
            class="fas fa-eye trash fa-2x eyesIcon"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            @click="viewAnswer(item)"
          ></i>

          <i
            class="fa fa-trash trash fa-2x trashIcon ml-4"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            @click="deleteEmail(item)"
          ></i>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../../global";
import viewAnswer from "./modals/viewAnswerModal";
import deleteModal from "./modals/DeleteEmailModal";
import XLSX from "xlsx";

export default {
  data() {
    return {
      isLoading: true,
      headers: [
        {
          text: "Email",
          sortable: false,
          value: "email",
        },
        {
          text: "Name",
          sortable: false,
          value: "name",
        },
        {
          text: "Phone Number",
          sortable: false,
          value: "phone",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      emails: [],
      id: "",
      sector: "",
      platform: "",
      price: "",
      email: "",
      name: "",
      pagination: {
        currentPage: 1,
        totalPage: 0,
      },
      response: [],
      totalItems: 0,
      size: 70,
      emailXls: [],
      Datas: {
        // We will make a Workbook contains 2 Worksheets
        animals: [
          { name: "cat", category: "animal" },
          { name: "dog", category: "animal" },
          { name: "pig", category: "animal" },
        ],
        emails: [],
      },
    };
  },

  created() {
    this.isLoading = true;
    this.getAllEmail(this.pagination.currentPage, this.size);
  },

  methods: {
    onexport() {
      // On Click Excel download button
      console.log(this.emailXls);
      // export json to Worksheet of Excel
      // only array possible

      var emailsWS = XLSX.utils.json_to_sheet(this.Datas.emails);

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, emailsWS, "Emails"); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, "AppCostEmail.xlsx"); // name of the file is 'book.xlsx'
    },
    exportData: function() {
      console.log(this.XlsExport);
    },
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
      this.getAllEmail(this.pagination.currentPage, this.size);
      this.$modal.hideAll();
    },
    viewAnswer: function(item) {
      console.log(item);
      this.$modal.show(
        viewAnswer,
        {
          id: this.id,
          email: this.email,
          sector: this.sector,
          platform: this.platform,
          price: this.price,
          date: this.date,
          question: this.question,
          response: item.response,
          name: this.name,
          phone: this.phone,
        },
        {
          height: "auto%",
          width: "80%",
          clickToClose: false,
        },
        {
          "before-close": this.beforeClose,
        }
      );
      this.seeItem(item);
    },
    deleteEmail: function(item) {
      this.$modal.show(
        deleteModal,
        {
          id: item._id,
        },
        {
          height: "auto",
          width: "50%",
        },
        {
          "before-close": this.beforeClose,
        }
      );
      this.seeItem(item);
    },
    getAllEmail(page, size) {
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };

      this.$http
        .get(`${baseUrl}/emails?page=${page}&size=${size}`, option)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.isLoading = false;
          this.totalItems = result.total;

          this.pagination.totalPage = result.totalNumberOfPages;
          console.log(result.data);

          result.data.forEach((data, index) => this.myLoop(data, index));
        });
    },
    myLoop(data, index) {
      this.emails.push(data);
      this.id = data._id;
      this.email = data.email;
      this.sector = data.sector;
      this.platform = data.platform;
      this.price = data.price;
      this.date = data.date;
      this.question = data.response[index].question;
      console.log("this is the index :" + index);

      this.Datas.emails.push({
        date: data.date,
        email: data.email,
        name: data.name,
        phone: data.phone,
      });
      this.name = data.name;
      this.phone = data.phone;
    },
  },
};
</script>

<style scoped>
.v-data-table-header,
.btnXlsx {
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
