<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import VueSlideBar from "vue-slide-bar";

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";


export default {
  page: {
    title: "Offers Partners",
  },
  components: {Layout, PageHeader, VueSlideBar},
  data() {
    return {
      title: "Offres partenaires",

      services: {},
      categoryServices: {},
      servicesData: {},
      loading: {
        categories: true,
        services: true,
      },

      sliderPriceMin: 0,
      sliderPriceMax: 1,

      dataFilterBy: {
        price: 1,
        note: 0,
      },
      filterBy: {
        name: [],
        value: [],
        reset() {
          this.name = [];
          this.value = [];
        }
      },
    }
  },
  methods: {
    getMaxPrice(data) {
      let prices = [];
      for (let i = 0; i < data.length; i++) {
        prices[i] = parseInt(data[i].price);
      }
      return Math.max(...prices) + 1;
    },
    getMinPrice(data) {
      let prices = [];
      for (let i = 0; i < data.length; i++) {
        prices[i] = parseInt(data[i].price);
      }
      return Math.min(...prices) + 1;
    },
    useFilter() {
      for (let i = 0; i < this.filterBy.name.length; ++i) {
        switch (this.filterBy.name[i]) {
          case 'category_id' :
            this.services = this.services.filter(services => parseInt(services[this.filterBy.name[i]]) === parseInt(this.filterBy.value[i]));
            break;
          case 'price' :
            this.services = this.services.filter(services => parseInt(services[this.filterBy.name[i]]) <= parseInt(this.filterBy.value[i]));
            if (this.filterBy.value[i] === this.getMaxPrice(this.servicesData)) {
              this.filterBy.name.splice(i, 1);
              this.filterBy.value.splice(i, 1);
            }
            break;
          case 'note' :
            this.services = this.services.filter(services => parseInt(services[this.filterBy.name[i]]) >= parseInt(this.filterBy.value[i]));
            if (this.filterBy.value[i] === 0) {
              this.filterBy.name.splice(i, 1);
              this.filterBy.value.splice(i, 1);
            }
            break;
          case 'sort':
            if (this.filterBy.value[i] === '<') {
              this.services = this.services.sort((a, b) => (parseInt(a.price) >= parseInt(b.price) ? 1 : -1));
            } else if (this.filterBy.value[i] === '>') {
              this.services = this.services.sort((a, b) => (parseInt(a.price) <= parseInt(b.price) ? 1 : -1));
            }
            break;
          default:
            break;
        }
      }
    },
    setFilterBy(category, value) {
      const index = this.filterBy.name.findIndex(element => element === category);
      switch (category) {
        case 'category_id':
        case 'price':
        case 'note':
          if (index === -1) {
            this.filterBy.name.push(category);
            this.filterBy.value.push(value);
          } else {
            this.filterBy.value[index] = value;
            this.services = this.servicesData;
          }
          break;
        case 'sort':
          if (index === -1) {
            this.filterBy.name.push(category);
            this.filterBy.value.push(value);
          } else {
            this.filterBy.value[index] = this.filterBy.value[index] === '<' ? '>' : '<';
            this.services = this.servicesData;
          }
          break;
        default:
          break;
      }
      this.useFilter();
    },
    resetFilter() {
      this.services = this.servicesData;
      this.filterBy.reset();
      this.sliderPriceMax = this.getMaxPrice(this.servicesData);
      this.sliderPriceMin = this.getMinPrice(this.servicesData);
      this.dataFilterBy.price = this.getMaxPrice(this.servicesData);
      this.dataFilterBy.note = 0;
    },
    init(services) {
      this.servicesData = services;
      this.sliderPriceMax = this.getMaxPrice(services);
      this.sliderPriceMin = this.getMinPrice(services);
      this.dataFilterBy.price = this.getMaxPrice(services);
    },

    getImgUrl(filename){
      try{
        return require(`@/assets/images/product/${filename}`)
      }catch(_){
        return require(`@/assets/images/product/no_img.png`)
      }
    },

    getServices() {
      let promise = sendGetDataTable('services');
      promise.then((res) => {
        if (!validRequest(res)) {
          this.services = res.result;
          setTimeout(() => {
            this.loading.services = false;
            this.init(res.result);
          }, 500);
        }
      })
    },
    getCategoriesServices() {
      let promise = sendGetDataTable('categories_services');
      promise.then((res) => {
        if (!validRequest(res)) {
          this.categoryServices = res.result;
          setTimeout(() => {
            this.loading.categories = false;
          }, 500);
        }
      })
    }
  },
  created() {
    this.getServices();
    this.getCategoriesServices();
  }
};
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>


    <div class="row">
      <div class="col-5 col-md-3">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title font-size-24">Filtrer des offres partenaires</h2>

            <!-- Filtre prix -->
            <div class="mt-4 py-3">
              <h4 class="card-title">Trie : </h4>
              <div class="row">
                <div class="col-md-12 col-xxl-5">
                  <b-dropdown
                      class="btn-block"
                      style="height: 100%"
                  >
                    <template v-slot:button-content>
                      Trié par ...
                      <i class="mdi mdi-chevron-down"></i>
                    </template>
                    <b-dropdown-item :value="0">Pertinence</b-dropdown-item>
                    <b-dropdown-item :value="1" @click="setFilterBy('sort', '<')">Prix croissant</b-dropdown-item>
                    <b-dropdown-item :value="2" @click="setFilterBy('sort', '>')">Prix décroissant</b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="col-md-12 col-xxl-7">
                  <b-button v-if="filterBy.name.length >= 2"
                            class="btn-block bg-danger"
                            style="width: 100%;height: 100%" @click="resetFilter()">Supprimer les filtres
                  </b-button>
                  <b-button v-else-if="filterBy.name.length === 1"
                            class="btn-block bg-danger"
                            style="width: 100%;height: 100%" @click="resetFilter()">Supprimer le filtre
                  </b-button>
                  <b-button v-else class="btn-block" disabled style="width: 100%;height: 100%" @click="resetFilter()">
                    Aucun filtre
                    ajouté
                  </b-button>
                </div>
              </div>
            </div>
            <!-- Fin Filtre prix -->

            <hr>

            <div class="mt-4 pt-3 pb-1">
              <h5 class="font-size-14">Nos catégories : </h5>
              <div v-if="loading.categories">
                <b-skeleton v-for="i in 4" :key="i"/>
              </div>
              <ul v-if="!loading.categories" class="list-unstyled product-list">
                <li v-for="(categoryService, i) in categoryServices" :key="i">
                  <a href="javascript: void(0);"
                     @click="setFilterBy('category_id', categoryService.category_service_id)">
                    <i class="mdi mdi-chevron-right mr-1"></i> {{ categoryService.title }}
                  </a>
                </li>
              </ul>
            </div>

            <hr>

            <!-- Slider du prix -->
            <div class="mt-4 py-3">
              <h5 class="font-size-14 pb-2">Prix : </h5>
              <b-skeleton v-if="loading.services"/>
              <vue-slide-bar v-if="!loading.services" v-model="dataFilterBy.price" :max="sliderPriceMax" :min="sliderPriceMin" class="pt-4"
                             @input="setFilterBy('price', dataFilterBy.price)"/>
            </div>
            <!-- fin Slider du prix -->

            <hr>

            <!-- Note des users -->
            <div class="mt-4 pt-3">
              <h5 class="font-size-14 mb-3">Note :</h5>
              <div>
                <b-form-checkbox v-for="i in 5" :key="i"
                                 v-model="dataFilterBy.note"
                                 :unchecked-value="0"
                                 :value="i"
                                 @input="setFilterBy('note',  dataFilterBy.note)"
                >
                  {{ i }}
                  <i class="bx bx-star text-warning"></i> & plus
                </b-form-checkbox>
              </div>
            </div>
            <!-- fin Note des users -->
          </div>
        </div>
      </div>

      <div class="col-7 col-md-9">
        <div class="row">

          <div v-if="servicesData.length === 0">
            Aucune offre trouvé
          </div>
          <div v-for="service in services " :key="service.service_id" class="col-sm-12 col-md-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="product-img position-relative">
                  <b-skeleton-img v-if="loading.services"/>
                  <div v-if="service.reduction" class="avatar-sm product-ribbon">
                    <span v-if="!loading.services" class="avatar-title rounded-circle bg-primary">-{{ service.reduction }}%</span>
                  </div>
                  <router-link :to="`/service-detail?id=${service.service_id}`" tag="a">
                    <b-img v-if="service.image && !loading.services" :src="getImgUrl(service.image)" fluid alt="img" />
                  </router-link>
                </div>
                <div class="mt-4 text-center">
                  <h5 class="mb-3 text-truncate">
                    <b-skeleton v-if="loading.services"/>
                    <router-link v-if="!loading.services" :to="`/service-detail?id=${service.service_id}`" class="text-dark" tag="a"
                    >{{ service.name }}
                    </router-link>
                  </h5>

                  <!--                  <div>-->
                  <!--                    <p class="text-muted">-->
                  <!--                      <i v-for="i in 5" :key="i">-->
                  <!--                        <span v-if="service.note >= i" class="bx bx-star text-warning"></span>-->
                  <!--                        <span v-else class="bx bx-star"></span>-->
                  <!--                      </i>-->
                  <!--                    </p>-->
                  <!--                  </div>-->

                  <b-skeleton v-if="loading.services"/>
                  <h5 class="my-0">
                    <span class="text-muted mr-2">
                      <del v-if="service.reduction && !loading.services">{{ service.price }} €</del>
                      <b v-else-if="!loading.services">{{ service.price }} €</b>
                    </span>
                    <b v-if="service.reduction && !loading.services">{{ (service.price - ((service.price * service.reduction) / 100)).toFixed(2) }}
                      €</b>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>