<script>

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  props: {
    user_id: {
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

    getUsers(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          console.log('user-detail', res.result);
          this.valuesForm = res.result;
        }

      })
    }
  },
  mounted() {
    this.getUsers('users', this.user_id);
  }
};
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 style="font-size: large; padding-left: 5%;" class="card-title">Vos informations</h4>
          <div class="row" style="height: 25px; width: 100%;"></div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-10">
              <div class="row" style="width: 100%;">
                <div class="col-6">Nom
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
                <div class="col-6">Prénom
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
              </div>
              <div class="row" style="width: 100%;">
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.lastname"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.firstname"></b-form-input>
                </div>
              </div>
              <div class="row" style="height: 35px; width: 100%;"></div>
              <div class="row" style="width: 100%;">
                <div class="col-6">Téléphone
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
                <div class="col-6">Email
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
              </div>
              <div class="row" style="width: 100%;">
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.phone"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.mail"></b-form-input>
                </div>
              </div>
              <div class="row" style="height: 35px; width: 100%;"></div>
              <div class="row" style="width: 100%;">
                <div class="col-6">Adresse
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
                <div class="col-6">Code postal
                  <div class="row" style="height: 5px; width: 100%;"></div>
                </div>
              </div>
              <div class="row" style="width: 100%;">
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.address"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="valuesForm.postal_code"></b-form-input>
                </div>
              </div>
              <div class="row" style="height: 35px; width: 100%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end col -->
  </div>
</template>