<!-- 
  *This is the Question page of admin dashboard. {@link name} 
  *@author Freddy Tamwo, 
  *@date Aug 12/08/2020, 
  *Contributors: Contributors names
-->

<template>
  <div class="">
    <div class="d-flex justify-content-md-between mt-5">
      <div>
        <h4 class="title">{{ $t("questions.list") }}</h4>
      </div>
      <button
        class="btn  add-modal text-white btnColor "
        data-toggle="modal"
        data-target="#exampleModalCenter"
        @click="addQuestion"
      >
        {{ $t("questions.add") }}
      </button>
    </div>
    <hr />
    <!--loading -->
    <div class="center-loader text-center mb-5" v-if="isLoading">
      <div>
        <div class="spinner-border mt-3 custom-spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <!-- enbloading start elements-->
    <div class="corps" v-if="!isLoading">
      <template>
        <app-item
          v-for="(item, index) in questions"
          :key="index"
          :_id="item._id"
          :title="item.title"
          :answersEnglish="item.answers.en.answer"
          :questionEnglish="item.answers.en.question"
          :questionFrench="item.answers.fr.question"
          :answersFrench="item.answers.fr.answer"
          :answers="item.answers"
          @deleted="getAllQuestion"
          @close="getAllQuestion"
        ></app-item>
      </template>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { baseUrl } from "../../../global";
import addQuestion from "./Modals/createQuestionModal";

export default {
  data() {
    return {
      questions: [],
      question: "",
      optionOne: "",
      price1: "",
      optionTwo: "",
      price2: "",
      optionThree: "",
      price3: "",
      isLoading: true,
    };
  },
  methods: {
    beforeClose(event) {
      console.log("Closing..." + event);
      this.isLoadSpinner = true;
      this.getAllQuestion();
      this.$modal.hideAll();
    },
    addQuestion: function() {
      this.$modal.show(
        addQuestion,
        {
          platform_id: this.$route.params.id,
        },
        {
          height: "auto",
          width: "90%",
          clickToClose: false,
        },
        {
          "before-close": this.beforeClose,
        }
      );
    },
    getAllQuestion: function() {
      console.log("this is token : " + this.$localStorage.get("token"));
      this.isLoading = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };

      this.$http
        .get(`${baseUrl}/questions/${this.$route.params.id}`, option)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.questions = data;
          this.questions.reverse();
          this.isLoading = false;
        });
    },
  },

  created() {
    this.getAllQuestion();
  },
  components: {
    "app-item": Item,
  },
};
</script>

<style scoped>
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
