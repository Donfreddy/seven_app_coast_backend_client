<!-- 
  *This Page For the home page. {@link name} 
  *@author Author/cho brandone
  *@date Aug 10/10/2020 *Contibutors : Contributors name,
-->

<template>
  <div class="container animate__animated animate__fadeIn">
    <div id="accordion">
      <div class="card ">
        <div class="card-header" id="headingOne">
          <div class="d-flex justify-content-between">
            <div class="">
              <div class="question_input" style="display:none">

              </div>
            </div>
            <div class="mt-4 d-flex justify-content-between">
              <i
                class="fa fa-trash text-danger trash"
                @click="deleteQuestion(_id)"
              ></i>

              <i
                class="fas fa-clone mx-3 icon pb-4"
                @click="duplicateQuestion"
              ></i>
              <i
                class="fas fa-plus-circle mr-3 icon"
                @click="addQuestion"
                style="cursor:pointer"
              ></i>
              <i
                class="fa fa-chevron-down icon"
                data-toggle="collapse"
                :data-target="'#collapse' + _id"
                aria-expanded="false"
                :aria-controls="'collapse' + _id"
              >
              </i>
            </div>
          </div>
        </div>

        <div
          :id="'collapse' + _id"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <div class="card-body">
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div style="display:none">
                        <i class="fas fa-language fa-2x mr-2"></i>
                      </div>
                      <h3 class="">English Question</h3>
                    </div>
                  </div>

                  <input
                    type="text"
                    class="form-control"
                    v-validate="'required'"
                    name="Name1"
                    id="quesionId"
                    v-model="questionEnglish"
                    placeholder="What is your question ?"
                  />
                  <div
                    v-if="submitted && errors.has('Name1')"
                    class="invalid-feedback"
                  >
                    {{ errors.first("Name1") }}
                  </div>
                </div>
                <p
                  class="text-center text-muted animate__animated animate__fadeIn"
                  v-if="answersEnglish <= 0"
                >
                  No English question Options
                </p>

                <div class="row">
                  <!-- item -->
                  <div
                    class="col-md-4 animate__animated animate__rubberBand"
                    v-for="(item, index) in answersEnglish"
                    :key="index"
                  >
                    <div class="card my-1">
                      <div class="card-body">
                        <div class="div">
                          <i
                            class="fa fa-trash text-danger trash float-right"
                            @click="deleteActualQuestion(index)"
                          ></i>
                        </div>
                        <div class="form-group">
                          <label for="">Option {{ index }}</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter answers 1"
                            v-model="item.title"
                            v-validate="'required'"
                            :name="'answer(en)' + index"
                            :class="{
                              'is-invalid':
                                submitted && errors.has('answer(en)' + index)
                                  ? true
                                  : false,
                            }"
                          />
                          <div
                            v-if="submitted && errors.has('answer(en)' + index)"
                            class="invalid-feedback"
                          >
                            {{ errors.first("answer(en)" + index) }}
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="">Font awesome image</label>
                          <input
                            @keyup="
                            answersFrench[index].image =
                              answersEnglish[index].image
                          "
                            class="form-control"
                            placeholder="Font awesome image"
                            v-model="item.image"
                            v-validate="'required'"
                            :name="'icon(en)' + index"
                            :class="{
                              'is-invalid':
                                submitted && errors.has('icon(en)' + index)
                                  ? true
                                  : false,
                            }"
                          />
                          <div
                            v-if="submitted && errors.has('icon(en)' + index)"
                            class="invalid-feedback"
                          >
                            {{ errors.first("icon(en)" + index) }}
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="">Set price (XAF)</label>
                          <input
                          @keyup="
                            answersFrench[index].price =
                              answersEnglish[index].price
                          "
                            class="form-control"
                            type="number"
                            v-model="item.price"
                            placeholder="Enter price"
                            v-validate="'required'"
                            :name="'price(en)' + index"
                            :class="{
                              'is-invalid':
                                submitted && errors.has('price(en)' + index)
                                  ? true
                                  : false,
                            }"
                          />
                          <div
                            v-if="submitted && errors.has('price(en)' + index)"
                            class="invalid-feedback"
                          >
                            {{ errors.first("price(en)" + index) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end item -->
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div style="display:none">
                        <i class="fas fa-language fa-2x mr-2"></i>
                      </div>
                      <h3 class="">French Question</h3>
                    </div>
                  </div>

                  <input
                    type="text"
                    class="form-control"
                    name="Name2"
                    v-model="questionFrench"
                    v-validate="'required'"
                    id="quesionId"
                    :class="{
                      'is-invalid':
                        submitted && errors.has('Name2') ? true : false,
                    }"
                  />
                  <div
                    v-if="submitted && errors.has('Name2')"
                    class="invalid-feedback"
                  >
                    {{ errors.first("Name2") }}
                  </div>
                </div>
                <p
                  class="text-center text-muted animate__animated animate__fadeIn"
                  v-if="answersFrench <= 0"
                >
                  No French question Options
                </p>

                <div class="row">
                  <!-- item -->
                  <div
                    class="col-md-4 animate__animated animate__rubberBand"
                    v-for="(item, index) in answersFrench"
                    :key="index"
                  >
                    <div class="card my-1">
                      <div class="card-body">
                        <div class="div">
                          <i
                            class="fa fa-trash text-danger trash float-right"
                            @click="deleteActualQuestion(index)"
                          ></i>
                        </div>
                        <div class="form-group">
                          <label for="">Option {{ index }}</label>
                          <input
                            
                            class="form-control"
                            placeholder="Enter answers 1"
                            v-model="item.title"
                            v-validate="'required'"
                            :name="'price(fr)' + index"
                            :class="{
                              'is-invalid':
                                submitted && errors.has('price(fr)' + index)
                                  ? true
                                  : false,
                            }"
                          />
                          <div
                            v-if="submitted && errors.has('price(fr)' + index)"
                            class="invalid-feedback"
                          >
                            {{ errors.first("price(fr)" + index) }}
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="">Font awesome image</label>
                          <input
                            class="form-control"
                            placeholder="Font awesome image"
                             @keyup="
                            answersEnglish[index].image =
                              answersFrench[index].image
                          "
                            v-model="item.image"
                            v-validate="'required'"
                            :name="'icon(en)' + index"
                            :class="{
                              'is-invalid':
                                submitted && errors.has('icon(fr)' + index)
                                  ? true
                                  : false,
                            }"
                          />
                          <div
                            v-if="submitted && errors.has('icon(fr)' + index)"
                            class="invalid-feedback"
                          >
                            {{ errors.first("icon(fr)" + index) }}
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="">Set price (XAF)</label>
                          <input
                           @keyup="
                            answersEnglish[index].price =
                              answersFrench[index].price
                          "
                            class="form-control"
                            type="number"
                            v-model="item.price"
                            placeholder="Enter price"
                            v-validate="'required'"
                            :name="'price(fr)' + index"
                            :class="{
                              'is-invalid':
                                submitted && errors.has('price(fr)' + index)
                                  ? true
                                  : false,
                            }"
                          />
                          <div
                            v-if="submitted && errors.has('price(fr)' + index)"
                            class="invalid-feedback"
                          >
                            {{ errors.first("price(fr)" + index) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end item -->
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
              <div class="px-5" v-if="isLoadSpinner == false">
                <button
                  type="submit"
                  class="btn btnColor text-white  btn-block  "
                >
                  Update question
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../../global";
import deleteModal from "./Modals/DeleteQuestionModal";
import duplicateModal from "./Modals/DuplicateQuestionModal";

export default {
  props: {
    _id: {},
    title: {},
    answersEnglish: {},
    answersFrench: {},
    questionFrench: {},
    questionEnglish: {},
    answers: {},
  },

  data() {
    return {
      i: 0,
      isDuplicate: true,
      active: false,
      showEdit: true,
      upDown: true,
      isLoadSpinner: false,
      question: this.title,
      submitted: false,
    };
  },

  methods: {
    deleteActualQuestion: function(index) {
      this.answersEnglish.splice(index, 1);
      this.answersFrench.splice(index, 1);
    },
    addQuestion: function() {
      //statement
      var englishQuestionObject = {
        title: "",
        price: "",
        image: "",
      };
      // ne me demandez pas pourquoi jai cree
      //un meme object de meme type, allez demander a javascript, moi meme je suisIntermediaire depasse
      var frenchQuestionObject = {
        title: "",
        price: "",
        image: "",
      };
      this.answersEnglish.push(englishQuestionObject);
      this.answersFrench.push(englishQuestionObject);
      console.log(frenchQuestionObject);
    },
    beforeClose(event) {
      console.log("Closing..." + event);
      // What a gamble... 50% chance to cancel closing
      this.isLoadSpinner = true;
      this.$emit("close");
      this.$modal.hideAll();
    },
    duplicateQuestion: function() {
      this.$modal.show(
        duplicateModal,
        {
          id: this._id,
          answers: this.answers,
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

    deleteQuestion: function() {
      this.$modal.show(
        deleteModal,
        {
          id: this._id,
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
    handleSubmit() {
      this.submitted = true;
      console.log("test1");
      this.$validator.validate().then((valid) => {
        if (valid) {
          console.log("this is token : " + this.$localStorage.get("token"));
          this.updateQuestion();
        }
      });
      console.log("test2");
    },

    updateQuestion() {
      console.log("this is token : " + this.$localStorage.get("token"));
      this.isLoadSpinner = true;
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };
      this.$http
        .patch(
          `${baseUrl}/questions/${this._id}`,
          {
            platform_id: this.$route.params.id,
            title: this.question,
            answers: {
              en: {
                question: this.questionEnglish,
                answer: this.answersEnglish,
              },
              fr: {
                question: this.questionFrench,
                answer: this.answersFrench,
              },
            },
          },

          option
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("End of updated response : " + data);
          this.$emit("close");
          this.isLoadSpinner = false;
        });
    },
  },
  created() {
    // this.getAllQuestion();
  },
};
</script>

<style scoped>
.trash {
  cursor: pointer;
}

.question_input {
  min-width: 873px;
}

.collapsed {
  color: #1a9e8e;
}

.btn-title {
  text-decoration: none;
}

.header-btn {
  background-color: #1a9e8e;
  font-size: 20px;
  color: white;
}

.title {
  font-size: 20px;
}

.price {
  color: #1a9e8e;
  font-weight: bold;
}

.saveButton {
  background-color: #1a9e8e;
  color: white;
}

.edit {
  transition: transform 0.2s;
  cursor: pointer;
  font-size: 23px;
}

.trash {
  transition: transform 0.2s;
  cursor: pointer;
  font-size: 23px;
}

.icon {
  font-size: 23px;
}

.modalColor {
  background: #f79623;
  color: #ffffff;
}

.btnColor {
  background-color: #1a9e8e;
}

.btn-save {
  background-color: #1a9e8e;
}

.add-modal {
  background-color: #1a9e8e;
}
</style>
