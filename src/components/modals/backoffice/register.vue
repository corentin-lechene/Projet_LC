<script>

import forms from "@/data/data-forms";

import {sendInsertTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

const base64Encode = data =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });


export default {
  props: {
    route: {
      type: String,
      default: ""
    },
    byId: {
      type: Number,
      default: -1
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
    async addTable() {
      this.add = true;
      let error = false;
      let i = 0;
      for (const valuesKey in this.values) {
        if (this.values[valuesKey] === null || this.values[valuesKey] === "") {
          document.getElementById(`error_${i}`).innerHTML = " Ne peut être vide !";
          error = true;
        } else {
          document.getElementById(`error_${i}`).innerHTML = "";
        }
        i++;
      }

      for (const key in this.values) {
        if (key === 'file') {
          if(this.values[key].name !== undefined) {
            if (this.values[key].size > 1024 * 1024) {
              this.error = "Image size not accepted";
            } else if (this.values[key][0] !== null) {
              const file = await base64Encode(this.values[key]);
              let fileCompressed = [];
              let min = 0, max = 512;
              for (let j = 0; j < file.length / 512; j++) {
                fileCompressed.push(file.slice(min, max))
                min += 512;
                max += 512;
              }
              const name = this.values[key].name; //get file name
              this.values[key] = fileCompressed;
              this.values[key].unshift(name); //first index
            }
          }
        }
      }


      if (!error) {
        const promise = sendInsertTable(this.route, this.values);
        promise.then((res) => {
          if (!validRequest(res)) {
            this.$bvToast.toast('Ajout réussi', {
              variant: 'success',
              noCloseButton: true,
              autoHideDelay: 5000
            })
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
      if (typeof temp[key].onCreate !== "undefined") {
        if(key === 'companies')
          temp[key].onCreate('companies', this.byId);
        else if(key === 'sellers') {
          temp[key].onCreate('sellers', this.byId);
        } else {
          temp[key].onCreate(this.route);
        }

      }
    }
    //Init values
    for (const valuesKey in this.currentForms) {
      this.values[valuesKey] = null;
    }
  },
}
</script>

<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <b-col class="my-5 py-4" cols="5">
          <b-img :src="require(`@/assets/images/form-wizard-1.jpg`)" alt="img" fluid-grow/>
        </b-col>
        <b-col cols="7">
          <b-row align-h="center" class="mx-3">
            <h1 class="mb-3 pt-3">Registration</h1>

            <b-form-row>
              <b-alert v-if="error" class="mt-3" dismissible show variant="danger">{{ error }}</b-alert>
              <b-form-group v-for="(form, index, i) in currentForms" :key="index" class="col-12">
                <label>{{ form.label }}* <span :id="`error_${i}`" class="text-danger font-italic"> Ne peut être vide !</span></label>
                <b-form-select v-if="form.type === 'select'" v-model="values[index]" :options="form.options"
                               :value="null" @change="reload(i)"/>
                <b-form-textarea v-else-if="form.type === 'textarea'" v-model="values[index]" :max-rows="form.max_rows"
                                 :placeholder="form.placeHolder" :rows="form.rows" @keydown="reload(i)"/>
                <b-form-file v-else-if="form.type === 'file'" v-model="values[index]" :accept="form.accept"
                             :browse-text="form.browse_text" :placeholder="form.placeHolder" @change="reload(i)"/>
                <b-form-input v-else v-model="values[index]" :placeholder="form.placeHolder" :type="form.type"
                              @change="reload(i)" @keydown="reload(i)"/>
              </b-form-group>
              <b-button block class="mx-3" variant="success" @click="addTable">Add</b-button>
            </b-form-row>
          </b-row>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<style scoped>

</style>