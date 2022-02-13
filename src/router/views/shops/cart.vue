<script>

import {cartData} from "@/data/data-cart";
import {productData} from "@/data/data-products";


export default {
  name: "cart",
  components: {},
  data() {
    return {
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
        if(objet[i].id !== id)
          continue;

        if(column !== null)
          temp.push(objet[i][column]);
        else
          temp.push(objet[i]);
      }
      if(temp.length === 1)
        return temp[0];

      return {
        size: temp.length,
        first: temp[0],
        last: temp[temp.length -1],
        values: temp,
      };
    },
    getProductsFromCart(obj) {
      for(let i = 0 ; i < cartData.length ; ++i) {
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
    }
  },

  created() {
    this.getProductsFromCart(productData);
  }
}
</script>

<template>

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
                <th>Quantité</th>
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
                    <router-link
                        :to="`/product-detail?id=${product.id}`"
                        class="text-dark"
                    >{{ product.name }}
                    </router-link>
                  </h5>
                  <p>Peut etre des infos ici</p>
                </td>
                <td>{{ product.price }}</td>
                <td style="width: 150px">
                  <div class="btn-group">
                    <div>
                      <b-input v-model="cartData[index].quantity" class="inputQuantity" style="height: 100%"></b-input>
                    </div>
                    <div class="btn-group-vertical">
                      <b-button class="spinnerButton" size="sm" @click="updateQuantity(index, 1)">+</b-button>
                      <b-button class="spinnerButton" size="sm" @click="updateQuantity(index, -1)">-</b-button>
                    </div>
                  </div>
                </td>
                <td>
                  {{ parseFloat(product.price) * parseInt(cartData[index].quantity) }}€
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
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-4">Carte de fidélité</h5>

          <div class="card bg-primary text-white visa-card mb-0">
            <div class="card-body">
              <div>
                <i class="bx bxl-visa visa-pattern"></i>

                <div class="float-right">
                  <i class="bx bxl-visa visa-logo display-3"></i>
                </div>

                <div>
                  <i class="bx bx-chip h1 text-warning"></i>
                </div>
              </div>

              <div class="row mt-5">
                <div class="col-4">
                  <p>
                    <i class="fas fa-star-of-life m-1"></i>
                    <i class="fas fa-star-of-life m-1"></i>
                    <i class="fas fa-star-of-life m-1"></i>
                  </p>
                </div>
                <div class="col-4">
                  <p>
                    <i class="fas fa-star-of-life m-1"></i>
                    <i class="fas fa-star-of-life m-1"></i>
                    <i class="fas fa-star-of-life m-1"></i>
                  </p>
                </div>
                <div class="col-4">
                  <p>
                    <i class="fas fa-star-of-life m-1"></i>
                    <i class="fas fa-star-of-life m-1"></i>
                    <i class="fas fa-star-of-life m-1"></i>
                  </p>
                </div>
              </div>

              <div class="mt-5">
                <h5 class="text-white float-right mb-0">12/22</h5>
                <h5 class="text-white mb-0">Fredrick Taylor</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-3">Récapitulatif du panier</h4>

          <div class="table-responsive">
            <table class="table mb-0">
              <tbody>
              <tr>
                <td>Grand Total :</td>
                <td>$ 1,857</td>
              </tr>
              <tr>
                <td>Discount :</td>
                <td>- $ 157</td>
              </tr>
              <tr>
                <td>Shipping Charge :</td>
                <td>$ 25</td>
              </tr>
              <tr>
                <td>Estimated Tax :</td>
                <td>$ 19.22</td>
              </tr>
              <tr>
                <th>Total :</th>
                <th>$ 1744.22</th>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
        </div>
      </div>
      <!-- end card -->
    </div>
  </div>

</template>



<style>
  .inputQuantity {
    border-top-right-radius: 0!important;
    border-bottom-right-radius: 0!important;
  }

  .spinnerButton {
    border-top-left-radius: 0!important;
    border-bottom-left-radius: 0!important;
  }

</style>


