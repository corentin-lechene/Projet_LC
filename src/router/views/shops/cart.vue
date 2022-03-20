u
<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {sendDeleteTable, sendGetDataTable, sendUpdateTable} from "@/components/requests-bdd";
import {validRequest, displayLongStr, getTotalReductionOf, getReductionOf} from "@/components/my-functions";


export default {
  name: "cart",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Panier",

      carts: {},
      products: [],
      quantity: [],
      total: {
        ttc: [],
        reduction: [],
        shipping: 25,
        final: 0,
        getTotalTTC: (quantity) => {
          let temp = 0;
          if (this.total.ttc !== 0) {
            for (let i = 0; i < this.total.ttc.length; i++) {
              temp += this.total.ttc[i] * quantity[i];
            }
            return temp;
          }
        },
        getTotalReduction: () => {
          let temp = 0;
          if (this.total.ttc !== 0) {
            for (let i = 0; i < this.total.ttc.length; i++) {
              temp += getReductionOf(this.total.reduction[i], this.total.ttc[i]);
            }
            return temp;
          }
        },
        getTotalFinal: (quantity) => {
          return (this.total.getTotalTTC(quantity)).toFixed(2) - (this.total.getTotalReduction()).toFixed(2);
        },
        reset: () => {
          this.total.ttc = [];
          this.total.reduction = [];
          this.total.shipping = 25;
          this.total.final = 0;
        }
      },
    }
  },
  methods: {
    displayLongStr,
    getTotalReductionOf,

    getCarts() {
      let promise = sendGetDataTable('carts-customer', 39);
      promise.then((res) => {
        if (!validRequest(res)) {
          console.log(res);
          this.carts = res.result;
          for (let i = 0; i < res.result.length; i++) {
            for (const [key, val] of Object.entries(res.result[i])) {
              if (key === 'cart_quantity')
                this.quantity.push(val);
              else if (key === 'reduction')
                this.total.reduction.push(val);
              else if (key === 'price')
                this.total.ttc.push(val);
            }
          }
        }
      })
    },
    updateCart(route, id, index) {
      let promise;

      if (this.quantity[index] === 0) {
        this.deleteProduct(route, id);
      } else {
        promise = sendUpdateTable('carts_'+ route, id, {quantity: this.quantity[index]});
        promise.then((res) => {
          console.log(res);
        });
      }
    },
    deleteProduct(route, id) {
      const promise = sendDeleteTable('carts_' + route, id);
      promise.then((res) => {
        if (res.valid) {
          this.total.reset();
          this.getCarts();
        }
      });
    },
  },
  created() {
    this.getCarts();
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
                  <th>Reduction</th>
                  <th style="min-width: 100px; max-width: 100px">Quantité</th>
                  <th colspan="2">Total (reduction + quantité)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="carts.length <= 0" >
                  <td class="text-center" colspan="5" style="font-size: 25px">Panier vide.</td>
                </tr>
                <tr v-for="(product, index) in carts" :key="index">
                  <td>
                    <img
                        :src="product.image"
                        alt="img cart"
                        class="avatar-lg"
                    />
                  </td>
                  <td>
                    <h5 class="font-size-14 text-truncate">
                      <router-link v-if="product.cart_name === 'goods'" :to="`/product-detail?id=${product.product_id}`"
                                   class="text-dark">
                        {{ displayLongStr(product.name, 25) }}
                      </router-link>
                      <router-link v-else-if="product.cart_name === 'services'"
                                   :to="`/service-detail?id=${product.product_id}`" class="text-dark">
                        {{ displayLongStr(product.name, 25) }}
                      </router-link>
                    </h5>
                    <p>{{ displayLongStr(product.description, 30) }}</p>
                  </td>
                  <td>{{ product.price }} €</td>
                  <td>{{product.reduction}} %</td>
                  <td style="width: 150px">
                    <b-form-spinbutton v-model="quantity[index]"
                                       :min="0" vertical
                                       @change="updateCart(product.cart_name, product.cart_product_id, index)"/>
                  </td>
                  <td>
                    {{ (getTotalReductionOf(product.reduction, product.price) * quantity[index]).toFixed(2) }} €
                  </td>
                  <td>
                    <a class="action-icon text-danger" href="javascript:void(0);">
                      <i class="mdi mdi-trash-can font-size-18"
                         @click="deleteProduct(product.cart_name, product.cart_product_id)"></i>
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
                <img alt="" src="@/assets/images/carte.png" style="width: 240px; height: 200px">
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
                      <td>{{ (total.getTotalTTC(quantity)).toFixed(2) }} €</td>
                    </tr>
                    <tr>
                      <td>Réduction :</td>
                      <td>- {{ (total.getTotalReduction()).toFixed(2) }} €</td>
                    </tr>
                    <tr>
                      <td>Frais de port :</td>
                      <td v-if="total.ttc[0]">{{ total.shipping.toFixed(2) }} €</td>
                      <td v-else>0 €</td>
                    </tr>
                    </tbody>
                    <tr>
                      <th>Total :</th>
                      <th>{{ (total.getTotalFinal(quantity)).toFixed(2) }} €</th>
                    </tr>
                  </table>
                </div>
                <!-- end table-responsive -->
                <p class="text-center font-italic">Gain des points : {{ (total.getTotalFinal(quantity) / 10).toFixed(0) }} points</p>
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
            class="btn text-muted d-none d-sm-inline-block btn-link"
            tag="a"
            to="/lc-shop"
        >
          <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
        </router-link>
      </div>
      <!-- end col -->
      <div class="col-sm-6">
        <div class="text-sm-right">
          <router-link class="btn btn-success" tag="a" to="/checkout">
            <i class="mdi mdi-truck-fast mr-1"></i> Passer la commande
          </router-link>
        </div>
      </div>
      <!-- end col -->
    </div>

  </Layout>
</template>


