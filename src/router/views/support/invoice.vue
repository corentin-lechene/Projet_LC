<script>
import VueHtml2pdf from 'vue-html2pdf';
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
    },
    generateReport(){
      this.$refs.html2Pdf.generatePdf();
    }
  },

  created() {
    this.getProductsFromCart(productData);
  },

  components: {
    VueHtml2pdf
  }
}

</script>

<template>
  <div id="pdf" ref="facture">
    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="facture"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="invoice-title">
                  <h4 class="float-right font-size-16">Commande # 12345</h4>
                  <div class="mb-4">
                    <h3>Loyalty Card</h3>
                    <img src="@/assets/images/logolc.png" alt="logo"/>
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-6">
                    <address>
                      <strong>Adressé à:</strong>
                      <br/>John Smith
                      <br/>1234 Main
                      <br/>Apt. 4B
                      <br/>Springfield, ST 54321
                    </address>
                  </div>
                  <div class="col-6 text-right">
                    <address>
                      <strong>Livré à:</strong>
                      <br/>Kenny Rigdon
                      <br/>1234 Main
                      <br/>Apt. 4B
                      <br/>Springfield, ST 54321
                    </address>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 mt-3">
                    <address>
                      <strong>Méthode de paiement:</strong>
                      <br/>Visa ending **** 4242
                      <br/>jsmith@email.com
                    </address>
                  </div>
                  <div class="col-6 mt-3 text-right">
                    <address>
                      <strong>Date commande:</strong>
                      <br/>{{ currentDateTime() }}
                      <br/>
                      <br/>
                    </address>
                  </div>
                </div>
                <div class="p-2 mt-3">
                  <h3 class="font-size-16">Résumé de la commande</h3>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th style="width: 70px;">No.</th>
                      <th>Désignation</th>
                      <th>Prix unitaire</th>
                      <th class="text-center">Quantité</th>
                      <th class="text-right">Montant</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(product, index) in currentCart" :key="index">
                      <td>{{ index+1 }}</td>
                      <td>
                        <router-link :to="`/product-detail?id=${product.id}`" class="text-dark">
                          {{ product.name }}
                        </router-link>
                      </td>
                      <td>{{ product.price+"€" }}</td>
                      <td class="text-center">{{cartData[index].quantity}}</td>
                      <td class ="text-right">
                        {{ (parseFloat(product.price) * parseInt(cartData[index].quantity)).toFixed(2) }}€
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="border-0 text-right">
                        <h4>Total</h4>
                      </td>
                      <td class="border-0 text-right">
                        <h4 class="m-0">767.67€</h4>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>
    <div>
      <button @click="generateReport">Export PDF</button>
    </div>
  </div>
</template>

<style>
</style>
