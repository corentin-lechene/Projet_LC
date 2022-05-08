<script>
import VueHtml2pdf from 'vue-html2pdf';
import {displayLongStr, getReductionOf, getTotalReductionOf, validRequest} from "@/components/my-functions";
import {sendGetDataTable} from "@/components/requests-bdd";

export default {
  components: {VueHtml2pdf},
  data() {
    return {
      title: "PDF",

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
    currentDateTime() {
      const current = new Date();
      const date = +current.getDate() + '/' + (current.getMonth() + 1) + '/' + current.getFullYear();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      return date + ' ' + time
    },

    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    test(e) {
      document.getElementById('content').appendChild(e.pdfContent);
    },
  },

  created() {
    this.getCart();
  },
}

</script>

<template>
  <div>
    <div id="pdf" ref="facture">
      <vue-html2pdf
          ref="html2Pdf"
          :enable-download="true"
          :float-layout="true"
          :manual-pagination="false"
          :paginate-elements-by-height="1400"
          :pdf-quality="2"
          :preview-modal="true"
          :show-layout="false"
          filename="facture"
          pdf-content-width="800px"
          pdf-format="a4"
          pdf-orientation="portrait"

          @beforeDownload="test($event)"
      >
        <section slot="pdf-content">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="invoice-title">
                    <h4 class="float-right font-size-16">Commande # ${}</h4>
                    <div class="mb-4">
                      <h3>Loyalty Card</h3>
                      <img alt="logo" src="@/assets/images/logolc.png"/>
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
                    <table class="table table-centered mb-0 table-nowrap">
                      <thead class="thead-light">
                      <tr class="text-center">
                        <th>Produit</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Réduction</th>
                        <th style="min-width: 100px; max-width: 100px">Quantité</th>
                        <th>Total (reduction + quantité)</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-if="carts.length <= 0">
                        <td class="text-center" colspan="6" style="font-size: 25px">Panier vide.</td>
                      </tr>
                      <tr v-for="(product, index) in carts" :key="index">
                        <td>
                          <b-avatar :src="require(`@/assets/images/product/${product.image}`)" alt="img" size="8em" square/>
                        </td>
                        <td>
                          <h5 class="font-size-14 text-truncate">
                            <router-link v-if="product.cart_name === 'goods'"
                                         :to="`/product-detail?id=${product.product_id}`"
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
                        <td class="text-center">{{ product.price }} €</td>
                        <td class="text-center">{{ product.reduction ? product.reduction + ' %' : '/' }}</td>
                        <td class="text-center" style="max-width: 150px">{{ product.cart_quantity }}</td>
                        <td class="text-center">
                          {{ (getTotalReductionOf(product.reduction, product.price) * product.cart_quantity).toFixed(2) }} €
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title mb-3">Récapitulatif du panier</h4>

                        <div class="table-responsive">
                          <table class="table mb-0">
                            <tbody>
                            <tr>
                              <td>Total TTC :</td>
                              <td>{{ (total.getTotalTTC()) }} €</td>
                            </tr>
                            <tr>
                              <td>Total Réductions :</td>
                              <td>- {{ (total.getTotalReduction()) }} €</td>
                            </tr>
                            <tr>
                              <td>Frais de port :</td>
                              <td v-if="total.ttc[0]">{{ total.shipping.toFixed(2) }} €</td>
                              <td v-else>0 €</td>
                            </tr>
                            </tbody>
                            <tr>
                              <th>Total final :</th>
                              <th>{{ (total.getTotalFinal()) }} €</th>
                            </tr>
                          </table>
                        </div>
                        <!-- end table-responsive -->
                        <p class="text-center font-italic">Gain des points : {{ total.getTotalPoints() }} points</p>
                      </div>
                    </div>
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

    <div id="content"></div>

    <div v-if="false" class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="invoice-title">
              <h4 class="float-right font-size-16">Commande # ${}</h4>
              <div class="mb-4">
                <h3>Loyalty Card</h3>
                <img alt="logo" src="@/assets/images/logolc.png"/>
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
              <table class="table table-centered mb-0 table-nowrap">
                <thead class="thead-light">
                <tr class="text-center">
                  <th>Produit</th>
                  <th>Description</th>
                  <th>Prix</th>
                  <th>Réduction</th>
                  <th style="min-width: 100px; max-width: 100px">Quantité</th>
                  <th>Total (reduction + quantité)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="carts.length <= 0">
                  <td class="text-center" colspan="6" style="font-size: 25px">Panier vide.</td>
                </tr>
                <tr v-for="(product, index) in carts" :key="index">
                  <td>
                    <b-avatar :src="require(`@/assets/images/product/${product.image}`)" alt="img" size="8em" square/>
                  </td>
                  <td>
                    <h5 class="font-size-14 text-truncate">
                      <router-link v-if="product.cart_name === 'goods'"
                                   :to="`/product-detail?id=${product.product_id}`"
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
                  <td class="text-center">{{ product.price }} €</td>
                  <td class="text-center">{{ product.reduction ? product.reduction + ' %' : '/' }}</td>
                  <td class="text-center" style="max-width: 150px">{{ product.cart_quantity }}</td>
                  <td class="text-center">
                    {{ (getTotalReductionOf(product.reduction, product.price) * product.cart_quantity).toFixed(2) }} €
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title mb-3">Récapitulatif du panier</h4>

                  <div class="table-responsive">
                    <table class="table mb-0">
                      <tbody>
                      <tr>
                        <td>Total TTC :</td>
                        <td>{{ (total.getTotalTTC()) }} €</td>
                      </tr>
                      <tr>
                        <td>Total Réductions :</td>
                        <td>- {{ (total.getTotalReduction()) }} €</td>
                      </tr>
                      <tr>
                        <td>Frais de port :</td>
                        <td v-if="total.ttc[0]">{{ total.shipping.toFixed(2) }} €</td>
                        <td v-else>0 €</td>
                      </tr>
                      </tbody>
                      <tr>
                        <th>Total final :</th>
                        <th>{{ (total.getTotalFinal()) }} €</th>
                      </tr>
                    </table>
                  </div>
                  <!-- end table-responsive -->
                  <p class="text-center font-italic">Gain des points : {{ total.getTotalPoints() }} points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
</style>
