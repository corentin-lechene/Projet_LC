<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {productData} from "@/data/data-products";


export default {

  name: "product-detail",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Detail du produit",

      productData,
      productDetail: -1,

      test() {
        return window.location.href;
      }
    }
  },
  created() {
    let id = parseInt(this.$route.query.id || 'error');
    this.productDetail = productData.filter(productData => productData.id === id);

    if (this.productDetail.length === 0) {
      this.productDetail = null;
      this.$router.push({name: 'InternetServerError'});
    }
  }
}
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>
    <div v-if="productDetail !== null" class="row">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <div class="product-detai-imgs">
                    <b-tabs pills vertical nav-wrapper-class="col-md-2 col-sm-3 col-4">
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="productDetail[0].img"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="productDetail[0].img"
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
                    <h4 class="mt-1 mb-3">{{ productDetail[0].name }}</h4>

                    <p class="text-muted float-left mr-3">
                      <span class="bx bx-star text-warning"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star ml-1"></span>
                    </p>
                    <p class="text-muted mb-4">( 0 utilisateurs ont acheté )</p>

                    <h6 class="text-success text-uppercase">{{ productDetail[0].discount }} Off</h6>
                    <h5 class="mb-4">
                      Prix :
                      <b>{{ productDetail[0].price }}€</b>
                    </h5>
                    <p class="text-muted mb-4">
                      {{ productDetail[0].description }}
                    </p>
                  </div>
                  <div class="text-left">
                    <button type="button" class="btn btn-primary waves-effect waves-light my-2 mr-2">
                      <i class="bx bx-cart me-2"></i> Ajouter au panier
                    </button>
                    <button type="button" class="btn btn-success waves-effect my-2 mx-2 waves-light">
                      <i class="bx bx-shopping-bag me-2"></i> Acheter maintenant
                    </button>
                  </div>
                </div>
              </div>

              <hr class="mt-3 pt-0">

              <div>
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
    </div>

    <div class="row mb-4">
      <div class="col-sm-12">
        <router-link
            tag="a"
            to="/lc-shop"
            class="btn text-muted d-none d-sm-inline-block btn-link"
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
              v-for="data in productData.slice(0,3)" :key="data.id" class="col-xl-4 col-sm-6">
            <div class="product-img position-relative">
              <div v-if="data.discount" class="avatar-sm product-ribbon">
                <span class="avatar-title rounded-circle bg-primary">-{{ data.discount }}%</span>
              </div>
              <router-link tag="a" :to="`/product-detail?id=${data.id}`">
                <img :src="`${data.img}`" alt class="img-fluid mx-auto d-block"/>
              </router-link>
            </div>
            <div class="row"></div>
            <b-card-title>
              <h5 class="card-title text-center">{{ data.name }}</h5>
            </b-card-title>

            <p
                class="card-text h5 text-center">
              {{ data.price }}€</p>
          </b-card>
        </b-card-group>
      </div>
    </div>


  </Layout>
</template>

