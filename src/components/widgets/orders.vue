<script>

import {sendGetDataTable, sendGetUserByToken} from "@/components/requests-bdd";
import {validRequest, displayLongStr, getTotalReductionOf, getReductionOf} from "@/components/my-functions";

export default {
  props: {
    cart_id: {
      type: Number,
      default: null
    },
    modals: {
      type: Object,
      default() {
        return {register: false, info: false, update: false, delete: false};
      }
    }
  },
    data() {
      return {
        showModal: false,
        orders: {},
        id: null,
        user: null,
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
      }
    },
    methods: {
      getTotalReductionOf,
      displayLongStr,
      getId(item) {
        this.id = item[this.options.name_id];
      },

      getGoodsOrServicesByCartId(table, id) {
        let promise = sendGetDataTable(table, id);
        promise.then((res) => {
          if (!validRequest(res)) {
            this.orders = res.result;
          }

        })
      },
      getCartPayed() {
        let promise = sendGetDataTable('carts-payed-customer', this.user.customer_id);
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
    },
    mounted() {
    },
    async created() {
      this.user = await sendGetUserByToken();
      if (!validRequest(this.user)) {
        this.user = this.user.result;
        this.getCartPayed();
        this.getGoodsOrServicesByCartId('goods-cart', this.customer.cart_id);
      } else {
        this.user = null;
        this.carts = [];
        this.orders = [];
      }
    },
  };
</script>

<template>
  <div class="table-responsive mb-0">
    <table class="table table-centered table-nowrap">
      <thead class="thead-light">
      <tr>
        <th style="width: 20px;">
        </th>
        <th>Order ID</th>
        <th>Billing Name</th>
        <th>Date</th>
        <th>Total</th>
        <th>Payment Status</th>
        <th>View Details</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="carts.length <= 0" >
        <td class="text-center" colspan="6" style="font-size: 25px">Panier vide.</td>
      </tr>
      <tr v-for="(product) in carts" :key="product.cart_id">
        <td></td>
        <td>
          <a href="javascript: void(0);" class="text-body font-weight-bold">{{product.cart_id}}</a>
        </td>
        <td>{{user.firstname}}  {{user.lastname}}</td>
        <td>{{product.updated_at}}</td>
        <td>{{ (total.getTotalFinal()) }} €</td>
        <td>{{product.status}}</td>
        <td>
          <!-- Button trigger modal -->
          <button
              type="button"
              class="btn btn-primary btn-sm btn-rounded"
              @click="showModal = true"
          >View Details</button>
        </td>
      </tr>
      </tbody>
    </table>
    <b-modal v-model="showModal" title="Order Details" centered>      <div class="row">
        <div v-if="orders.length === 0">Aucun Good trouvé </div>
        <div v-for="good in orders" :key="good.id" class="col-sm-4 col-md-4 col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="text-center card-box">
                <div class="member-card pt-2 pb-2">
                  <div class="thumb-lg member-thumb mx-auto"><img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                  class="rounded-circle img-thumbnail" alt="profile-image">
                    <!--<b-img :src="require(`@/assets/images/users/${good.image}`)" fluid
                           class="rounded-circle img-thumbnail" alt="avatar"/>-->
                  </div>
                  <div class="">
                    <h4> {{ good.price}} € | {{ good.reduction }} %</h4>
                    <p><span>{{ good.name }}</span></p>
                  </div>
                  <div class="text-center">
                    <b-button class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Voir plus
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  Modals info  /-->
        <b-modal v-if="id !== null" id="info" title="Detail" title-class="font-18" size="xl" hide-footer centered>
          <div class="card">
            <div class="card-body">
              <keep-alive>
                <component :is="modals.info" v-bind="this.modals.info"/>
              </keep-alive>
            </div>
          </div>
        </b-modal>
      </div>
    </b-modal>
  </div>
</template>