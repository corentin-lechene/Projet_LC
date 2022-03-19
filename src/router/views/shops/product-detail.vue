<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {sendGetDataTable, sendInsertTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";


export default {

  name: "product-detail",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Detail du produit",

      productDetail: -1,
      products: {},
      loading: true,
      CUSTOMER_ID: 39, //TODO

    }
  },
  methods: {
    addToCart() {
      let promise = sendInsertTable('carts_goods', {
        customer_id: this.CUSTOMER_ID,
        quantity: 1,
        good_id: this.productDetail.good_id
      });
      promise.then((res) => {
        if(!validRequest(res.result)) {
          this.makeToast();
        }
      });
    },
    makeToast() {
      this.$bvToast.toast('Produit ajouté avec succès', {
        variant: 'success',
        noCloseButton: true,
        autoHideDelay: 5000
      })
    },
    getGoodsById() {
      let id = parseInt(this.$route.query.id || -1);
      if (id === -1) {
        this.productDetail = -1;
        this.$router.push({name: 'InternetServerError'});
      }

      let promise = sendGetDataTable('goods', id);
      promise.then((res) => {
        if (!validRequest(res) && res.result !== undefined) {
          this.productDetail = res.result;
        } else {
          this.serviceDetail = -1;
          this.$router.push({name: 'InternetServerError'});
        }
      })
    },
  },
  mounted() {
    this.getGoodsById();
  }
}
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>
    <div v-if="productDetail !== -1" class="row">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <div class="product-detai-imgs">
                    <b-tabs nav-wrapper-class="col-md-2 col-sm-3 col-4" pills vertical>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail.image"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail.image"
                              alt
                              class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail.image"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail.image"
                              alt
                              class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail.image"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail.image"
                              alt
                              class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </b-tab>
                    </b-tabs>
                  </div>
                </div>


                <div class="col-lg-6">
                  <div class="mt-3">
                    <h4 class="mt-1 mb-3">{{ productDetail.name }}</h4>

                    <p class="text-muted float-left mr-3">
                      <span class="bx bx-star text-warning"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star ml-1"></span>
                    </p>
                    <p class="text-muted mb-4">( 0 utilisateurs ont acheté )</p>

                    <h6 class="text-success text-uppercase">{{ productDetail.reduction }} Off</h6>
                    <h5 class="mb-4">
                      Prix :
                      <b>{{ productDetail.price }}€</b>
                    </h5>
                    <p class="text-muted mb-4">
                      {{ productDetail.description }}
                    </p>
                  </div>
                  <div class="text-left">
                    <button class="btn btn-primary waves-effect waves-light my-2 mr-2" type="button"
                            @click="addToCart()">
                      <i class="bx bx-cart me-2"></i> Ajouter au panier
                    </button>
                    <button class="btn btn-success waves-effect my-2 mx-2 waves-light" type="button">
                      <i class="bx bx-shopping-bag me-2"></i> Acheter maintenant
                    </button>
                  </div>
                </div>
              </div>

              <hr class="mt-3 pt-0">

              <div class="card-body">
                <div>
                  <h5 class="mb-3">Specifications :</h5>

                  <div class="table-responsive">
                    <table class="table mb-0 table-bordered">
                      <tbody>
                      <tr>
                        <th scope="row">des choses</th>
                        <td>encore des choses</td>
                      </tr>
                      <tr>
                        <th scope="row">des choses</th>
                        <td>encore des choses</td>
                      </tr>
                      <tr>
                        <th scope="row">des choses</th>
                        <td>encore des choses</td>
                      </tr>
                      <tr>
                        <th scope="row">des choses</th>
                        <td>encore des choses</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-sm-12">
        <router-link
            class="btn text-muted d-none d-sm-inline-block btn-link"
            tag="a"
            to="/lc-shop"
        >
          <i class="mdi mdi-arrow-left mr-1"></i> Retour vers la boutique
        </router-link>
      </div>
      <!-- end col -->
    </div>

    <div class="row">
      <div class="col-12">
        <h4 class="my-3">Nos nouveautés</h4>
        <b-card-group deck>
          <b-card
              v-for="product in products" :key="product.id" class="col-xl-4 col-sm-6">
            <div class="product-img position-relative">
              <div v-if="product.reduction" class="avatar-sm product-ribbon">
                <span class="avatar-title rounded-circle bg-primary">-{{ product.reduction }}%</span>
              </div>
              <router-link :to="`/product-detail?id=${product.id}`" tag="a">
                <img :src="`${product.image}`" alt class="img-fluid mx-auto d-block"/>
              </router-link>
            </div>
            <div class="row"></div>
            <b-card-title>
              <h5 class="card-title text-center">{{ product.name }}</h5>
            </b-card-title>

            <p
                class="card-text h5 text-center">
              {{ product.price }}€</p>
          </b-card>
        </b-card-group>
      </div>
    </div>


  </Layout>
</template>

