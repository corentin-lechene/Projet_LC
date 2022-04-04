<script>

import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";


import {sendGetDataTable} from "@/components/requests-bdd";
import {preventingErrorSQL, validRequest} from "@/components/my-functions";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Accueil",
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Accueil",
      products: {},
      services: {},
      loading: {
        products: true,
        services: true,
        slider: true,
      },
    };
  },
  methods: {
    getGoods() {
      let promise = sendGetDataTable('goods');
      promise.then((res) => {
        if(!preventingErrorSQL(res)) {
          if (!validRequest(res)) {
            this.products = res.result.slice(0, 3);
            setTimeout(() => {
              this.loading.products = false;
            }, 750);
          }
        }
      })
    },
    getServices() {
      let promise = sendGetDataTable('services');
      promise.then((res) => {
        if (!validRequest(res)) {
          this.services = res.result.slice(0, 3);
          setTimeout(() => {
            this.loading.services = false;
          }, 750);
        }
      })
    },
  },
  mounted() {
    this.getGoods();
    this.getServices();
    setTimeout(() => {this.loading.slider = false}, 750);
  },
  created() {
    if (this.$route.params.notification) {
      this.$bvToast.toast(this.$route.params.notification.message, {
        variant: this.$route.params.notification.variant,
        toaster: 'b-toaster-top-center',
        noCloseButton: true,
        autoHideDelay: 5000
      })
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <b-carousel controls>
              <b-skeleton-img v-if="loading.slider"/>
              <b-carousel-slide v-if="!loading.slider" :img-src="require('@/assets/images/slidersoldes.png')"></b-carousel-slide>
              <b-carousel-slide v-if="!loading.slider" :img-src="require('@/assets/images/slidersoldes2.png')"></b-carousel-slide>
            </b-carousel>
          </div>
        </div>
      </div>
    </div>

    <!-- Nouveautés -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="my-3">Nos nouveautés</h4>
            <b-card-group deck>
              <b-card
                  v-for="product in products" :key="product.good_id" class="col-xl-4 col-sm-6">
                <div class="product-img position-relative">
                  <div v-if="product.reduction" class="avatar-sm product-ribbon">
                    <span v-if="!loading.products" class="avatar-title rounded-circle bg-primary">-{{ product.reduction }}%</span>
                  </div>
                  <router-link tag="a" :to="`/product-detail?id=${product.good_id}`">
                    <b-skeleton-img v-if="loading.products"/>
                    <b-img :src="require(`@/assets/images/product/${product.image}`)" fluid alt="img" />
                  </router-link>
                </div>
                <div class="row"></div>
                <b-skeleton v-if="loading.products" />
                <b-card-title>
                  <h5 v-if="!loading.products" class="card-title text-center">{{ product.name }}</h5>
                </b-card-title>

                <b-skeleton v-if="loading.products" />
                <p v-if="!loading.products"
                    class="card-text h5 text-center">
                  {{ product.price }}€</p>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>

    <!-- Meilleures offres partenaires -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="my-3">Meilleurs offres partenaires</h4>
            <b-card-group deck>
              <b-card
                  v-for="service in services" :key="service.service_id" class="col-xl-4 col-sm-6">
                <div class="product-img position-relative">
                  <div v-if="service.reduction" class="avatar-sm product-ribbon">
                    <span v-if="!loading.services" class="avatar-title rounded-circle bg-primary">-{{ service.reduction }}%</span>
                  </div>
                  <router-link tag="a" :to="`/service-detail?id=${service.service_id}`">
                    <div style="height: 190px !important;">
                      <b-skeleton-img v-if="loading.services"/>
                      <img v-if="!loading.services" :src="`${service.image}`" style="width: 100%; height: 100%;" alt
                           class="img-fluid mx-auto d-block"/>
                    </div>
                  </router-link>
                </div>
                <div class="row" style="height: 10px"></div>
                <b-card-title>
                  <b-skeleton v-if="loading.services" />
                  <h5 v-if="!loading.services" class="card-title text-center">{{ service.name }}</h5>
                </b-card-title>

                <b-skeleton v-if="loading.services" />
                <b-skeleton v-if="loading.services" />
                <p v-if="!loading.services"
                    class="card-text h5 text-center">
                  {{ service.price }}</p>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="height: 15px; border-color: lightgray;border-bottom: solid 0.1em;"></div>
    <div class="row" style="height: 15px;"></div>

    <!-- Nos meilleurs partenaires  -->
    <div class="row">
      <div class="row" style="height: 10px;width: 100%;"></div>
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col-10">
              <div class="row" style="height: 10px"></div>
              <h2 style="text-align: center">NOS MEILLEURS PARTENAIRES</h2>
            </div>
            <div class="col-2" style="padding-top: 8px;">
              <b-button pill variant="light">Voir +</b-button>
            </div>
          </div>
          <div class="row" style="height: 20px"></div>
          <div class="row">
            <div class="col-3" style="height: 130px !important;">
              <img src="@/assets/images/services/picto1.png" alt style="width: 100%; height: 100%;"
                   class="img-fluid mx-auto d-block"/>
            </div>
            <div class="col-3" style="height: 130px !important;">
              <img src="@/assets/images/services/picto2.png" alt style="width: 100%; height: 100%;"
                   class="img-fluid mx-auto d-block"/>
            </div>
            <div class="col-3" style="height: 150px !important;">
              <img src="@/assets/images/services/picto3.png" alt style="width: 100%; height: 100%;"
                   class="img-fluid mx-auto d-block"/>
            </div>
            <div class="col-3" style="height: 130px !important;">
              <img src="@/assets/images/services/picto4.png" alt style="width: 100%; height: 100%;"
                   class="img-fluid mx-auto d-block"/>
            </div>
          </div>
        </div>
        <div class="col-4">
          <b-card
              overlay
              img-src="#"
              img-alt="Card Image"
              text-variant="white"
          >
            <b-card-title>
              <h5 class="card-title text-white">Card title</h5>
            </b-card-title>
            <b-card-text>
              <p>This is a wider card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.</p>
              <p>
                <small class="text-white">Last updated 3 mins ago</small>
              </p>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>

    <div class="row" style="height: 50px"></div>
  </Layout>
</template>


<style>
.carousel-item img {
  width: 100% !important;
  height: 400px !important;
}
</style>