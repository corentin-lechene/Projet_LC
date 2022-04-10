<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {sendGetDataTable, sendInsertTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";


export default {

  name: "service-detail",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Detail du service",

      serviceDetail: -1,
      services: {},
      loading: {
        serviceDetail: true,
        services: true,
      },
      CUSTOMER_ID: 39,
    }
  },
  methods: {
    addToCart() {
      let promise = sendInsertTable('carts_services', {
        customer_id: this.CUSTOMER_ID,
        quantity: 1,
        service_id: this.serviceDetail.service_id
      });
      promise.then((res) => {
        if(!validRequest(res)) {
          this.makeToast();
        }
      });
    },
    makeToast() {
      this.$bvToast.toast('Service ajouté avec succès', {
        variant: 'success',
        noCloseButton: true,
        autoHideDelay: 5000
      })
    },
    getServiceById() {
      let id = parseInt(this.$route.query.id || -1);
      if (isNaN(id) || id === -1) {
        this.serviceDetail = -1;
        this.$router.push({name: 'InternetServerError'});
      }

      let promise = sendGetDataTable('services', id);
      promise.then((res) => {
        if (!validRequest(res) && res.result !== undefined) {
          this.serviceDetail = res.result;
          setTimeout(() => {
            this.loading.serviceDetail = false;
          }, 500);
        } else {
          this.serviceDetail = -1;
          this.$router.push({name: 'InternetServerError'});
        }
      })
    },
    getServices() {
      let promise = sendGetDataTable('services');
      promise.then((res) => {
        if (!validRequest(res)) {
          this.services = res.result;
          setTimeout(() => {
            this.loading.services = false;
          }, 500);
        }
      })
    },
  },
  mounted() {
    this.getServiceById();
    this.getServices();
  }
}
</script>


<template>
  <Layout>
    <PageHeader id="service" :title="title"/>
    <div v-if="serviceDetail !== -1" class="row">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <div class="product-detai-imgs">
                    <b-tabs nav-wrapper-class="col-md-2 col-sm-3 col-4" pills vertical>
                      <b-tab>
                        <b-skeleton-img v-if="loading.serviceDetail" />
                        <template v-slot:title>
                          <b-img v-if="!loading.serviceDetail"
                                 :src="require(`@/assets/images/product/${serviceDetail.image}`)" alt="img" fluid/>
                        </template>
                        <div class="product-img">
                          <b-img v-if="!loading.serviceDetail"
                                 :src="require(`@/assets/images/product/${serviceDetail.image}`)" alt="img" fluid/>
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <b-img v-if="!loading.serviceDetail"
                                 :src="require(`@/assets/images/product/${serviceDetail.image}`)" alt="img" fluid/>
                        </template>
                        <div class="product-img">
                          <b-img v-if="!loading.serviceDetail"
                                 :src="require(`@/assets/images/product/${serviceDetail.image}`)" alt="img" fluid/>
                        </div>
                      </b-tab>
                      <b-tab>
                        <template v-slot:title>
                          <img
                              :src="serviceDetail.image"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                          />
                        </template>
                        <div class="product-img">
                          <img
                              :src="serviceDetail.image"
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
                    <b-skeleton v-if="loading.serviceDetail" />
                    <h4 v-if="!loading.serviceDetail" class="mt-1 mb-3">{{ serviceDetail.name }}</h4>

                    <p v-if="!loading.serviceDetail" class="text-muted float-left mr-3">
                      <span class="bx bx-star text-warning"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star ml-1"></span>
                    </p>
                    <p class="text-muted mb-4">( 0 utilisateurs ont acheté )</p>

                    <b-skeleton v-if="loading.serviceDetail" />
                    <h6 v-if="!loading.serviceDetail" class="text-success text-uppercase">{{ serviceDetail.reduction }} Off</h6>
                    <h5 v-if="!loading.serviceDetail" class="mb-4">
                      Prix :
                      <b>{{ serviceDetail.price }}€</b>
                    </h5>
                    <p class="text-muted mb-4">
                      {{ serviceDetail.description }}
                    </p>
                  </div>
                  <div class="text-left">
                    <button class="btn btn-primary waves-effect waves-light my-2 mr-2" type="button"
                            @click="addToCart()" :disabled="loading.serviceDetail">
                      <i class="bx bx-cart me-2"></i> Ajouter au panier
                    </button>
                    <button class="btn btn-success waves-effect my-2 mx-2 waves-light" type="button" :disabled="loading.serviceDetail">
                      <i class="bx bx-shopping-bag me-2"></i> Acheter maintenant
                    </button>
                  </div>
                </div>
              </div>

              <hr class="mt-3 pt-0">

              <b-skeleton-table v-if="loading.serviceDetail" :rows="5" :columns="3"/>
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
            to="/offers-partners"
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
              v-for="service in services" :key="service.id" class="col-xl-4 col-sm-6">
            <div class="product-img position-relative">
              <div v-if="service.reduction" class="avatar-sm product-ribbon">
                <span class="avatar-title rounded-circle bg-primary">-{{ service.reduction }}%</span>
              </div>
              <a v-if="serviceDetail.service_id !== service.service_id" :href="`/product-detail?id=${service.service_id}`">
<!--                <b-img :src="require(`@/assets/images/services/${service.image}`)" alt="img" fluid/>-->
              </a>
              <a v-else href="#service">
<!--                <b-img :src="require(`@/assets/images/services/${service.image}`)" alt="img" fluid/>-->
              </a>
            </div>
            <div class="row"></div>
            <b-card-title>
              <b-skeleton v-if="loading.services" />
              <h5 class="card-title text-center">{{ service.name }}</h5>
            </b-card-title>

            <b-skeleton v-if="loading.services" />
            <p
                class="card-text h5 text-center">
              {{ service.price }}€</p>
          </b-card>
        </b-card-group>
      </div>
    </div>


  </Layout>
</template>

