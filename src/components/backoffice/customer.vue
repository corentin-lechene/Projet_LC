<script>

import AdminTable from "@/components/widgets/admin-table";
import Profile from "@/components/widgets/profile";
import Qrcode from 'v-qrcode/src/index'

import {sendGetDataTable, sendGetUserByToken} from "@/components/requests-bdd";
import {validRequest, displayLongStr} from "@/components/my-functions";

export default {
  name: "customer",
  components: {AdminTable, Profile, Qrcode},
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
      qrCls: 'qrcode',
      size: 100,
      background: 'white',
      token: null,
      showModal: false,
      orders: {},
      roles: {},
      point: {},
      id: null,
      user: null,
      carts: {},
      cart:{},
    }
  },
  methods: {
    displayLongStr,
    getId(item) {
      this.id = item[this.options.name_id];
    },
    async getOrder(id){
      this.orders = (await sendGetDataTable('goods-cart', this.user.customer_id +"&"+ id)).result;
    }
  },
  async created() {
    this.user = await sendGetUserByToken();
    if (localStorage.user_token) {
      this.token = localStorage.getItem('user_token');
    }
    if (!validRequest(this.user)) {
      this.user = this.user.result;
      this.carts = (await sendGetDataTable('carts-payed-customer', this.user.customer_id)).result;
      this.point = (await sendGetDataTable('card-points', this.user.customer_id)).result;
    } else {
      this.user = null;
      this.carts = [];
      this.orders = [];
      this.point = [];
    }
  }
};
</script>


<template>
  <div>
    <div v-if="$route.hash === '#orders'">
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
          <tr v-if="carts.length <= 0">
            <td class="text-center" colspan="6" style="font-size: 25px">Panier vide.</td>
          </tr>
          <tr v-for="(product) in carts" :key="product.cart_id">
            <td></td>
            <td>
              <a href="javascript: void(0);" class="text-body font-weight-bold">{{ product.cart_id }}</a>
            </td>
            <td>{{ user.firstname }} {{ user.lastname }}</td>
            <td>{{ product.updated_at }}</td>
            <td>{{ product.cart_total }} €</td>
            <td>{{ product.status }}</td>
            <td>
              <!-- Button trigger modal -->
              <button
                  type="button"
                  class="btn btn-primary btn-sm btn-rounded"
                  @click="getOrder(product.cart_id)"
                  v-b-modal="'order-detail'"
              >View Details
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <b-modal id="order-detail" title="Order Details" size="xl" centered>
          <div class="row">
            <div v-if="orders.length === 0">Aucun Good trouvé</div>
            <div v-for="(good,i) in orders" :key="i" class="col-sm-4 col-md-4 col-xl-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-center card-box">
                    <div class="member-card pt-2 pb-2">
                      <div class="thumb-lg member-thumb mx-auto">
                        <b-img :src="require(`@/assets/images/product/${good.image}`)" fluid
                               class="rounded-circle img-thumbnail" alt="avatar"/>
                      </div>
                      <div class="">
                        <h4>  Nom: {{ good.name }}</h4>
                        <h4> Prix: {{ good.price }}€</h4>
                        <h4> Quantité : {{ good.cart_quantity }}</h4>
                        <h4> Reduction: {{ good.reduction }}%</h4>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <div v-else-if="$route.hash === '#settings'">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-2">
          <p style="font-size: large;"> La newsletter </p>
        </div>
        <div class="col-5">
          <input type="text" class="form-control" placeholder="Votre email" />

        </div>
        <div class="col-4">
          <b-button variant="success" class="w-md">Je m'abonne</b-button>
        </div>
      </div>
      <div class="row" style="height: 10px;"></div>
      <div class="row">
        <div class="col-1"></div>
      </div>
      <qrcode :background="background" :size="size" :cls="qrCls" :value="token"></qrcode>
    </div>
    <div v-else-if="$route.hash === '#mycard'">
      <div class="row">
        <h4>  Mes points : {{ point.points }}</h4>
      </div>
      </div>
    <Profile v-if="$route.hash === '#profile'"/>
  <span v-for="(role, i) in roles" :key="i">
      <AdminTable v-if="$route.hash === role.hash" :options="role.options" :fields="role.fields" :modals="role.modals"/>
    </span>
  </div>
</template>


<style scoped>

</style>