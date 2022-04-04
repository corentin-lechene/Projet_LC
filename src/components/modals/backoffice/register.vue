<script>

import forms from "@/data/data-forms";

import {sendInsertTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  props: {
    route: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      values: {},

      forms,
      currentForms: {},
      add: false,
      error: false,
    };
  },
  methods: {
    reload(i) {
      document.getElementById(`error_${i}`).innerHTML = "";
    },
    addTable() {
      this.add = true;
      let error = false;
      let i = 0;
      console.log(this.values);
      for (const valuesKey in this.values) {
        if(this.values[valuesKey] === null || this.values[valuesKey] === "") {
          document.getElementById(`error_${i}`).innerHTML = " Ne peut être vide !";
          error = true;
        } else {
          document.getElementById(`error_${i}`).innerHTML = "";
        }
        i++;
      }

      if(!error) {
        const promise = sendInsertTable(this.route, this.values);
        promise.then((res) => {
          console.log(res);
          if (!validRequest(res)) {
            this.values = [];
            this.error = false;
          } else {
            this.error = res.result;
          }
        });
      }
    }
  },
  created() {
    this.currentForms = forms[this.route];
    const temp = this.currentForms;
    for (const key in temp) {
      if(typeof temp[key].onCreate !== "undefined") {
        temp[key].onCreate(this.route);
      }
    }
    //Init values
    for (const valuesKey in this.currentForms) {
      this.values[valuesKey] = null;
    }

    console.log(this.route); //TODO enlever cette ligne
  },
}
</script>

<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <b-col cols="5" class="my-5 py-4">
          <b-img :src="require(`@/assets/images/form-wizard-1.jpg`)" alt="img" fluid-grow/>
        </b-col>
        <b-col cols="7">
          <b-row align-h="center" class="mx-3">
            <h1 class="mb-3 pt-3">Registration</h1>

            <b-form-row>
              <b-alert v-if="error" variant="danger" class="mt-3" dismissible show>{{error}}</b-alert>
              <b-form-group v-for="(form, index, i) in currentForms" :key="index" class="col-12">
                <label>{{ form.label }}* <span :id="`error_${i}`" class="text-danger font-italic"> Ne peut être vide !</span></label>
                <b-form-select v-if="form.type === 'select'" v-model="values[index]" @keydown="reload(i)"
                               :options="form.options" :value="null"/>
                <b-form-textarea v-else-if="form.type === 'textarea'" v-model="values[index]" @keydown="reload(i)"
                                 :placeholder="form.placeHolder" :rows="form.rows" :max-rows="form.max_rows"/>
                <b-form-file v-else-if="form.type === 'file'" v-model="values[index]" @keydown="reload(i)"
                             :placeholder="form.placeHolder" :accept="form.accept" :browse-text="form.browse_text"/>
                <b-form-input v-else :type="form.type" v-model="values[index]" @keydown="reload(i)"
                              :placeholder="form.placeHolder"/>
              </b-form-group>
              <b-button variant="success" class="mx-3" block @click="addTable">Add</b-button>
            </b-form-row>
          </b-row>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.form-control, .custom-select, .custom-file-input {
  border: none !important;
  border-bottom: 2px solid #2a3042 !important;
}
</style>