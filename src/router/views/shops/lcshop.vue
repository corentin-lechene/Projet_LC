<script>

import {keyboardData} from "@/data/data-keyboard";

export default {
  page: {
    title: "Orders",
  },
  data() {
    return {
      keyboardData
    }
  }
};
</script>


<template>
  <div class="row">
    <div class="col-lg-3">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4">Filter</h4>

          <div>
            <h5 class="font-size-14 mb-3">Clothes</h5>
            <ul class="list-unstyled product-list">
              <li>
                <a href="javascript: void(0);">
                  <i class="mdi mdi-chevron-right mr-1"></i> T-shirts
                </a>
              </li>
              <li>
                <a href="javascript: void(0);">
                  <i class="mdi mdi-chevron-right mr-1"></i> Shirts
                </a>
              </li>
              <li>
                <a href="javascript: void(0);">
                  <i class="mdi mdi-chevron-right mr-1"></i> Jeans
                </a>
              </li>
              <li>
                <a href="javascript: void(0);">
                  <i class="mdi mdi-chevron-right mr-1"></i> Jackets
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-9">
      <div class="row">
        <div v-for="data in keyboardData.slice(0,6)" :key="data.id" class="col-xl-4 col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="product-img position-relative">
                <div v-if="data.discount" class="avatar-sm product-ribbon">
                  <span class="avatar-title rounded-circle bg-primary">-{{ data.discount }}%</span>
                </div>
                <router-link tag="a" :to="`/product-detail/${data.id}`">
                  <img :src="`${data.img}`" alt class="img-fluid mx-auto d-block"/>
                </router-link>
              </div>
              <div class="mt-4 text-center">
                <h5 class="mb-3 text-truncate">
                  <router-link
                      tag="a"
                      class="text-dark"
                      :to="`/product-detail/${data.id}`"
                  >{{ data.name }}
                  </router-link>
                </h5>
                <p class="text-muted">
                  <i class="bx bx-star text-warning"></i>
                  <i class="bx bx-star text-warning"></i>
                  <i class="bx bx-star text-warning"></i>
                  <i class="bx bx-star text-warning"></i>
                  <i class="bx bx-star text-warning"></i>
                </p>
                <h5 class="my-0">
                  <b>${{ data.price }}</b>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <b-pagination
              v-if="keyboardData.length > 0"
              class="justify-content-center"
              pills
              v-model="currentPage"
              :total-rows="keyboardData.length"
              :per-page="6"
              aria-controls="my-table"
          ></b-pagination>
        </div>
      </div>

    </div>
  </div>
</template>


