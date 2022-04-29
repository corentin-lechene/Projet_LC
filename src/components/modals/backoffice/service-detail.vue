<script>

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  props: {
    service_id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      valuesForm: {},
    };
  },
  methods: {

    getServices(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.valuesForm = res.result;
        }

      })
    }
  },
  mounted() {
    this.getServices('services', this.service_id);
  }
};
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-4">
              <h4 style="font-size: large; padding-left: 5%;" class="card-title">Informations Service</h4>
            </div>
            <div class="col-7">
              <div class="thumb-lg member-thumb mx-auto">
                <b-img :src="require(`@/assets/images/services/${valuesForm.image}`)" fluid
                       class="rounded-circle img-thumbnail" alt="avatar"/>
              </div>
            </div>
          </div>
          <div class="row" style="height: 25px; width: 100%;"></div>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-11">
              <div class="row" style="width: 100%;">
                <div class="col-6">Nom du Service
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
                <div class="col-6">Prix
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
              </div>
              <div class="row" style="width: 100%;">
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.name"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.price"></b-form-input>
                </div>
              </div>
              <div class="row" style="height: 35px; width: 100%;"></div>
              <div class="row" style="width: 100%;">
                <div class="col-6">Email seller
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
                <div class="col-6">Réduction
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
              </div>
              <div class="row" style="width: 100%;">
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.mail"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.reduction"></b-form-input>
                </div>
              </div>
              <div class="row" style="height: 35px; width: 100%;"></div>
              <div class="row" style="width: 100%;">
                <div class="col-6">Description
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
              </div>
              <div class="row" style="height: 100%;">
                <div class="col-12">
                  <b-form-input id="input-default" readonly
                                v-model="valuesForm.description"></b-form-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end col -->
  </div>
</template>