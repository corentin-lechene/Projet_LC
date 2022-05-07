<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import VueSlideBar from "vue-slide-bar";

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  page: {
    title: "Orders",
  },
  components: {Layout, PageHeader, VueSlideBar},
  data() {
    return {
      productsData: {},
      products: {},
      categoryGoods: {},
      loading: {
        categories: true,
        products: true,
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
            this.products = this.products.filter(products => parseInt(products[this.filterBy.name[i]]) === parseInt(this.filterBy.value[i]));
            break;
          case 'price' :
            this.products = this.products.filter(products => parseInt(products[this.filterBy.name[i]]) <= parseInt(this.filterBy.value[i]));
            if (this.filterBy.value[i] === this.getMaxPrice(this.productsData)) {
              this.filterBy.name.splice(i, 1);
              this.filterBy.value.splice(i, 1);
            }
            break;
          case 'note' :
            this.products = this.products.filter(products => parseInt(products[this.filterBy.name[i]]) >= parseInt(this.filterBy.value[i]));
            if (this.filterBy.value[i] === 0) {
              this.filterBy.name.splice(i, 1);
              this.filterBy.value.splice(i, 1);
            }
            break;
          case 'sort':
            if (this.filterBy.value[i] === '<') {
              this.products = this.products.sort((a, b) => (parseInt(a.price) >= parseInt(b.price) ? 1 : -1));
            } else if (this.filterBy.value[i] === '>') {
              this.products = this.products.sort((a, b) => (parseInt(a.price) <= parseInt(b.price) ? 1 : -1));
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
            this.products = this.productsData;
          }
          break;
        case 'sort':
          if (index === -1) {
            this.filterBy.name.push(category);
            this.filterBy.value.push(value);
          } else {
            this.filterBy.value[index] = this.filterBy.value[index] === '<' ? '>' : '<';
            this.products = this.productsData;
          }
          break;
        default:
          break;
      }
      this.useFilter();
    },
    resetFilter() {
      this.products = this.productsData;
      this.filterBy.reset();
      this.sliderPriceMax = this.getMaxPrice(this.productsData);
      this.sliderPriceMin = this.getMinPrice(this.productsData);
      this.dataFilterBy.price = this.getMaxPrice(this.productsData);
      this.dataFilterBy.note = 0;
    },
    init(products) {
      this.productsData = products;
      this.sliderPriceMax = this.getMaxPrice(products);
      this.sliderPriceMin = this.getMinPrice(products);
      this.dataFilterBy.price = this.getMaxPrice(products);
    },

    getImgUrl(filename){
      try{
        return require(`@/assets/images/product/${filename}`)
      }catch(_){
        return require(`@/assets/images/product/no_img.png`)
      }
    },

    getGoods() {
      let promise = sendGetDataTable('goods-online');
      promise.then((res) => {
        console.log("res: ", res);
        if (!validRequest(res) && res.result !== undefined) {
          this.products = res.result;
          setTimeout(() => {
            this.loading.products = false;
            this.init(res.result);
          }, 500);
        }
      })
    },
    getCategoriesGoods() {
      let promise = sendGetDataTable('categories_goods');
      promise.then((res) => {
        if (!validRequest(res) && res.result !== undefined) {
          this.categoryGoods = res.result;
          setTimeout(() => {
            this.loading.categories = false;
          }, 500);
        }
      })
    }
  },
  created() {
    this.getGoods();
    this.getCategoriesGoods();
  }
}
</script>


<template>
  <Layout mode="horizontal">
    <PageHeader :title="$t('shops.title.goods') || 'Boutique des biens'"/>

    <div class="row">
      <div class="col-5 col-md-3">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title font-size-24">{{ $t('shops.filter.title.goods') }}</h2>

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
                      {{ $t('shops.filter.sort-by.text') }} ...
                      <i class="mdi mdi-chevron-down"></i>
                    </template>
                    <b-dropdown-item :value="0">{{ $t('shops.filter.sort-by.relevance') }}</b-dropdown-item>
                    <b-dropdown-item :value="1" @click="setFilterBy('sort', '<')">{{ $t('shops.filter.sort-by.asc') }}</b-dropdown-item>
                    <b-dropdown-item :value="2" @click="setFilterBy('sort', '>')">{{ $t('shops.filter.sort-by.desc') }}t</b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="col-md-12 col-xxl-7"> <!--ici-->
                  <b-button v-if="filterBy.name.length >= 2"
                            class="btn-block bg-danger"
                            style="width: 100%;height: 100%" @click="resetFilter()">{{ $t('shops.filter.reset.filters') }}
                  </b-button>
                  <b-button v-else-if="filterBy.name.length === 1"
                            class="btn-block bg-danger"
                            style="width: 100%;height: 100%" @click="resetFilter()">{{ $t('shops.filter.reset.filter') }}
                  </b-button>
                  <b-button v-else class="btn-block" disabled style="width: 100%;height: 100%" @click="resetFilter()">
                    {{ $t('shops.filter.reset.none') }}
                  </b-button>
                </div>
              </div>
            </div>
            <!-- Fin Filtre prix -->

            <hr>

            <div class="mt-4 pt-3 pb-1">
              <h5 class="font-size-14">{{ $t('shops.filter.categories') }} : </h5>
              <div v-if="loading.categories">
                <b-skeleton v-for="i in 4" :key="i"/>
              </div>
              <ul v-if="!loading.products" class="list-unstyled product-list">
                <li v-for="(categoryGood, i) in categoryGoods" :key="i">
                  <a href="javascript: void(0);" @click="setFilterBy('category_id', categoryGood.category_id)">
                    <i class="mdi mdi-chevron-right mr-1"></i> {{ categoryGood.title }}
                  </a>
                </li>
              </ul>
            </div>

            <hr>

            <!-- Slider du prix -->
            <div class="mt-4 py-3">
              <h5 class="font-size-14 pb-2">{{ $t('g.price') }} : </h5>
              <b-skeleton v-if="loading.products"/>
              <vue-slide-bar v-if="!loading.products" v-model="dataFilterBy.price" :max="sliderPriceMax" :min="sliderPriceMin" class="pt-4"
                             @input="setFilterBy('price', dataFilterBy.price)"/>
            </div>
            <!-- fin Slider du prix -->

            <hr>

            <!-- Note des users -->
<!--            <div class="mt-4 pt-3">
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
            </div>-->
            <!-- fin Note des users -->
          </div>
        </div>
      </div>

      <div class="col-7 col-md-9">
        <div class="row">

          <div v-if="products.length === 0">
            Aucun produit trouvé
          </div>
          <div v-for="product in products" :key="product.good_id" class="col-sm-12 col-md-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="product-img position-relative">
                  <b-skeleton-img v-if="loading.products"/>
                  <div v-if="product.reduction" class="avatar-sm product-ribbon">
                    <span v-if="!loading.products" class="avatar-title rounded-circle bg-primary">-{{ product.reduction }}%</span>
                  </div>
                  <router-link :to="`/product-detail?id=${product.good_id}`" tag="a">
                    <b-img v-if="!loading.products" id="img-product" :src="getImgUrl(product.image)" fluid alt="img"/>
                  </router-link>
                </div>
                <div class="mt-4 text-center">
                  <h5 class="mb-3 text-truncate">
                    <b-skeleton v-if="loading.products"/>
                    <router-link v-if="!loading.products" :to="`/product-detail?id=${product.good_id}`" class="text-dark" tag="a" >{{ product.name }}</router-link>
                  </h5>

                  <!--                  <div>-->
                  <!--                    <p class="text-muted">-->
                  <!--                      <i v-for="i in 5" :key="i">-->
                  <!--                        <span v-if="product.note >= i" class="bx bx-star text-warning"></span>-->
                  <!--                        <span v-else class="bx bx-star"></span>-->
                  <!--                      </i>-->
                  <!--                    </p>-->
                  <!--                  </div>-->

                  <b-skeleton v-if="loading.products"/>
                  <h5 class="my-0">
                    <span class="text-muted mr-2">
                      <del v-if="product.reduction && !loading.products">{{ product.price }} €</del>
                      <b v-else-if="!loading.products">
                        {{ product.price }} €
                      </b>
                    </span>
                    <b v-if="product.reduction && !loading.products">{{(product.price - ((product.price * product.reduction) / 100)).toFixed(2)}} €</b>
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