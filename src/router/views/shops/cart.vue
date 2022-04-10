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
      carts: {},
      total: {
        ttc: [],
        reduction: [],
        shipping: 0,
        final: 0,
        getTotalTTC: () => {
          let temp = 0;
          for (let i = 0; i < this.total.ttc.length; i++) {
            temp += this.total.ttc[i];
          }
          return temp.toFixed(2);
        },
        getTotalReduction: () => {
          let temp = 0;
          if (this.total.ttc !== 0) {
            for (let i = 0; i < this.total.ttc.length; i++) {
              temp += getReductionOf(this.total.reduction[i], this.total.ttc[i]);
            }
            return temp.toFixed(2);
          }
        },
        getTotalFinal: () => {
          return ((this.total.getTotalTTC()) - (this.total.getTotalReduction())).toFixed(2);
        },
        getTotalPoints: () => {
          let temp = this.total.getTotalFinal();
          let total = temp * 0.3;
          for (let i = 1; i < temp / 100; i++) {
            total++;
          }
          return total.toFixed(0);
        },
        reset: () => {
          this.total.ttc = [];
          this.total.reduction = [];
          this.total.shipping = 0;
          this.total.final = 0;
        }
      },
      CUSTOMER_ID: 39, //TODO
    }
  },
  methods: {
    displayLongStr,
    getTotalReductionOf,

    getCart() {
      let promise = sendGetDataTable('carts-customer', this.CUSTOMER_ID);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.total.reset();
          this.carts = res.result;
          for (let i = 0; i < res.result.length; i++) {
            let quantity = 1;
            for (const [key, val] of Object.entries(res.result[i])) {
              if (key === 'cart_quantity')
                quantity = val;
              else if (key === 'reduction')
                this.total.reduction.push(val);
              else if (key === 'price')
                this.total.ttc.push(val);
            }
            this.total.ttc[i] *= quantity;
          }
        }
      })
    },
    updateCart(route, id, index) {
      let promise;

      if (this.carts[index].cart_quantity === 0) {
        this.deleteProduct(route, id);
      } else {
        promise = sendUpdateTable('carts_'+ route, id, {quantity: this.carts[index].cart_quantity});
        promise.then((res) => {
          if(!validRequest(res)) {
            this.total.reset();
            this.getCart();
          }
        });
      }
    },
    deleteProduct(route, id) {
      const promise = sendDeleteTable('carts_' + route, id);
      promise.then((res) => {
        if (res.valid) {
          this.total.reset();
          this.getCart();
        }
      });
    },
  },
  created() {
    this.getCart();
  }
}
</script>

<template>
  <Layout>
    <PageHeader :title="$t('cart.title')"/>

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-centered mb-0 table-nowrap">
                <thead class="thead-light">
                <tr>
                  <th>{{ $t('cart.table.product') }}</th>
                  <th>{{ $t('cart.table.description') }}</th>
                  <th>{{ $t('g.price') }}</th>
                  <th>{{ $t('g.discount') }}</th>
                  <th style="min-width: 100px; max-width: 100px">{{ $t('cart.table.quantity') }}</th>
                  <th colspan="2">{{ $t('cart.table.total') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="carts.length <= 0" >
                  <td class="text-center" colspan="6" style="font-size: 25px">Panier vide.</td>
                </tr>
                <tr v-for="(product, index) in carts" :key="index">
                  <td>
                    <b-img :src="require(`@/assets/images/product/${product.image}`)" alt="img" fluid/>
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
                    <b-form-spinbutton v-model="product.cart_quantity"
                                       :min="0" vertical
                                       @change="updateCart(product.cart_name, product.cart_product_id, index)"/>
                  </td>
                  <td>
                    {{ (getTotalReductionOf(product.reduction, product.price) * product.cart_quantity).toFixed(2) }} €
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
                <h5 class="card-title mb-4">{{ $t('cart.loyalty-card') }}</h5>
                <img alt="" src="@/assets/images/carte.png" style="width: 240px; height: 200px">
              </div>
            </div>
          </div>

          <div class="col-7 col-xl-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-3">{{ $t('cart.summary.title') }}</h4>

                <div class="table-responsive">
                  <table class="table mb-0">
                    <tbody>
                    <tr>
                      <td>{{ $t('cart.summary.total-ttc') }} : </td>
                      <td>{{ (total.getTotalTTC()) }} €</td>
                    </tr>
                    <tr>
                      <td>{{ $t('g.discount') }} : </td>
                      <td>- {{ (total.getTotalReduction())}} €</td>
                    </tr>
                    <tr>
                      <td>{{ $t('cart.summary.shipping') }} :</td>
                      <td v-if="total.ttc[0]">{{ total.shipping.toFixed(2) }} €</td>
                      <td v-else>0 €</td>
                    </tr>
                    </tbody>
                    <tr>
                      <th>{{ $t('g.total') }} :</th>
                      <th>{{ (total.getTotalFinal()) }} €</th>
                    </tr>
                  </table>
                </div>
                <!-- end table-responsive -->
                <p class="text-center font-italic">{{ $t('cart.summary.points.text') }} : {{ total.getTotalPoints() }} {{ $t('cart.summary.points.word') }}</p>
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
          <i class="mdi mdi-arrow-left mr-1"></i> {{ $t('g.back-shop') }}
        </router-link>
      </div>
      <!-- end col -->
      <div class="col-sm-6">
        <div class="text-sm-right">
          <b-button v-if="total.ttc.length > 0" variant="success" @click="$router.push({path: '/checkout'})"><i class="mdi mdi-truck-fast mr-1"></i> {{ $t('g.go-checkout') }}</b-button>
          <b-button v-else variant="success" disabled><i class="mdi mdi-truck-fast mr-1"></i> {{ $t('g.go-checkout') }}</b-button>
        </div>
      </div>
      <!-- end col -->
    </div>

  </Layout>
</template>

