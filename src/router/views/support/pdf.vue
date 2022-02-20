<script>

import {cartData} from "@/data/data-cart";
import {productData} from "@/data/data-products";

export default {
  data() {
    return {
      title: "PDF",

      cartData,
      productData,

      currentCart: [],

      debug: null,
    }
  },
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = +current.getDate()+'/'+(current.getMonth()+1)+'/'+current.getFullYear();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;

      return dateTime;
    },
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
    }
  },

  created() {
    this.getProductsFromCart(productData);
  }

};

</script>


<template>
  <section class="pdf-content">
    <section class="report-info">
      <section class="image-container">
        <router-link tag="a" to="/">
          <img src="@/assets/images/logolc.png" alt class="rounded avatar-sm" style="margin-top: 5px;"/>
        </router-link>
      </section>

      <section class="title-details">
        <h4 class="title">Loyalty Card Facture</h4>

        <span class="detail-container">
          <span class="detail-label">N° Facture:</span>
          3545125
        </span>

        <span class="detail-container">
          <span class="detail-label">Date:</span>
          {{currentDateTime()}}
        </span>

      </section>
    </section>

    <div class="table-responsive">
      <table class="table table-centered mb-0 table-nowrap">
        <thead class="thead-light">
        <tr>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th colspan="2">Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in currentCart" :key="index">
          <td>
            <h5 class="font-size-14 text-truncate">
              <router-link :to="`/product-detail?id=${product.id}`" class="text-dark">
                {{ product.name }}
              </router-link>
            </h5>
          </td>
          <td>{{ product.price+" €" }}</td>
          <td>{{cartData[index].quantity}}</td>
          <td>
            {{ (parseFloat(product.price) * parseInt(cartData[index].quantity)).toFixed(2) }}€
          </td>
        </tr>
          <tr>
            <td style="font-weight: bold; font-size: large;">Total Facture :</td>
            <td></td>
            <td></td>
            <td style="font-weight: bold; font-size: large;">1857 €</td>
          </tr>
        </tbody>
      </table>
    </div>

  </section>
</template>


<style lang="scss" scoped>
.pdf-content {
  width: 100%;
  background: #fff;
  .report-info {
    display: flex;
    padding: 20px;
    padding-bottom: 0px;
    .image-container {
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin-right: 25px;
      .user-image {
        height: 100%;
        min-width: 100%;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
    .title-details {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      .title {
        margin-bottom: 10px;
        flex-shrink: 0;
      }
      .detail-container {
        font-size: 13px;
        flex-shrink: 0;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: 600;
          margin-right: 5px;
          font-size: 13px;
        }
      }
    }
  }
  .chart-container {
    width: 100%;
    height: 320px;
    padding: 20px;
    pointer-events: none;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}
</style>
