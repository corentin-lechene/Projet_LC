<script>

import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";


export default {

  name: "service-detail",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Detail du service",

      serviceDetail: -1,
      services: {},
      loading: true,
    }
  },
  methods: {
    makeToast() {
      this.$bvToast.toast('Le service a été ajouté au panier avec succès', {
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
        if (!validRequest(res)) {
          console.log("ici", res);
          this.serviceDetail = res.result;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      })
    },
    getServices() {
      let promise = sendGetDataTable('services');
      promise.then((res) => {
        if (!validRequest(res)) {
          this.services = res.result; //affiche un seul
          setTimeout(() => {
            this.loading = false;
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
    <PageHeader :title="title"/>
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
                    <h4 class="mt-1 mb-3">{{ serviceDetail.name }}</h4>

                    <p class="text-muted float-left mr-3">
                      <span class="bx bx-star text-warning"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star text-warning ml-1"></span>
                      <span class="bx bx-star ml-1"></span>
                    </p>
                    <p class="text-muted mb-4">( 0 utilisateurs ont acheté )</p>

                    <h6 class="text-success text-uppercase">{{ serviceDetail.reduction }} Off</h6>
                    <h5 class="mb-4">
                      Prix :
                      <b>{{ serviceDetail.price }}€</b>
                    </h5>
                    <p class="text-muted mb-4">
                      {{ serviceDetail.description }}
                    </p>
                  </div>
                  <div class="text-left">
                    <button class="btn btn-primary waves-effect waves-light my-2 mr-2" type="button"
                            @click="makeToast()">
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
              <router-link :to="`/service-detail?id=${service.id}`" tag="a">
                <img :src="`${service.image}`" alt class="img-fluid mx-auto d-block"/>
              </router-link>
            </div>
            <div class="row"></div>
            <b-card-title>
              <h5 class="card-title text-center">{{ service.name }}</h5>
            </b-card-title>

            <p
                class="card-text h5 text-center">
              {{ service.price }}€</p>
          </b-card>
        </b-card-group>
      </div>
    </div>


  </Layout>
</template>

