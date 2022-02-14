<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";
import Multiselect from "vue-multiselect";

import {cartData} from "@/data/data-cart";
import {productData} from "@/data/data-products";

export default {
  name: "checkout",
  components: {Layout, PageHeader, Multiselect},
  data() {
    return {
      title: "Payement",

      cartData,

      currentCart: [],

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
        "Hawaii",
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
      ]
    }
  },
  methods: {
    extractData(objet, id, column = null) {
      let temp = [];
      for (let i = 0; i < objet.length; i++) {
        if (objet[i].id !== id)
          continue;

        if (column !== null)
          temp.push(objet[i][column]);
        else
          temp.push(objet[i]);
      }
      if (temp.length === 1)
        return temp[0];

      return {
        size: temp.length,
        first: temp[0],
        last: temp[temp.length - 1],
        values: temp,
      };
    },
    getProductsFromCart(obj) {
      for (let i = 0; i < cartData.length; ++i) {
        this.currentCart[i] = this.extractData(obj, cartData[i].id);
      }
    },
    displayLongStr(str, end) {
      if(end <= 0)
        return "Error !";
      str = str.toString();
      return `${str.substring(0, end)} ${(str.length > end) ? "[..]" : "" }`;
    }
  },

  created() {
    this.getProductsFromCart(productData);
  }
}
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="checkout-tabs">
      <b-tabs pills vertical nav-class="p-0" nav-wrapper-class="col-lg-2 w-100">
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
                          <b-form-input id="input-name" placeholder="Entrez votre prénom"></b-form-input>
                        </div>
                        <div class="col-6">
                          <b-form-input id="input-name" placeholder="Entrez votre nom"></b-form-input>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Adresse email</label>
                    </b-col>
                    <b-col md="10">
                      <b-form-input id="billing-email-address" placeholder="Entrez votre adresse email"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Téléphone</label>
                    </b-col>
                    <b-col md="10">
                      <b-form-input id="billing-phone" placeholder="Entrez votre numéro de téléphone"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="mb-4">
                    <b-col md="2">
                      <label>Adresse</label>
                    </b-col>
                    <b-col md="10">
                      <b-form-textarea
                          id="billing-address"
                          rows="3"
                          placeholder="Entrez votre adresse complete"
                      ></b-form-textarea>
                    </b-col>
                  </b-row>

                  <div class="form-group row mb-4">
                    <label class="col-md-2 col-form-label">Pays</label>
                    <div class="col-md-10">
                      <multiselect v-model="countryValue" :options="countryOptions"
                                   placeholder="Selectionner le pays"></multiselect>
                    </div>
                  </div>

                </form>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6">
                <router-link
                    tag="a"
                    to="/lcshop"
                    class="btn text-muted d-none d-sm-inline-block btn-link"
                >
                  <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
                </router-link>
              </div>
              <!-- end col -->
              <div class="col-sm-6">
                <div class="text-sm-right">
                  <router-link tag="a" to="/ecommerce/checkout" class="btn btn-success">
                    <i class="mdi mdi-truck-fast mr-1"></i> Procéder au payement
                  </router-link>
                </div>
              </div>
              <!-- end col -->
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <i class="bx bx-money d-block check-nav-icon mt-4 mb-2"></i>
            <p class="font-weight-bold mb-4">Information de payement</p>
          </template>
          <b-card-text>
            <div class="card">
              <div class="card-body">
                <div>
                  <h4 class="card-title">Information de payement</h4>
                  <p class="card-title-desc">Remplissez toutes les informations ci-dessous</p>

                  <div>
                    <div class="custom-control custom-radio custom-control-inline mr-4">
                      <input
                          id="customRadioInline1"
                          type="radio"
                          name="customRadioInline1"
                          class="custom-control-input"
                      />
                      <label class="custom-control-label" for="customRadioInline1">
                        <i class="fab fa-cc-mastercard mr-1 font-size-20 align-top"></i> Carte banquaire
                      </label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline mr-4">
                      <input
                          id="customRadioInline2"
                          type="radio"
                          name="customRadioInline1"
                          class="custom-control-input"
                      />
                      <label class="custom-control-label" for="customRadioInline2">
                        <i class="fab fa-cc-paypal mr-1 font-size-20 align-top"></i> Paypal
                      </label>
                    </div>
                  </div>

                  <h5 class="mt-5 mb-3 font-size-15">Pour la carte de payement</h5>
                  <div class="p-4 border">
                    <form>
                      <b-form-group
                          id="input-group-2"
                          label="Numéro de carte"
                          label-for="input-card"
                          class="mb-0"
                      >
                        <b-form-input id="input-card" placeholder="0000 0000 0000 0000"></b-form-input>
                      </b-form-group>

                      <b-row class="mt-4">
                        <b-col lg="6">
                          <b-form-group
                              id="input-group-2"
                              label="Nom de la carte"
                              label-for="input-number"
                              class="mb-0"
                          >
                            <b-form-input id="input-number" placeholder="Nom de la carte"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col lg="3">
                          <b-form-group
                              id="input-group-2"
                              label="Date d'expiration"
                              label-for="input-date"
                              class="mb-0"
                          >
                            <b-form-input id="input-date" placeholder="MM/AA"></b-form-input>
                          </b-form-group>
                        </b-col>

                        <b-col lg="3">
                          <b-form-group
                              id="input-group-2"
                              label="Code secret"
                              label-for="cvvcodeInput"
                              class="mb-0"
                          >
                            <b-form-input id="cvvcodeInput" placeholder="XXX"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6">
                <router-link
                    tag="a"
                    to="/lcshop"
                    class="btn text-muted d-none d-sm-inline-block btn-link"
                >
                  <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
                </router-link>
              </div>
              <!-- end col -->
              <div class="col-sm-6">
                <div class="text-sm-right">
                  <router-link tag="a" to="/ecommerce/checkout" class="btn btn-success">
                    <i class="mdi mdi-truck-fast mr-1"></i> Procéder au payement
                  </router-link>
                </div>
              </div>
              <!-- end col -->
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
                          <th scope="col">Prix</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(product, index) in currentCart" :key="index">
                          <th scope="row">
                            <img
                                :src="product.img"
                                alt="product-img"
                                title="product-img"
                                class="avatar-md"
                            />
                          </th>
                          <td>
                            <h5 class="font-size-14 text-truncate">
                              <router-link :to="`/product-detail?id=${product.id}`" class="text-dark">{{ displayLongStr(product.name, 70) }} </router-link>
                            </h5>
                            <p class="text-muted mb-0">{{ product.price }}€ x {{extractData(cartData, product.id, "quantity")}}</p>
                          </td>
                          <td> {{ (parseFloat(product.price) * parseInt(cartData[index].quantity)).toFixed(2) }} </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <h6 class="m-0 text-right">Sub Total:</h6>
                          </td>
                          <td>$ 675</td>
                        </tr>
                        <tr>
                          <td colspan="3">
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
                            <h6 class="m-0 text-right">Total:</h6>
                          </td>
                          <td>$ 675</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-sm-6">
                <router-link
                    tag="a"
                    to="/lcshop"
                    class="btn text-muted d-none d-sm-inline-block btn-link"
                >
                  <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
                </router-link>
              </div>
              <!-- end col -->
              <div class="col-sm-6">
                <div class="text-sm-right">
                  <router-link tag="a" to="/ecommerce/checkout" class="btn btn-success">
                    <i class="mdi mdi-truck-fast mr-1"></i> Procéder au payement
                  </router-link>
                </div>
              </div>
              <!-- end col -->
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </div>
  </Layout>

</template>
