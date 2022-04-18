<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";
import Multiselect from "vue-multiselect";

import {StripeElementCard} from '@vue-stripe/vue-stripe';
import {displayLongStr, getReductionOf, getTotalReductionOf, validRequest} from "@/components/my-functions";
import {sendGetDataTable, sendGetUserByToken} from "@/components/requests-bdd";


export default {
  name: "checkout",
  components: {Layout, PageHeader, Multiselect, StripeElementCard},
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
      token: null,
      checkoutValid: 0,
      pointsUse: 0,
      user_points: 0,
      totalFinal: 0,

      lineItems: [],

      loading: false,

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
    }
  },
  methods: {
    getTotalReductionOf,
    getReductionOf,
    displayLongStr,
    getCarts() {
      let promise = sendGetDataTable('carts-customer', this.user.customer_id);
      promise.then((res) => {
        if (res.result.length <= 0) {
          this.$router.push('/');
        } else {
          if (!validRequest(res)) {
            this.total.reset();
            this.carts = res.result;
            this.totalFinal = (this.carts.map(item => item.total).reduce((prev, curr) => prev + curr, 0)).toFixed(2)
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
        }
      })
    },

    submit() {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    async tokenCreated(token) {
      this.checkoutValid = 1;

      if (this.user.firstname !== "" && this.user.firstname !== null &&
          this.user.lastname !== "" && this.user.lastname !== null &&
          this.user.mail !== "" && this.user.mail !== null &&
          this.user.address !== "" && this.user.address !== null &&
          this.user.phone !== "" && this.user.phone !== null &&
          this.user.country !== "" && this.user.country !== null) {
        //4242 4242 4242 4242 valid
        //4000 0000 0000 0002 invalid
        token['user_token'] = this.user.token;
        token['points_use'] = this.pointsUse;


        const headers = {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(token)
        }
        const res = await fetch(`${process.env.VUE_APP_API_ADDRESS}/checkout`, headers)
        const checkout = await res.json();

        console.log(checkout);
        if (checkout.success !== undefined) {
          this.checkoutValid = 2;
          this.$bvToast.toast('La commande a été payé, vous allez être rediriger vers l\'accueil', {
            variant: 'success',
            noCloseButton: true,
            autoHideDelay: 5000
          });
          setTimeout(() => {
            this.$router.push('/');
          }, 5000);
        } else {
          this.checkoutValid = 0;
          this.$bvToast.toast('La commande a échoué, veuillez réessayer !', {
            variant: 'danger',
            noCloseButton: true,
            autoHideDelay: 5000
          })
        }
      } else {
        this.$bvToast.toast('Vous devez saisir toutes les informations nécessaires.', {
          variant: 'danger',
          noCloseButton: true,
          autoHideDelay: 5000
        })
      }
    },
  },
  mounted() {
  },
  async created() {
    this.user = await sendGetUserByToken();
    if (!validRequest(this.user)) {
      this.user = this.user.result;
      this.user_points = (await sendGetDataTable('cards', this.user.card_id)).result.points;
      this.getCarts();
    } else {
      this.user = null;
      this.carts = [];
    }
  }
}
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>

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
                      <b-form-textarea id="billing-address" v-model="user.address"
                                       placeholder="Entrez votre adresse complete"
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
                          <td v-if="product.reduction">{{ product.reduction }} %
                            ({{ (getReductionOf(product.reduction, product.price)).toFixed(2) }} €)
                          </td>
                          <td v-else>0%</td>
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
                          <td colspan="2">
                            <div class="row">
                              <p class="col-8 pt-2">Utiliser vos points ? (Actuellement {{ user_points }} points)</p>
                              <b-form-input v-model="pointsUse" :max="user_points" :min="0" class="col-4" placeholder="Utiliser vos points"
                                            type="number"
                                            @keydown="pointsUse = pointsUse > user_points ? user_points : pointsUse"/>
                            </div>
                          </td>
                          <td colspan="2">
                            <div class="row">
                              <p class="col-5 m-0 text-right">Total: </p>
                              <span class="col-7">{{ (totalFinal - (pointsUse * 0.2)).toFixed(2) }} €</span>
                            </div>
                          </td>
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
        <b-tab>
          <template v-slot:title>
            <i class="bx bx-badge-check d-block check-nav-icon mt-4 mb-2"></i>
            <p class="font-weight-bold mb-4">Paiement</p>
          </template>
          <b-card-text>
            <div class="card">
              <div class="card-body">
                <div class="card shadow-none border mb-0">
                  <div class="card-body">
                    <h4 class="card-title mb-4">Paiement</h4>
                    <div class="row">
                      <stripe-element-card
                          ref="elementRef"
                          :hidePostalCode="false"
                          :pk="publishableKey"
                          class="col-9 mb-2"
                          @token="tokenCreated"
                      />
                      <b-button v-if="checkoutValid === 0" block class="col-3" style="height: 40px" variant="success"
                                @click="submit">Proceder au paiment
                      </b-button>
                      <b-button v-else-if="checkoutValid === 1" block class="col-3" disabled
                                style="height: 40px" variant="success">Paiement en attente
                      </b-button>
                      <b-button v-else-if="checkoutValid === 2" block class="col-3" disabled
                                style="height: 40px" variant="success">Commande payé
                      </b-button>
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
      </div>
    </div>
  </Layout>

</template>
