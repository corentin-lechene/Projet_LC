<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/page-header";

import {OffersData} from "@/data/data-offers";
import {productData} from "@/data/data-products";

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
      OffersData,
      productData,
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <!--Carousel -->
        <div class="row">
          <div class="card">
            <div class="card-body">
              <b-carousel controls>
                <b-carousel-slide :img-src="require('@/assets/images/slidersoldes.png')"></b-carousel-slide>
                <b-carousel-slide :img-src="require('@/assets/images/slidersoldes2.png')"></b-carousel-slide>
              </b-carousel>
            </div>
          </div>
        </div>

        <!-- Nouveautés -->
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
                  {{ data.price }}</p>
              </b-card>
            </b-card-group>
          </div>
        </div>

        <!-- Meilleures offres partenaires -->
        <div class="row">
          <div class="col-12">
            <h4 class="my-3">Meilleurs offres partenaires</h4>
            <b-card-group deck>
              <b-card
                  v-for="data in OffersData.slice(0,3)" :key="data.id" class="col-xl-4 col-sm-6">
                <div class="product-img position-relative">
                  <div v-if="data.discount" class="avatar-sm product-ribbon">
                    <span class="avatar-title rounded-circle bg-primary">-{{ data.discount }}%</span>
                  </div>
                  <router-link tag="a" :to="`/service-detail?id=${data.id}`">
                    <div style="height: 190px !important;">
                      <img :src="`${data.img}`" style="width: 100%; height: 100%;" alt class="img-fluid mx-auto d-block"/>
                    </div>
                  </router-link>
                </div>
                <div class="row" style="height: 10px"></div>
                <b-card-title>
                  <h5 class="card-title text-center">{{ data.name }}</h5>
                </b-card-title>

                <p
                    class="card-text h5 text-center">
                  {{ data.price }}</p>
              </b-card>
            </b-card-group>
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
                  <img src="@/assets/images/services/picto1.png" alt style="width: 100%; height: 100%;" class="img-fluid mx-auto d-block"/>
                </div>
                <div class="col-3" style="height: 130px !important;">
                  <img src="@/assets/images/services/picto2.png" alt style="width: 100%; height: 100%;" class="img-fluid mx-auto d-block"/>
                </div>
                <div class="col-3" style="height: 150px !important;">
                  <img src="@/assets/images/services/picto3.png" alt style="width: 100%; height: 100%;" class="img-fluid mx-auto d-block"/>
                </div>
                <div class="col-3" style="height: 130px !important;">
                  <img src="@/assets/images/services/picto4.png" alt style="width: 100%; height: 100%;" class="img-fluid mx-auto d-block"/>
                </div>
              </div>
            </div>
            <div class="col-4">
              <b-card
                  overlay
                  :img-src="require('@/assets/images/small/img-6.jpg')"
                  img-alt="Card Image"
                  text-variant="white"
              >
                <b-card-title>
                  <h5 class="card-title text-white">Card title</h5>
                </b-card-title>
                <b-card-text>
                  <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
  height: 400px !important;
}
</style>