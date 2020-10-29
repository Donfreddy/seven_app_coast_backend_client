/** *This is the Sectors page of admin dashboard. {@link name} *@author Freddy
Tamwo, *@date Aug 17/08/2020, *Contributors: Contributors names, **/
<template>
  <transition name="modal-fade">
    <div class="">
      <div class="header d-flex justify-content-between">
        <div></div>
        <h5 class="titre  text-center text-white pt-4">
          Add Question
        </h5>
        <div>
          <i
            class="fas fa-times mr-5 mt-3 text-white fa-2x close"
            @click="hideAll"
          ></i>
        </div>
      </div>

      <div class="modal-content">
        <div class="modal-body">
          <div class="p-3">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <div style="display:none">
                      <i
                        class="fas fa-language fa-2x mr-2"
                        @click="hideAll"
                      ></i>
                    </div>
                    <h3 class="">English Question</h3>
                  </div>

                  <button
                    class="btn btn-primary animate__animated animate__fadeIn"
                    @click.prevent="addQuestion"
                  >
                    Add Options
                  </button>
                </div>
                <label for="">Question Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="question.en"
                  name="Name1"
                  v-validate="'required'"
                  aria-describedby="emailHelp"
                  placeholder="What is your question ?"
                  :class="{
                    'is-invalid':
                      submitted && errors.has('Name1') ? true : false,
                  }"
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
                v-if="arrayOfEnglishQuestions <= 0"
              >
                No English question Options
              </p>

              <div class="row animate__animated animate__fadeIn">
                <div
                  class="col-md-3 animate__animated animate__rubberBand"
                  v-for="(item, index) in arrayOfEnglishQuestions"
                  :key="index"
                >
                  <div class="card my-1">
                    <div class="card-body">
                      <div class="div">
                        <i
                          class="fa fa-trash text-danger trash float-right"
                          @click="deleteQuestion(index)"
                        ></i>
                      </div>
                      <div class="form-group">
                        <label for="">Option {{ index }}</label>
                        <input
                          type="text"
                          class="form-control animate__animated animate__fadeIn"
                          aria-describedby="emailHelp"
                          v-validate="'required'"
                          placeholder="Enter answer "
                          v-model="arrayOfEnglishQuestions[index].title"
                          :name="'answer(en)' + index"
                          :class="{
                            'is-invalid':
                              submitted && errors.has('answer(en)' + index)
                                ? true
                                : false,
                          }"
                        />
                        <div
                          v-if="submitted && errors.has('answer(en)')"
                          class="invalid-feedback"
                        >
                          {{ errors.first("answer(en)") }}
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Set font awesome icon</label>
                        <input
                          @keyup="
                            arrayOfFrenchQuestions[index].image =
                              arrayOfEnglishQuestions[index].image
                          "
                          class="form-control"
                          placeholder="Font awesome icon"
                          v-model="arrayOfEnglishQuestions[index].image"
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
                          v-if="submitted && errors.has('icon(en)')"
                          class="invalid-feedback"
                        >
                          {{ errors.first("icon(en)") }}
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Set price (XAF)</label>
                        <input
                          @keyup="
                            arrayOfFrenchQuestions[index].price =
                              arrayOfEnglishQuestions[index].price
                          "
                          class="form-control"
                          type="number"
                          placeholder="Enter corresponding price"
                          v-model="arrayOfEnglishQuestions[index].price"
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
                          v-if="submitted && errors.has('price(en)')"
                          class="invalid-feedback"
                        >
                          {{ errors.first("price(en)") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div style="display:none">
                  <i class="fas fa-language fa-2x mr-2" @click="hideAll"></i>
                </div>
                <!-- Deuxieme formulaire -->
                <h3 class="">French Question</h3>
                <hr />
              </div>
              <div class="form-group">
                <label for="">Question Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="Name2"
                  v-validate="'required'"
                  v-model="question.fr"
                  aria-describedby="emailHelp"
                  placeholder="What is your question ?"
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
                v-if="arrayOfFrenchQuestions <= 0"
              >
                No French question Options
              </p>
              <div class="row animate__animated animate__fadeIn">
                <div
                  class="col-md-3 animate__animated animate__rubberBand"
                  v-for="(item, index) in arrayOfFrenchQuestions"
                  :key="index"
                >
                  <div class="card my-1">
                    <div class="card-body">
                      <div class="div">
                        <i
                          class="fa fa-trash text-danger trash float-right"
                          @click="deleteQuestion(index)"
                        ></i>
                      </div>
                      <div class="form-group">
                        <label for="">Option {{ index }}</label>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          v-validate="'required'"
                          placeholder="Entrer la reponse"
                          v-model="arrayOfFrenchQuestions[index].title"
                          :name="'answer(fr)' + index"
                          :class="{
                            'is-invalid':
                              submitted && errors.has('answer(fr)' + index)
                                ? true
                                : false,
                          }"
                        />
                        <div
                          v-if="submitted && errors.has('answer(fr)')"
                          class="invalid-feedback"
                        >
                          {{ errors.first("answer(fr)") }}
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Set font awesome icon</label>
                        <input
                          @keyup="
                            arrayOfEnglishQuestions[index].image =
                              arrayOfFrenchQuestions[index].image
                          "
                          class="form-control"
                          placeholder="Entrer l'icone Font awesome"
                          v-model="arrayOfFrenchQuestions[index].image"
                          v-validate="'required'"
                          :name="'icon(fr)' + index"
                          :class="{
                            'is-invalid':
                              submitted && errors.has('icon(fr)' + index)
                                ? true
                                : false,
                          }"
                        />
                        <div
                          v-if="submitted && errors.has('icon(fr)')"
                          class="invalid-feedback"
                        >
                          {{ errors.first("") }}
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Set price (XAF)</label>
                        <input
                          @keyup="
                            arrayOfEnglishQuestions[index].price =
                              arrayOfFrenchQuestions[index].price
                          "
                          class="form-control"
                          type="number"
                          placeholder="Entrer le prix correspondant"
                          v-model="arrayOfFrenchQuestions[index].price"
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
                          v-if="submitted && errors.has('price(fr)')"
                          class="invalid-feedback"
                        >
                          {{ errors.first("price(fr)") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Loader element -->
              <div
                class="center-loader text-center my-3 animate__animated animate__fadeIn"
                v-if="isLoadSpinner == true"
              >
                <div>
                  <div class="spinner-border mt-3 custom-spinner" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
              <!-- end Loader element -->
              <!-- Button element -->
              <div
                class="row animate__animated animate__fadeIn"
                v-if="isLoadSpinner == false"
              >
                <div class="col-md-6">
                  <button
                    type="submit"
                    class="btn btn-block btn-danger mt-3 mb-3 text-white animate__animated animate__fadeIn"
                    @click="hideAll"
                  >
                    Close
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    type="submit"
                    class="btn btn-block storeButton mt-3 mb-3 text-white animate__animated animate__fadeIn"
                  >
                    Create question
                  </button>
                </div>
              </div>
              <!-- End Button element -->
            </form>
          </div>
        </div>
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
      question: {
        en: "",
        fr: "",
      },
      arrayOfEnglishQuestions: [],
      arrayOfFrenchQuestions: [],
    };
  },
  computed() {},
  methods: {
    deleteQuestion: function(index) {
      this.arrayOfFrenchQuestions.splice(index, 1);
      this.arrayOfEnglishQuestions.splice(index, 1);
    },
    addQuestion: function() {
      var englishQuestionObject = {
        title: "",
        price: "",
        image: "",
      };
      //ne me demandez pas pourquoi jai cree
      //un meme object de meme type, allez demander a javascript, moi meme je suis depasse
      var frenchQuestionObject = {
        title: "",
        price: "",
        image: "",
      };
      this.arrayOfEnglishQuestions.push(englishQuestionObject);
      this.arrayOfFrenchQuestions.push(frenchQuestionObject);
    },
    hideAll: function() {
      this.$modal.hideAll();
    },
    handleSubmit() {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.createQuestion();
        }
      });
    },
    createQuestion: function() {
      this.isLoadSpinner = true;
      console.log("this is token : " + this.$localStorage.get("token"));
      const option = {
        headers: {
          token: this.$localStorage.get("token"),
        },
      };
      this.$http
        .post(
          `${baseUrl}/questions`,
          {
            //title: this.question,
            platform_id: this.$route.params.id,
            answer: {
              en: {
                question: this.question.en,
                answer: this.arrayOfEnglishQuestions,
              },
              fr: {
                question: this.question.fr,
                answer: this.arrayOfFrenchQuestions,
              },
            },
          },

          option
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("" + data);
          this.isLoading = false;
          this.$emit("close");
          this.emptyAll();
        });
    },

    select: function() {
      console.log("this is the value : " + this.platform.name);
    },
  },
};
</script>

<style>
.modal-content {
  overflow-y: auto;
  max-height: 730px;
}

.titre {
  font-size: 25px;
  font-weight: bold;
}

.header {
  background-color: #f79623;
  min-height: 80px;
}

.color {
  color: #05ab9f;
}

.storeButton {
  background-color: #05ab9f;
}

.bold {
  font-size: 40px;
  font-weight: bold;
}

.trash {
  cursor: pointer;
}
</style>
