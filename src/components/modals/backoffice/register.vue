<script>

import forms from "@/data/data-forms";

import {sendInsertTable} from "@/components/requests-bdd";
import {createObject, validRequest} from "@/components/my-functions";

export default {
  props: {
    route: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      values: [null],
      forms,
      currentForms: {},
    };
  },
  methods: {
    addTable(table, values) {
      let promise = sendInsertTable(table, createObject(this.forms, values));
      promise.then((res) => {
        if (!validRequest(res))
          console.log(res.result);
      });
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
  }
}
</script>

<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <b-col cols="5">
          <b-img :src="require(`@/assets/images/form-wizard-1.jpg`)" alt="img" fluid-grow/>
        </b-col>
        <b-col cols="7">
          <b-row align-h="center">
            <h1>Registration</h1>

            <b-form-row>
              <b-form-group v-for="form in currentForms" :key="form.id" class="col-12">
                <label>{{ form.label }}</label>
                <b-form-select v-if="form.type === 'select'" v-model="values[0]" :value="null" :options="form.options"/>
                <b-form-textarea v-else-if="form.type === 'textarea'" :placeholder="form.placeHolder" :rows="form.rows" :max-rows="form.max_rows"/>
                <b-form-file v-else-if="form.type === 'file'" :placeholder="form.placeHolder" :accept="form.accept" :browse-text="form.browse_text"/>
                <b-form-input v-else :type="form.type" :placeholder="form.placeHolder"/>
              </b-form-group>
            </b-form-row>
          </b-row>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.form-control, .custom-select {
  border: none;
  border-bottom: 2px solid #2a3042;
}
</style>