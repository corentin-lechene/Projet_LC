u<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {cartData} from "@/data/data-cart";
import {productData} from "@/data/data-products";


export default {
  name: "cart",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Panier",

      cartData,
      productData,

      currentCart: [],

      debug: null,
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
    updateQuantity(index, val) {
      this.cartData[index].quantity += val;
      // if(this.cartData[index].quantity <= 0) {
      //   let id = this.cartData[index].id;
      //   this.cartData = this.cartData.filter(cartData => parseInt(cartData.id) !== id );
      //   this.getProductsFromCart(productData);
      // }
    },
    displayLongStr(str, end) {
      if (end <= 0)
        return "Error !";
      str = str.toString();
      return `${str.substring(0, end)} ${(str.length > end) ? "[..]" : ""}`;
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

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-centered mb-0 table-nowrap">
                <thead class="thead-light">
                <tr>
                  <th>Produits</th>
                  <th>Description du produit</th>
                  <th>Prix</th>
                  <th style="min-width: 100px; max-width: 100px">Quantité</th>
                  <th colspan="2">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(product, index) in currentCart" :key="index">
                  <td>
                    <img
                        :src="product.img"
                        class="avatar-lg"
                        alt="img cart"
                    />
                  </td>
                  <td>
                    <h5 class="font-size-14 text-truncate">
                      <router-link :to="`/product-detail?id=${product.id}`" class="text-dark">
                        {{ displayLongStr(product.name, 25) }}
                      </router-link>
                    </h5>
                    <p>{{ displayLongStr(product.description, 30) }}</p>
                  </td>
                  <td>{{ product.price }}€</td>
                  <td style="width: 150px">
                    <div class="btn-group">
                      <div>
                        <b-input v-model="cartData[index].quantity" class="inputQuantity"
                                 style="height: 100%"></b-input>
                      </div>
                      <div class="btn-group-vertical">
                        <b-button class="spinnerButton" size="sm" @click="updateQuantity(index, 1)">+</b-button>
                        <b-button class="spinnerButton" size="sm" @click="updateQuantity(index, -1)">-</b-button>
                      </div>
                    </div>
                  </td>
                  <td>
                    {{ (parseFloat(product.price) * parseInt(cartData[index].quantity)).toFixed(2) }}€
                  </td>
                  <td>
                    <a href="javascript:void(0);" class="action-icon text-danger">
                      <i class="mdi mdi-trash-can font-size-18" @click="currentCart.splice(index, 1)"></i>
                    </a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="row">

          <div class="col-5 col-xl-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-4">Carte de fidélité</h5>
                <img src="@/assets/images/carte.png" alt="" style="width: 240px; height: 200px">
              </div>
            </div>
          </div>

          <div class="col-7 col-xl-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-3">Récapitulatif du panier</h4>

                <div class="table-responsive">
                  <table class="table mb-0">
                    <tbody>
                    <tr>
                      <td>Total TTC :</td>
                      <td>800€</td>
                    </tr>
                    <tr>
                      <td>Réduction :</td>
                      <td>- 200€</td>
                    </tr>
                    <tr>
                      <td>Frais de port :</td>
                      <td>25€</td>
                    </tr>
                    </tbody>
                    <tr>
                      <th>Total :</th>
                      <th>1200€</th>
                    </tr>
                  </table>
                </div>
                <!-- end table-responsive -->
                <p class="text-center font-italic">Gain des points : 20 points</p>
              </div>
            </div>
          </div>
        </div>

        <!-- end card -->
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-sm-6">
        <router-link
            tag="a"
            to="/lc-shop"
            class="btn text-muted d-none d-sm-inline-block btn-link"
        >
          <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
        </router-link>
      </div>
      <!-- end col -->
      <div class="col-sm-6">
        <div class="text-sm-right">
          <router-link tag="a" to="/checkout" class="btn btn-success">
            <i class="mdi mdi-truck-fast mr-1"></i> Passer la commande
          </router-link>
        </div>
      </div>
      <!-- end col -->
    </div>

  </Layout>
</template>


<style>
.inputQuantity {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.spinnerButton {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

</style>


