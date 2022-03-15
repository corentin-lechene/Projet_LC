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
      data: {},
      forms,
    };
  },
  methods: {
    addTable(table, values) {
      let promise = sendInsertTable(table, createObject(this.forms[this.route], values));
      promise.then((res) => {
        if (!validRequest(res))
          console.log(res.result);
      });
      this.$route.params.refresh = '1';
    }
  }
}
</script>

<template>
  <div>
    <b-form @submit.prevent="addTable(route, data)">
      <div class="row">
        <b-form-group v-for="form in forms[route]" :key="form.id" class="col-lg-4">
          <label>{{ form.title }} : </label>
          <div v-if="form.type === 'select'">
            <b-form-select
                v-model="data[form.id]"
                :options="form.options"
                :value="null"
            />
          </div>

          <div v-else>
            <b-form-input
                v-model="data[form.id]"
                class="form-control"
                :type="form.type"
                :value="null"
            />
          </div>
        </b-form-group>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="text-right">
            <b-button type="submit" variant="success" @click="$refs['register'].hide()">Ajouter {{data[0]}}</b-button>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>
