<script>

import {sendDeleteTable, sendGetDataTable, sendGetUserByToken, sendSetOnline} from "@/components/requests-bdd";
import {createValue, validRequest} from "@/components/my-functions";

import UserDetail from "@/components/modals/backoffice/user-detail";
import GoodDetail from "@/components/modals/backoffice/good-detail";
import ServiceDetail from "@/components/modals/backoffice/service-detail";
import Register from "@/components/modals/backoffice/register";
import CompanyDetail from "@/components/modals/backoffice/companydetail";
import SellerDetail from "@/components/modals/backoffice/sellerdetail";
import CategoryDetail from "@/components/modals/backoffice/category-detail";
import WarehouseDetail from "@/components/modals/backoffice/warehouse-detail";
import Update from "@/components/modals/backoffice/update";


export default {
  props: {
    options: {
      route: {
        type: String,
        default: ""
      },
      name_id: {
        type: String,
        default: ""
      },
      byId: {
        type: Number,
        default: false
      }
    },
    fields: {
      type: Array,
      default: () => []
    },
    modals: {
      type: Object,
      default() {
        return {register: false, info: false, update: false, delete: false};
      }
    }
  },
  components: {
    Update,
    UserDetail,
    GoodDetail,
    ServiceDetail,
    Register,
    CompanyDetail,
    SellerDetail,
    CategoryDetail,
    WarehouseDetail,
  },
  data() {
    return {
      user: null,

      data: [],

      id: null,
      layer: null,
      route: null,
      itemsSelect: [],

      title: "Advanced Table",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      online: false,

      module: null,
      currentTab: 'Form',

      registerItems: {
        all_users: ['customers', 'companies', 'sellers', 'staffs'],
        users: ['customers', 'companies', 'sellers'],
        warehouses: ['warehouses', 'warehouses_stocks'],
      },

      loading: true,
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.data.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.layer = this.createLayer(this.fields);
  },
  methods: {
    async setOnline(route, id) {
      await sendSetOnline(route, id);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    getInformations(route, id = false) {
      let promise = sendGetDataTable(route, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.data = res.result.length > 0 ? createValue(res.result, this.layer) : [];
          this.totalRows = this.data.length;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      })
    },
    getId(item) {
      this.id = item[this.options.name_id];
    },
    createLayer(src) {
      let temp = [];
      for (let i = 0; i < src.length; i++) {
        temp.push(src[i].key);
      }
      return temp
    },
    currentProperties() {
      switch (this.modals.info) {
        case 'UserDetail':
          return {user_id: this.id};
        case 'GoodDetail':
          return {good_id: this.id};
        case 'ServiceDetail':
          return {service_id: this.id};
        case 'CompanyDetail':
          return {company_id: this.id};
        case 'SellerDetail':
          return {seller_id: this.id};
        case 'CategoryDetail':
          return {category_id: this.id};
        case 'WarehouseDetail':
          return {warehouse_id: this.id};
          // case '';
          // return ;
        default:
          break;
      }
    },
    deleteTable(route, id) {
      let promise = sendDeleteTable(route, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          console.log("del : ", res);
        }
      })
    }
  },
  async created() {
    this.getInformations(this.options.route, this.options.byId);
    const user = await sendGetUserByToken();
    if (user !== undefined)
      this.user = user.result;
    // else
    //   await this.$router.push('/'); //FIXME si pas de token redirection
  }

}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Compte</h4>
          <div class="row mt-4 mb-2">
            <div class="col-sm-12 col-md-2 pr-0">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show
                  <b-form-select v-model="perPage" :options="pageOptions"/>
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-8 pl-0">
              <div id="tickets-table_filter" class="dataTables_filter text-md-right d-block">
                <b-form-input
                    v-model="filter"
                    class="form-control ml-2"
                    placeholder="Search..."
                    type="search"
                ></b-form-input>
              </div>
            </div>
            <!-- End search -->
            <!-- Add -->
            <div class="col-sm-12 col-md-2">
              <b-dropdown v-if="modals.register && typeof registerItems[modals.register] === 'object'" block right
                          text="Add" variant="success">
                <b-dropdown-item v-for="(item, i) in registerItems[modals.register]" :key="i"
                                 v-b-modal="'register'"
                                 class="dropdown-item" @click="route = item">{{ item }}
                </b-dropdown-item>
              </b-dropdown>
              <b-button v-else-if="modals.register" v-b-modal="'register'" block variant="success"
                        @click="route = modals.register">Add
              </b-button>
            </div>
            <!-- End Add -->
          </div>
          <!-- Table -->
          <div class="table-responsive mb-0" style="min-height: 500px">
            <b-skeleton-table v-if="loading" :columns="fields.length" :rows="10"/>

            <b-table
                v-if="!loading"
                :current-page="currentPage" :fields="fields" :filter="filter"
                :filter-included-fields="filterOn" :items="data"
                :per-page="perPage" :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc" responsive="xl"
                show-empty thead-class="text-center"
                @filtered="onFiltered"
            >
              <!-- if empty -->
              <template #empty="scope">
                <div class="text-center font-weight-bold font-size-17">Aucune donnée enregistrée</div>
              </template>

              <!-- button online -->
              <template #cell(online)="row">
                <span style="display: none">{{ row.item.online = !!row.item.online }}</span>
                <b-form-checkbox v-model="row.item.online" class="text-center"
                                 switch @change="setOnline(options.route, row.item[options.name_id])"/>
              </template>

              <!-- row price -->
              <template #cell(price)="row">
                <div>{{row.item.price}} €</div>
              </template>

              <!-- buttons actions -->
              <template #cell(actions)="row">
                <div class="text-center">
                  <b-dropdown class="text-center" variant="info" text="..." right>
                    <b-dropdown-item v-b-modal="'info'" @click="getId(row.item)"><i class="bx bx-info-circle font-size-18" style="vertical-align: text-bottom"/> &nbsp;Information
                    </b-dropdown-item>
                    <b-dropdown-item v-b-modal="'update'" @click="route = modals.update"><i class="bx bx-pencil font-size-18" style="vertical-align: text-bottom"/> &nbsp;Modifier
                    </b-dropdown-item>
                    <b-dropdown-item v-b-modal="'delete'"><i class="bx bx-trash font-size-18" style="vertical-align: text-bottom"/> &nbsp;Supprimer</b-dropdown-item>
                  </b-dropdown>
                </div>

              </template>
            </b-table>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-right">
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="rows"/>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  Modals register  /-->
    <b-modal id="register" centered hide-footer size="lg" title="Détail" title-class="font-18"
             @hidden="getInformations(options.route, options.byId)">
      <Register :by-id="options.byId" :route="route || options.route"/>
    </b-modal>

    <!--  Modals info  /-->
    <b-modal v-if="id !== null" id="info" centered hide-footer size="xl" title="Détail" title-class="font-18">
      <div class="card">
        <div class="card-body">
          <keep-alive>
            <component :is="modals.info" v-bind="currentProperties()"/>
          </keep-alive>
        </div>
      </div>
    </b-modal>

    <!--  Modals update  /-->
    <b-modal v-if="id !== null" id="update" centered hide-footer size="xl" title="Détail" title-class="font-18"
             @hidden="getInformations(options.route, options.byId)">
      <Update :id="id" :route="route"/>
    </b-modal>

    <!--  Modals delete  /-->
    <b-modal v-if="id !== null" id="delete" ref="delete" centered hide-footer size="xs" title="Détail"
             title-class="font-18" @hidden="getInformations(options.route, options.byId)">
      <div class="card">
        <div class="card-body">
          <h5>Êtes-vous sûr de vouloir supprimer?</h5>
          <div class="row" style="height: 10px;"></div>
          <b-button variant="outline-success" @click="deleteTable(options.route, id); $refs['delete'].hide()">Oui
          </b-button>
          <b-button style="margin-left: 10%;" variant="outline-danger" @click="$refs['delete'].hide()">Non</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>


<style scoped>

</style>