<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {sendGetDataTable, sendGetUserByToken, sendInsertTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";


export default {

  name: "product-detail",
  components: {Layout, PageHeader},
  data() {
    return {
      user: null,

      title: "Detail du produit",
      loading: {
        productDetail: true,
        products: true
      },

      productDetail: -1,
      products: {},
    }
  },
  methods: {
    addToCart() {
      if(this.user.role === "customers") {
        let promise = sendInsertTable('carts_goods', {
          customer_id: this.user.customer_id,
          quantity: 1,
          good_id: this.productDetail.good_id
        });

        promise.then((res) => {
          console.log(res);
          if (!validRequest(res)) {
            this.makeToast();
          }
        });
      } else {
        this.$bvToast.toast('Erreur, Vous devez être connecté', {
          variant: 'warning',
          noCloseButton: true,
          autoHideDelay: 5000
        })
      }
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
      if (isNaN(id) || id === -1) {
        this.productDetail = -1;
        this.$router.push({name: 'InternetServerError'});
      }

      let promise = sendGetDataTable('goods', id);
      promise.then((res) => {
        if (!validRequest(res) && res.result !== undefined) {
          this.productDetail = res.result;
          setTimeout(() => {
            this.loading.productDetail = false;
          }, 750);
        } else {
          this.serviceDetail = -1;
          this.$router.push({name: 'InternetServerError'});
        }
      })
    },
    getGoods() {
      let promise = sendGetDataTable('goods-online');
      promise.then((res) => {
        if (!validRequest(res) && res.result !== undefined) {
          this.products = res.result.slice(0, 3);
          setTimeout(() => {
            this.loading.products = false;
          }, 750);
        }
      })
    },
  },
  mounted() {
    this.getGoodsById();
    this.getGoods();
  },
  async created() {
    this.user = await sendGetUserByToken();
    if(!validRequest(this.user)) {
      this.user = this.user.result;
    } else {
      this.user = null;
    }
  }
}
</script>


<template>
  <Layout>
    <PageHeader id="product" :title="title"/>
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
                        <b-skeleton-img v-if="loading.productDetail"/>
                        <template v-slot:title>
                          <b-img v-if="!loading.productDetail"
                                 :src="require(`@/assets/images/product/${productDetail.image}`)" alt="img" fluid/>
                        </template>
                        <div class="product-img">
                          <b-img v-if="!loading.productDetail"
                                 :src="require(`@/assets/images/product/${productDetail.image}`)" alt="img" fluid/>
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <b-img v-if="!loading.productDetail"
                                 :src="require(`@/assets/images/product/${productDetail.image}`)" alt="img" fluid/>
                        </template>
                        <div class="product-img">
                          <b-img v-if="!loading.productDetail"
                                 :src="require(`@/assets/images/product/${productDetail.image}`)" alt="img" fluid/>
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
                    <b-skeleton v-if="loading.productDetail"/>
                    <h4 v-if="!loading.productDetail" class="mt-1 mb-3">{{ productDetail.name }}</h4>

                    <!--                    <b-skeleton v-if="loading.productDetail" />
                                        <p class="text-muted float-left mr-3">
                                          <span class="bx bx-star text-warning"></span>
                                          <span class="bx bx-star text-warning ml-1"></span>
                                          <span class="bx bx-star text-warning ml-1"></span>
                                          <span class="bx bx-star text-warning ml-1"></span>
                                          <span class="bx bx-star ml-1"></span>
                                        </p>
                                        <p class="text-muted mb-4">( 0 utilisateurs ont acheté )</p>-->

                    <h6 v-if="productDetail.reduction && !loading.productDetail" class="text-success text-uppercase">
                      {{ productDetail.reduction }} %</h6>
                    <h5 v-if="!loading.productDetail" class="mb-4">
                      Prix :
                      <b v-if="!loading.productDetail">{{ productDetail.price }}€</b>
                    </h5>
                    <b-skeleton v-if="loading.productDetail"/>
                    <b-skeleton v-if="loading.productDetail"/>
                    <b-skeleton v-if="loading.productDetail"/>
                    <b-skeleton v-if="loading.productDetail" width="80%"/>
                    <p v-if="!loading.productDetail"
                       class="text-muted mb-4">
                      {{ productDetail.description }}
                    </p>
                  </div>
                  <div class="text-left">
                    <b-button v-if="productDetail.totalStock <= 0" variant="info" class="my-2 mx-2" style="width: 200px" disabled>Stock épuisé</b-button>
                    <b-button v-else-if="loading.products || user === null || user.role !== 'customers'" variant="info" class="my-2 mx-2" style="width: 200px" disabled>Vous devez être connecté</b-button>
                    <b-button v-else variant="info" class="my-2 mx-2" style="width: 200px" @click="addToCart()"> <i class="bx bx-cart me-2"></i> Ajouter au panier</b-button>

                    <b-button v-if="productDetail.totalStock <= 0" variant="success" class="my-2 mx-2" style="width: 200px" disabled>Stock épuisé</b-button>
                    <b-button v-else-if="loading.products || user === null || user.role !== 'customers'" variant="success" class="my-2 mx-2" style="width: 200px" disabled>Vous devez être connecté</b-button>
                    <b-button v-else variant="success" class="my-2 mx-2" style="width: 200px" @click="addToCart()"> <i class="bx bx-shopping-bag me-2"></i> Acheter maintenant</b-button>
                  </div>
                </div>
              </div>

              <hr class="mt-3 pt-0">

              <div class="card-body">
                <div>
                  <h5 class="mb-3">Specifications :</h5>

                  <b-skeleton-table v-if="loading.productDetail" :columns="3" :rows="5"/>
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
              v-for="product in products" :key="product.good_id" class="col-xl-4 col-sm-6">
            <div class="product-img position-relative">
              <div v-if="product.reduction" class="avatar-sm product-ribbon">
                <span class="avatar-title rounded-circle bg-primary">-{{ product.reduction }}%</span>
              </div>
              <b-skeleton-img v-if="loading.products"/>
              <a v-if="productDetail.good_id !== product.good_id" :href="`/product-detail?id=${product.good_id}`">
                <b-img :src="require(`@/assets/images/product/${product.image}`)" alt="img" fluid/>
              </a>
              <a v-else href="#product">
                <b-img :src="require(`@/assets/images/product/${product.image}`)" alt="img" fluid/>
              </a>
            </div>
            <div class="row"></div>
            <b-card-title>
              <b-skeleton v-if="loading.products"/>
              <h5 class="card-title text-center">{{ product.name }}</h5>
            </b-card-title>

            <b-skeleton v-if="loading.products"/>
            <p
                class="card-text h5 text-center">
              {{ product.price }}€</p>
          </b-card>
        </b-card-group>
      </div>
    </div>


  </Layout>
</template>

