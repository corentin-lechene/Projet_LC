<script>
import Layout from "../../layouts/main";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Loyalty Card",
  },
  components: {
    Layout,
  },
  data() {
    return {

    };
  },
};
</script>


<template>
  <Layout>
    <div class="row">
      <div class="col-6">
        <b-card>
          <div class="row">
            <div class="col-6">
              <div class="row">
                <div class="col-2"></div>
              <div class="col-lg-1.5" style=" padding-top: 40%;">
              <p style=" color: purple; font-size: 4em; ">L</p>
              </div>
                <div class="col-lg-2" style=" padding-top: 40%;">
                <p style=" color: deepskyblue; font-size: 4em; ">C</p>
              </div>
                <div class="col-lg-2" style=" padding-top: 40%;">
                  <p style=" color: forestgreen; font-size: 4em; ">A</p>
                </div>
                <div class="col-lg-2" style=" padding-top: 40%;">
                  <p style="color: #F9F90D; font-size: 4em; ">R</p>
                </div>
                <div class="col-lg-1" style=" padding-top: 40%;">
                  <p style="color: orange; font-size: 4em; ">D</p>
                </div>
                <div class="col-5"></div>
              </div>
            </div>
            <div class="col-6">
            <img src="@/assets/images/logolcgrand.png" alt style="float: right"/>
            </div>
          </div>
          <div class="row" style="height: 20px;"></div>
          <div class="row">
            <b-card-text class="h3">
            Le programme de fidélité qui récompense vos achats en magasin et en ligne.
          </b-card-text>
            <router-link class="text-dark" tag="a" to="/login">
          <b-button pill variant="success">Se connecter</b-button>
            </router-link>
          </div>
        </b-card>
      </div>
      <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h4 style="text-align: center;font-size: large;" class="card-title">Ma carte de fidélité</h4>
              <div class>
                  <img src="@/assets/images/carteloyalty.png" class="img-fluid" alt="Responsive image" style="height: 350px; width: 500px;"/>
            </div>
          </div>
        </div>
      </div>
    </div>


  </Layout>
</template>

