<script>
import VueSlideBar from "vue-slide-bar";

import {categoryGoodsData} from "@/data/data-category-goods";
import {productData} from "@/data/data-products";


export default {
  page: {
    title: "Orders",
  },
  components: { VueSlideBar },
  data() {
    return {
      categoryGoodsData,
      productData,

      sliderPriceMax: this.getMaxPrice(productData),
      sliderPriceMin: this.getMinPrice(productData),

      currentFilterBy: {
        category_id: null,
        price: this.getMaxPrice(productData),
        note: null,
      },

      debug: null,
    }
  },
  methods: {

    filterBy(category) {
      switch (category) {
        case 'category_id':
            this.productData = productData.filter(productData => parseInt(productData.category_id) === parseInt(this.currentFilterBy.category_id));
            break;

        case 'price':
          this.productData = productData.filter(productData => parseInt(productData.price) <= parseInt(this.currentFilterBy.price));
          break;

        case 'note':
          this.productData = productData.filter(productData => parseInt(productData.note) >= parseInt(this.currentFilterBy.note));
          break;

        default:
          break;
      }

    },

    resetFilter() {
      this.productData = productData;
      this.sliderPriceMax = this.getMaxPrice(this.productData);
      this.sliderPriceMin = this.getMinPrice(this.productData);

      this.currentFilterBy.category_id = null;
      this.currentFilterBy.price = this.getMaxPrice(this.productData);
      this.currentFilterBy.note = null;

    },

    getMaxPrice(data) {
      let prices = [];
      for(let i = 0 ; i < data.length ; i++) {
        prices[i] = parseInt(data[i].price);
      }
      return Math.max(...prices) + 1;
    },
    getMinPrice(data) {
      let prices = [];
      for(let i = 0 ; i < data.length ; i++) {
        prices[i] = parseInt(data[i].price);
      }
      return Math.min(...prices) + 1;
    },

  },
};
</script>


<template>
  <div class="row">
    <div class="col-lg-3">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4">Filtre</h4>

          <div>
            <h5 class="font-size-14 mb-3">Périphériques : </h5>
            <ul class="list-unstyled product-list">
              <li v-for="categoryGood in categoryGoodsData" :key="categoryGood.id">
                <a href="javascript: void(0);" @click="currentFilterBy.category_id = categoryGood.id; filterBy('category_id')">
                  <i class="mdi mdi-chevron-right mr-1"></i> {{ categoryGood.title }}
                </a>
              </li>
              <li>
                <a href="javascript: void(0);" @click="currentFilterBy.category_id = null; resetFilter()">
                  <i class="mdi mdi-chevron-right mr-1"></i> Reinitialiser les filtres
                </a>
              </li>
            </ul>
          </div>

          <!-- Slider du prix -->
          <div>
            <h5 class="font-size-14 pb-2">Prix : </h5>
            <vue-slide-bar class="pt-4" v-model="currentFilterBy.price" :min="sliderPriceMin" :max="sliderPriceMax" @dragEnd="filterBy('price')" />
          </div>
          <!-- fin Slider du prix -->

          <!-- Note des users -->
          <div class="mt-4 pt-3">
            <h5 class="font-size-14 mb-3">Note des utilisateurs</h5>
            <div>
              <b-form-checkbox
                  id="stars-5"
                  v-model="currentFilterBy.note"
                  value="5"
                  :unchecked-value="0"
                  @input="filterBy('note')"
              >
                5
                <i class="bx bx-star text-warning"></i> seulement
              </b-form-checkbox>

              <b-form-checkbox
                  id="stars-4"
                  v-model="currentFilterBy.note"
                  value="4"
                  :unchecked-value="0"
                  @input="filterBy('note')"
              >
                4
                <i class="bx bx-star text-warning"></i> & plus
              </b-form-checkbox>

              <b-form-checkbox
                  id="stars-3"
                  v-model="currentFilterBy.note"
                  value="3"
                  :unchecked-value="0"
                  @input="filterBy('note')"
              >
                3
                <i class="bx bx-star text-warning"></i> & plus
              </b-form-checkbox>
              <b-form-checkbox
                  id="checkbox-4"
                  v-model="currentFilterBy.note"
                  value="2"
                  :unchecked-value="0"
                  @input="filterBy('note')"
              >
                2
                <i class="bx bx-star text-warning"></i> & plus
              </b-form-checkbox>
              <b-form-checkbox
                  id="stars-1"
                  v-model="currentFilterBy.note"
                  value="1"
                  :unchecked-value="0"
                  @input="filterBy('note')"
              >
                1
                <i class="bx bx-star text-warning"></i> & plus
              </b-form-checkbox>
            </div>
          </div>
          <!-- fin Note des users -->
        </div>
      </div>
    </div>





    <div class="col-lg-9">
      <div class="row">

        <div v-if="productData.length === 0">
          Aucun produit trouvé
        </div>
        <div v-for="product in productData" :key="product.id" class="col-xl-4 col-sm-6">
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
                  <router-link
                      tag="a"
                      class="text-dark"
                      :to="`/product-detail?id=${product.id}`"
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
                  <b>${{ product.price }}</b>
                </h5>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>


