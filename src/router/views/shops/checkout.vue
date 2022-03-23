<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";
import Multiselect from "vue-multiselect";

import {StripeCheckout} from '@vue-stripe/vue-stripe';
import {displayLongStr, getReductionOf, getTotalReductionOf, validRequest} from "@/components/my-functions";
import {sendGetDataTable, sendGetUserByToken} from "@/components/requests-bdd";

export default {
  name: "checkout",
  components: {Layout, PageHeader, Multiselect, StripeCheckout},
  data() {
    return {
      title: "Payement",

      user: {},
      carts: {},
      quantity: [],
      total: {
        ttc: [],
        reduction: [],
        shipping: 0,
        final: 0,
        getTotalTTC: (quantity) => {
          let temp = 0;
          if (this.total.ttc !== 0) {
            for (let i = 0; i < this.total.ttc.length; i++) {
              temp += this.total.ttc[i] * quantity[i];
            }
            return temp.toFixed(2);
          }
        },
        getTotalReduction: () => {
          let temp = 0;
          if (this.total.ttc !== 0) {
            for (let i = 0; i < this.total.ttc.length; i++) {
              temp += (getReductionOf(this.total.reduction[i], this.total.ttc[i]) * this.quantity[i]);
            }
            return temp.toFixed(2);
          }
        },
        getTotalFinal: (quantity) => {
          return (this.total.getTotalTTC(quantity) - this.total.getTotalReduction() + this.total.shipping).toFixed(2);
        },
        reset: () => {
          this.total.ttc = [];
          this.total.reduction = [];
          this.total.shipping = 0;
          this.total.final = 0;
        }
      },

      currentCart: [],
      publishableKey: 'pk_test_51KT1U9AJI7mlkDbaTm1PKsYQYTfCEgLUbxxNxQjYwGewX0YmbM2RYasHc3JTn3wryJjQFsHDu7M3ym66F3cgebsn00lM8jGxWK',
      lineItems: [],

      loading: false,
      successURL: 'http://localhost:8081/checkout-succeed',
      cancelURL: 'http://localhost:8081/checkout',

      stateValue: null,
      countryValue: null,
      stateOptions: [
        "Alaska",
        "Hawaii",
        "California",
        "Nevada",
        "Oregon",
        "Washington",
        "Arizona",
        "Colorado",
        "Idaho",
        "Montana",
        "Nebraska",
        "New Mexico",
        "North Dakota",
        "Utah",
        "Wyoming",
        "Alabama",
        "Arkansas",
        "Illinois",
        "Iowa"
      ],
      countryOptions: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Argentina",
        "France",
        "California",
        "Colombia",
        "Congo",
        "Dominica",
        "Denmark",
        "Nevada",
        "Oregon",
        "Washington",
        "Ecuador",
        "Idaho",
        "Montana",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "Nicaragua",
        "New Caledonia",
        "North Dakota",
        "Tonga",
        "Tunisia",
        "Thailand",
        "Turkey",
        "Illinois",
        "Tuvalu",
        "Uganda",
        "Uruguay",
        "United Arab Emirates",
        "United Kingdom",
        "Venezuela",
        "Zimbabwe",
        "Uruguay"
      ],

      CUSTOMER_ID: 39, //TODO
    }
  },
  methods: {
    getTotalReductionOf,
    getReductionOf,
    displayLongStr,
    getCarts() {
      let promise = sendGetDataTable('carts-customer', this.CUSTOMER_ID);
      promise.then((res) => {
        console.log(res.result.length);
        if (!validRequest(res)) {
          this.total.reset();
          this.carts = res.result;
          for (let i = 0; i < res.result.length; i++) {
            this.lineItems.push({price: null, quantity: null});
            for (const [key, val] of Object.entries(res.result[i])) {
              if (key === 'cart_quantity') {
                this.quantity.push(val);
                this.lineItems[i].quantity = val;
              } else if (key === 'reduction')
                this.total.reduction.push(val);
              else if (key === 'price') {
                this.total.ttc.push(val);
              } else if (key === 'stripe_price')
                this.lineItems[i].price = val;
            }
          }
        }
      })
    },
    submit() {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getUserByToken() {
      let promise = sendGetUserByToken();
      promise.then((res) => {
        if (!validRequest(res) && res.result !== undefined) {
          this.user = res.result;
        }
      })
    },
    getCartByUserId() {

    }
  },

  mounted() {
    const tokenUser = localStorage.getItem('user_token'); //Recupère le token
    if (tokenUser) {
      this.getUserByToken();
      this.getCarts();
    }
  }
}
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>
    <div>
      <stripe-checkout
          ref="checkoutRef"
          :cancel-url="cancelURL"
          :line-items="lineItems"
          :pk="publishableKey"
          :success-url="successURL"
          mode="payment"
          @loading="v => loading = v"
      />
    </div>
    <div class="checkout-tabs">
      <b-tabs nav-class="p-0" nav-wrapper-class="col-lg-2 w-100" pills vertical>
        <b-tab active>
          <template v-slot:title>
            <i class="bx bxs-truck d-block check-nav-icon mt-4 mb-2"></i>
            <p class="font-weight-bold mb-4">informations d'expédition</p>
          </template>
          <b-card-text>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Shipping information</h4>
                <p class="card-title-desc">Remplissez toutes les informations ci-dessous</p>
                <form>
                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Nom</label>
                    </b-col>
                    <b-col md="10">
                      <div class="row">
                        <div class="col-6">
                          <b-form-input id="input-name" v-model="user.firstname"
                                        placeholder="Entrez votre prénom"></b-form-input>
                        </div>
                        <div class="col-6">
                          <b-form-input id="input-name" v-model="user.lastname"
                                        placeholder="Entrez votre nom"></b-form-input>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Adresse email</label>
                    </b-col>
                    <b-col md="10">
                      <b-form-input id="billing-email-address" v-model="user.mail"
                                    placeholder="Entrez votre adresse email"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Téléphone</label>
                    </b-col>
                    <b-col md="10">
                      <b-form-input id="billing-phone" v-model="user.phone"
                                    placeholder="Entrez votre numéro de téléphone"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Adresse</label>
                    </b-col>
                    <b-col md="10">
                      <b-form-textarea id="billing-address" v-model="user.address" placeholder="Entrez votre adresse complete"
                                       rows="3"
                      ></b-form-textarea>
                    </b-col>
                  </b-row>

                  <div class="form-group row mb-4">
                    <label class="col-md-2 col-form-label">Pays</label>
                    <div class="col-md-10">
                      <multiselect v-model="user.country" :options="countryOptions"
                                   placeholder="Selectionner le pays"></multiselect>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <i class="bx bx-badge-check d-block check-nav-icon mt-4 mb-2"></i>
            <p class="font-weight-bold mb-4">Confirmation</p>
          </template>
          <b-card-text>
            <div class="card">
              <div class="card-body">
                <div class="card shadow-none border mb-0">
                  <div class="card-body">
                    <h4 class="card-title mb-4">Récapitulatif</h4>
                    <div class="table-responsive">
                      <table class="table table-centered mb-0 table-nowrap">
                        <thead class="thead-light">
                        <tr>
                          <th scope="col">Produit</th>
                          <th scope="col">Description du produit</th>
                          <th scope="col">Réduction</th>
                          <th scope="col">Prix</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(product, index) in carts" :key="index">
                          <th scope="row">
                            <b-avatar :src="require(`@/assets/images/product/${product.image}`)" size="6em" square/>
                          </th>
                          <td>
                            <h5 class="font-size-14 text-truncate">
                              <router-link :to="`/product-detail?id=${product.good_id}`" class="text-dark">
                                {{ displayLongStr(product.name, 70) }}
                              </router-link>
                            </h5>
                            <p class="text-muted mb-0">{{ product.price.toFixed(2) }} € x {{ quantity[index] }}</p>
                          </td>
                          <td>{{ product.reduction }} %
                            ({{ (getReductionOf(product.reduction, product.price)).toFixed(2) }} €)
                          </td>
                          <td> {{
                              (getTotalReductionOf(product.reduction, product.price) * quantity[index]).toFixed(2)
                            }} €
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3">
                            <h6 class="m-0 text-right">Sub Total:</h6>
                          </td>
                          <td>{{ (total.getTotalFinal(quantity)) }} €</td>
                        </tr>
                        <tr>
                          <td colspan="4">
                            <div class="bg-soft-primary p-3 rounded">
                              <h5 class="font-size-14 text-primary mb-0">
                                <i class="fas fa-shipping-fast mr-2"></i> Livraison
                                <span class="float-right">Gratuite</span>
                              </h5>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3">
                            <h6 class="m-0 text-right">Total:</h6>
                          </td>
                          <td>{{ total.getTotalFinal(quantity) }} €</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
      <div class="row my-4">
        <div class="col-sm-6">
          <router-link
              class="btn text-muted d-none d-sm-inline-block btn-link"
              tag="a"
              to="/lcshop"
          >
            <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
          </router-link>
        </div>
        <!-- end col -->
        <div class="col-sm-6">
          <div class="text-sm-right">
            <b-button variant="success" @click="submit"><i class="mdi mdi-truck-fast mr-1"></i> Procéder au payement
            </b-button>
          </div>
        </div>
        <!-- end col -->
      </div>
    </div>
  </Layout>

</template>
