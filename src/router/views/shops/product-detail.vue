<script>

import {productData} from "@/data/data-products";


export default {

  name: "product-detail",
  data() {
    return {
      productData,
      productDetail: null,

      test() {
        return window.location.href;
      }
    }

  },
  created() {
    this.productDetail = productData.filter(productData => productData.id === parseInt(this.$route.query.id));
  },
}
</script>


<template>

  <div class="row my-3 mx-3">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-xl-6">
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


            <div class="col-xl-6">
              <div class="mt-3">
                <h4 class="mt-1 mb-3">{{productDetail[0].name}}</h4>

                <p class="text-muted float-left mr-3">
                  <span class="bx bx-star text-warning"></span>
                  <span class="bx bx-star text-warning ml-1"></span>
                  <span class="bx bx-star text-warning ml-1"></span>
                  <span class="bx bx-star text-warning ml-1"></span>
                  <span class="bx bx-star ml-1"></span>
                </p>
                <p class="text-muted mb-4">( 0 utilisateurs ont acheté )</p>

                <h6 class="text-success text-uppercase">{{productDetail[0].discount}} Off</h6>
                <h5 class="mb-4">
                  Prix :
                  <b>{{productDetail[0].price}}</b>
                </h5>
                <p class="text-muted mb-4">
                  {{ productDetail[0].description }}
                </p>
              </div>
              <div class="text-left">
                <button type="button"
                        class="btn btn-primary waves-effect waves-light my-2 mr-2">
                  <i class="bx bx-cart me-2"></i> Ajouter au panier
                </button>
                <button type="button" class="btn btn-success waves-effect my-2 mx-2 waves-light">
                  <i class="bx bx-shopping-bag me-2"></i> Acheter maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

