<script>

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";
import GoodDetail from "@/components/modals/backoffice/good-detail";

export default {
  components: {GoodDetail},
  props: {
    seller_id: {
      type: Number,
      default: null
    },
    modals: {
      type: Object,
      default() {
        return {register: false, info: false, update: false, delete: false};
      }
    }
  },
  data() {
    return {
      data: {},
      id: null,
    };
  },
  methods: {
    getImgUrl(filename){
      try{
        return require(`@/assets/images/product/${filename}`)
      }catch(_){
        return require(`@/assets/images/product/no_img.png`)
      }
    },
    getId(item) {
      this.id = item[this.options.name_id];
    },

    getGoodsOrServicesBySellerId(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.data = res.result;
        }

      })
    }
  },
  mounted() {
    this.getGoodsOrServicesBySellerId('goods-sellers', this.seller_id);
  },
};
</script>

<template>
  <div class="row">
    <div v-if="data.length === 0">Aucun Good trouvé </div>
    <div v-for="good in data" :key="good.id" class="col-sm-4 col-md-4 col-xl-4">
      <div class="card">
        <div class="card-body">
          <div class="text-center card-box">
            <div class="member-card pt-2 pb-2">
              <div class="thumb-lg member-thumb mx-auto">
                <b-img :src="getImgUrl(good.image)" fluid class="rounded-circle img-thumbnail" alt="avatar"/>
              </div>
              <div class="">
                <h4> {{ good.price}} € | {{ good.reduction }} %</h4>
                <p><span>{{ good.name }}</span></p>
              </div>
              <div class="text-center">
                <b-button
                    v-b-modal="'good-detail'" @click="id = good.good_id"
                    variant="info" size="sm" class="mx-1">Voir plus</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Modals info  /-->
    <b-modal v-if="id !== null" id="good-detail" title="Detail" title-class="font-18" size="xl" hide-footer centered>
      <div class="card">
        <div class="card-body">
          <GoodDetail :good_id="id"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>


<style>
body {
  background: #DCDCDC;
  margin-top: 20px;
}

.card-box {
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 30px;
  background-color: #fff;
}

.thumb-lg {
  height: 88px;
  width: 88px;
}

.img-thumbnail {
  padding: .25rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
  max-width: 100%;
  height: auto;
}

h4 {
  line-height: 22px;
  font-size: 18px;
}
</style>