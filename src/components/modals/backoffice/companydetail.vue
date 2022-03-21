<script>

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  props: {
    company_id: {
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
      log : console.log,
    };
  },
  methods: {

    getId(item) {
      this.id = item[this.options.name_id];
    },

    getCustomersByCompanyId(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.data = res.result;
        }

      })
    }
  },
  mounted() {
    this.getCustomersByCompanyId('customers-companies', this.company_id);
  },
};
</script>

<template>
  <div class="row">
    <div v-if="data.length === 0">Aucun Customer trouvé </div>
    <div v-for="customer in data" :key="customer.id" class="col-sm-4 col-md-4 col-xl-4">
      <div class="card">
        <div class="card-body">
          <div class="text-center card-box">
            <div class="member-card pt-2 pb-2">
              <div class="thumb-lg member-thumb mx-auto"><img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                              class="rounded-circle img-thumbnail" alt="profile-image">
                <!--<b-img :src="require(`@/assets/images/users/${customer.image}`)" fluid
                       class="rounded-circle img-thumbnail" alt="avatar"/>-->
              </div>
              <div class="">
                <h4> {{ customer.firstname }} | {{ customer.lastname }}</h4>
                <p><span>{{ customer.mail }}</span></p>
              </div>
              <div class="text-center">
                <b-button class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Voir plus
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Modals info  /-->
    <b-modal v-if="id !== null" id="info" title="Detail" title-class="font-18" size="xl" hide-footer centered>
      <div class="card">
        <div class="card-body">
          <keep-alive>
            <component :is="modals.info" v-bind="this.modals.info"/>
          </keep-alive>
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

.btn-rounded {
  border-radius: 2em;
}

h4 {
  line-height: 22px;
  font-size: 18px;
}
</style>