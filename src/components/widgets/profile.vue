<script>

import {sendGetUserByToken} from "@/components/requests-bdd";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
  },
  mounted() {
  },
  async created() {
    const user = await sendGetUserByToken();
    if(user !== undefined)
      this.user = user.result;
    else
      await this.$router.push('/');
  },
};
</script>

<template>
  <div class="row">
    <div v-if="user !== null" class="col-12">
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
                                v-model="user.lastname"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="user.firstname"></b-form-input>
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
                                v-model="user.phone"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="user.mail"></b-form-input>
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
                                v-model="user.address"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                v-model="user.postal_code"></b-form-input>
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