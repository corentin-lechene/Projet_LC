<script>
import Layout from "../../layouts/main";
import {keyboardData} from "@/data/data-keyboard";
import {OffersData} from "@/data/data-offers";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "MyLCard",
  },
  components: {
    Layout,
  },
  data() {
    return {
      keyboardData,
      OffersData,
      items: [
        {
          text: "MyLCard",
        },
      ],
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
                  <p style="color: greenyellow; font-size: 4em; ">R</p>
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
          <b-button pill variant="success">Se connecter</b-button>
          </div>
        </b-card>
      </div>
      <div class="col-6"></div>
    </div>
  </Layout>
</template>

