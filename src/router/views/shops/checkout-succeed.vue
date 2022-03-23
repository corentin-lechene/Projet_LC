<script>

import {sendGetDataTable, sendUpdateTable} from "@/components/requests-bdd";
import {getReductionOf, validRequest} from "@/components/my-functions";

export default {
  name: "checkout-succeed",
  data() {
    return{
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
      cart_id: null,
      contentPDF: null,
    }
  },
  methods: {
    getCart() {
      let promise = sendGetDataTable('carts-customer', this.CUSTOMER_ID);
      promise.then((res) => {
        console.log(res);
        if (!validRequest(res)) {
          this.cart_id = res.result[0].cart_id;
          if(this.cart_id !== undefined) {
            this.validCheckout();
          }
        }
      })
    },

    validCheckout() {
      let promise = sendUpdateTable('carts', this.cart_id, {pdf: this.contentPDF, customer_id: this.CUSTOMER_ID});
      promise.then((res) => {
        if (!validRequest(res)) {
          console.log(res);
        }
      })
    }
  },
  created() {
    this.getCart();
  },
  watch: {
    contentPDF() {
      console.log(this.contentPDF);
      if(this.contentPDF !== null) {
        this.validCheckout();
      }
    }
  }
}
</script>

<template>
  <div>
    <h2>votre achat a été payé avec succès. Redirection vers la page d'accueil.</h2>
  </div>
</template>