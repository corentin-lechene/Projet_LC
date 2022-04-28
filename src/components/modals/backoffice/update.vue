<script>

import forms from "@/data/admin-update";

import {sendGetDataTable, sendGetUserByToken, sendUpdateTable} from "@/components/requests-bdd";

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
    id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      values: {},

      forms,
      currentForms: {},
    };
  },
  methods: {
    async updateTable() {
      for (const key in this.values) {
        if (key === 'file' && this.values[key] !== null && this.values[key].name !== undefined) {
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

      const promise = sendUpdateTable(this.route, this.id, this.values);
      promise.then((res) => {
        console.log(res);
      });
    }
  },
  async created() {
    const user = await sendGetUserByToken();
    console.log(user);
    let data;
    if (this.route === 'all_users') {
      data = (await sendGetDataTable('users', this.id)).result;
      this.currentForms = forms[data.role];
      this.route = data.role;
    } else {
      data = (await sendGetDataTable(this.route, this.id)).result;
      this.currentForms = forms[this.route];
    }

    if(user.result.role !== 'admin' && user.result.role !== 'staff') {
      delete this.currentForms.stock;
    }

    const temp = this.currentForms;
    for (const key in temp) {
      if (typeof temp[key].onCreate !== "undefined") {
        temp[key].onCreate(this.route);
      }
    }

    //Init values
    for (const valuesKey in this.currentForms) {
      console.log(valuesKey);
      if (valuesKey.includes("name")) {
        switch (valuesKey) {
          case "nameCompany":
            this.values[valuesKey] = data["company"] !== undefined ? data["company"] : null;
            break;
          case "nameWareHouse":
            this.values[valuesKey] = data["name_warehouse"] !== undefined ? data["name_warehouse"] : null;
            break;
          default:
            this.values[valuesKey] = data["name"] !== undefined ? data["name"] : null;
            break;
        }
      } else if(valuesKey === "categories") {
        this.values[valuesKey] = data["category_id"] !== undefined ? data["category_id"] : null;
      } else {
        this.values[valuesKey] = data[valuesKey] !== undefined ? data[valuesKey] : null;
      }
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
            <h1 class="mb-3 pt-3">Update</h1>

            <b-form-row>
              <b-form-group v-for="(form, index) in currentForms" :key="index" class="col-12">
                <label>{{ form.label }}</label>
                <b-form-select v-if="form.type === 'select'" v-model="values[index]" :options="form.options"
                               :value="null"/>
                <b-form-textarea v-else-if="form.type === 'textarea'" v-model="values[index]" :max-rows="form.max_rows"
                                 :placeholder="form.placeHolder" :rows="form.rows"/>
                <b-form-file v-else-if="form.type === 'file'" v-model="values[index]" :accept="form.accept"
                             :browse-text="form.browse_text" :placeholder="form.placeHolder"/>
                <b-form-input v-else v-model="values[index]" :placeholder="form.placeHolder" :type="form.type"/>
              </b-form-group>
              <b-button block class="mx-3" variant="success" @click="updateTable">Add</b-button>
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