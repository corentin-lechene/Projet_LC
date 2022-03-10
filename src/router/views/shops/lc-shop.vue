<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import VueSlideBar from "vue-slide-bar";

import {categoryGoodsData} from "@/data/data-category-goods";
import {productData} from "@/data/data-products";

export default {
  page: {
    title: "Orders",
  },
  components: {Layout, PageHeader, VueSlideBar},
  data() {
    return {
      title: "Produits",
      categoryGoodsData,
      productData,
      sliderPriceMax: this.getMaxPrice(productData),
      sliderPriceMin: this.getMinPrice(productData),
      dataFilterBy: {
        price: this.getMaxPrice(productData),
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
      debug: null,
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
            this.productData = this.productData.filter(productData => parseInt(productData[this.filterBy.name[i]]) === parseInt(this.filterBy.value[i]));
            break;
          case 'price' :
            this.productData = this.productData.filter(productData => parseInt(productData[this.filterBy.name[i]]) <= parseInt(this.filterBy.value[i]));
            if (this.filterBy.value[i] === this.getMaxPrice(productData)) {
              this.filterBy.name.splice(i, 1);
              this.filterBy.value.splice(i, 1);
            }
            break;
          case 'note' :
            this.productData = this.productData.filter(productData => parseInt(productData[this.filterBy.name[i]]) >= parseInt(this.filterBy.value[i]));
            if (this.filterBy.value[i] === 0) {
              this.filterBy.name.splice(i, 1);
              this.filterBy.value.splice(i, 1);
            }
            break;
          case 'sort':
            if (this.filterBy.value[i] === '<') {
              this.productData = this.productData.sort((a, b) => (parseInt(a.price) >= parseInt(b.price) ? 1 : -1));
            } else if (this.filterBy.value[i] === '>') {
              this.productData = this.productData.sort((a, b) => (parseInt(a.price) <= parseInt(b.price) ? 1 : -1));
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
            this.productData = productData;
          }
          break;
        case 'sort':
          if (index === -1) {
            this.filterBy.name.push(category);
            this.filterBy.value.push(value);
          } else {
            this.filterBy.value[index] = this.filterBy.value[index] === '<' ? '>' : '<';
            this.productData = productData;
          }
          break;
        default:
          break;
      }
      this.useFilter();
    },
    resetFilter() {
      this.productData = [];
      this.productData = productData;
      this.filterBy.reset();
      this.sliderPriceMax = this.getMaxPrice(this.productData);
      this.sliderPriceMin = this.getMinPrice(this.productData);
      this.dataFilterBy.price = this.getMaxPrice(productData);
      this.dataFilterBy.note = 0;
    },
  },
};
</script>


<template>
  <Layout mode="horizontal">
    <PageHeader :title="title"/>

    <div class="row">
      <div class="col-5 col-md-3">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title font-size-24">Filtrer les produits</h2>

            <!-- Filtre prix -->
            <div class="mt-4 py-3">
              <h4 class="card-title">Trie : </h4>
              <div class="row">
                <div class="col-md-12 col-xxl-5"> <!--ici -->
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
                <div class="col-md-12 col-xxl-7"> <!--ici-->
                  <b-button v-if="filterBy.name.length >= 2"
                            class="btn-block bg-danger"
                            @click="resetFilter()" style="width: 100%;height: 100%">Supprimer les filtres
                  </b-button>
                  <b-button v-else-if="filterBy.name.length === 1"
                            class="btn-block bg-danger"
                            @click="resetFilter()" style="width: 100%;height: 100%">Supprimer le filtre
                  </b-button>
                  <b-button v-else class="btn-block" @click="resetFilter()" disabled style="width: 100%;height: 100%">Aucun filtre
                    ajouté
                  </b-button>
                </div>
              </div>
            </div>
            <!-- Fin Filtre prix -->

            <hr>

            <div class="mt-4 pt-3 pb-1">
              <h5 class="font-size-14">Périphériques : </h5>
              <ul class="list-unstyled product-list">
                <li v-for="categoryGood in categoryGoodsData" :key="categoryGood.id">
                  <a href="javascript: void(0);" @click="setFilterBy('category_id', categoryGood.id)">
                    <i class="mdi mdi-chevron-right mr-1"></i> {{ categoryGood.title }}
                  </a>
                </li>
              </ul>
            </div>

            <hr>

            <!-- Slider du prix -->
            <div class="mt-4 py-3">
              <h5 class="font-size-14 pb-2">Prix : </h5>
              <vue-slide-bar class="pt-4" v-model="dataFilterBy.price" :min="sliderPriceMin" :max="sliderPriceMax"
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
                                 :value="i"
                                 :unchecked-value="0"
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

          <div v-if="productData.length === 0">
            Aucun produit trouvé
          </div>
          <div v-for="product in productData" :key="product.id" class="col-sm-12 col-md-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="product-img position-relative">
                  <div v-if="product.discount" class="avatar-sm product-ribbon">
                    <span class="avatar-title rounded-circle bg-primary">-{{ product.discount }}%</span>
                  </div>
                  <router-link tag="a" :to="`/product-detail?id=${product.id}`">
                    <img :src="`${product.img}`" alt class="img-fluid mx-auto d-block"/>
                  </router-link>
                </div>
                <div class="mt-4 text-center">
                  <h5 class="mb-3 text-truncate">
                    <router-link tag="a" class="text-dark" :to="`/product-detail?id=${product.id}`"
                    >{{ product.name }}
                    </router-link>
                  </h5>

                  <div>
                    <p class="text-muted">
                      <i v-for="i in 5" :key="i">
                        <span v-if="product.note >= i" class="bx bx-star text-warning"></span>
                        <span v-else class="bx bx-star"></span>
                      </i>
                    </p>
                  </div>

                  <h5 class="my-0">
                    <b>{{ product.price }}€</b>
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