

<script>
export default {
  props: {
    forms: {
      type: Object,
      default: function () {
        return {};
      }
    },
  }
}

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
                  <b-form-input id="input-default" style="width: 80%; text-align: center;"
                                placeholder="Hkfeo"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;"
                                placeholder="Sarah"></b-form-input>
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
                  <b-form-input id="input-default" style="width: 80%; text-align: center;"
                                placeholder="0758585858"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;"
                                placeholder="michel@gmail.com"></b-form-input>
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
                  <b-form-input id="input-default" style="width: 80%; text-align: center;"
                                placeholder="12 avenue de la liberté"></b-form-input>
                </div>
                <div class="col-6">
                  <b-form-input id="input-default" style="width: 80%; text-align: center;"
                                placeholder="92250"></b-form-input>
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