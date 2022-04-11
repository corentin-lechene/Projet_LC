<script>

import {sendDeleteTable, sendGetDataTable} from "@/components/requests-bdd";
import {createValue, validRequest} from "@/components/my-functions";

import UserDetail from "@/components/modals/backoffice/user-detail";
import GoodDetail from "@/components/modals/backoffice/good-detail";
import ServiceDetail from "@/components/modals/backoffice/service-detail";
import Register from "@/components/modals/backoffice/register";

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
    UserDetail,
    GoodDetail,
    ServiceDetail,
    Register,
  },
  data() {
    return {
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

      module: null,
      currentTab: 'Form',

      registerItems: {
        all_users: ['customers', 'companies', 'sellers', 'staffs'],
        users: ['customers', 'companies', 'sellers'],
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
    },
  },
  mounted() {
    // Set the initial number of items
    this.layer = this.createLayer(this.fields);
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    getInformations(route, id = false) {
      let promise = sendGetDataTable(route, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.data = createValue(res.result, this.layer);
          this.totalRows = this.data.length;
          setTimeout(() => {this.loading = false;}, 500);
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
    getItemsByRoute(route, val) {
      if (val === '*')
        return ['customers', 'companies', 'sellers', 'staffs'];
      else if (val === '-')
        return ['customers', 'companies', 'sellers'];
      return (typeof val === 'object') ? val : [val];
    },
    currentProperties() {
      switch (this.modals.info) {
        case 'UserDetail':
          return {user_id: this.id};
        case 'GoodDetail':
          return {good_id: this.id};
        case 'ServiceDetail':
          return {service_id: this.id};
        // case '';
        // return ;
        default:
          break;
      }
    },
    deleteTable(route, id) {
      let promise = sendDeleteTable(route, id);
      promise.then((res) => {
        console.log(res);
        if (!validRequest(res)) {
          console.log("del : ", res);
        }
      })
    }
  },
  created() {
    this.getInformations(this.options.route, this.options.byId);
  }

}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">TITLE</h4>
          <div class="row mt-4 mb-2">
            <div class="col-sm-12 col-md-2 pr-0">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show
                  <b-form-select v-model="perPage" :options="pageOptions" />
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-8 pl-0">
              <div id="tickets-table_filter" class="dataTables_filter text-md-right d-block">
                <b-form-input
                    v-model="filter"
                    type="search"
                    placeholder="Search..."
                    class="form-control ml-2"
                ></b-form-input>
              </div>
            </div>
            <!-- End search -->
            <!-- Add -->
            <div class="col-sm-12 col-md-2">
              <b-dropdown v-if="modals.register && typeof registerItems[modals.register] === 'object'" block right text="Add" variant="success">
                <b-dropdown-item v-for="(item, i) in registerItems[modals.register]" :key="i"
                                 v-b-modal="'register'"
                                 class="dropdown-item" @click="route = item">{{ item }}
                </b-dropdown-item>
              </b-dropdown>
              <b-button v-else-if="modals.register" v-b-modal="'register'" variant="success" block  @click="route = modals.register">Add</b-button>
            </div>
            <!-- End Add -->
          </div>
          <!-- Table -->
          <div class="table-responsive mb-0">
            <b-skeleton-table v-if="loading" :columns="fields.length" :rows="10"/>
            <b-table
                v-if="data && !loading"
                :fields="fields" :items="data"
                responsive="xl" thead-class="text-center"
                :per-page="perPage" :current-page="currentPage"
                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                :filter="filter" :filter-included-fields="filterOn"
                @filtered="onFiltered"
            >
              <template #cell(actions)="row">
                <div class="text-center" @mouseover="getId(row.item)">
                  <b-button
                      v-if="modals.info" v-b-modal="'info'" @click="getId(row.item)"
                      variant="info" size="sm" class="mx-1"><i class="bx bx-info-circle"></i></b-button>
                  <b-button
                      v-if="modals.update" v-b-modal="'update'"
                      variant="success" size="sm" class="mx-1"><i class="bx bx-pencil"></i></b-button>
                  <b-button
                      v-if="modals.delete" v-b-modal="'delete'"
                      variant="danger" size="sm" class="mx-1"><i class="bx bx-trash"></i></b-button>
                </div>
              </template>
            </b-table>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-right">
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  Modals register  /-->
      <b-modal id="register" title="Détail" title-class="font-18" size="lg" hide-footer centered @hidden="getInformations(options.route, options.byId)">
      <Register :route="route"/>
    </b-modal>

    <!--  Modals info  /-->
    <b-modal v-if="id !== null" id="info" title="Détail" title-class="font-18" size="xl" hide-footer centered>
      <div class="card">
        <div class="card-body">
          <keep-alive>
            <component :is="modals.info" v-bind="currentProperties()"/>
          </keep-alive>
        </div>
      </div>
    </b-modal>

    <!--  Modals update  /-->
    <b-modal v-if="id !== null" id="update" title="Détail" title-class="font-18" size="xl" hide-footer centered>
      update {{id}}
    </b-modal>

    <!--  Modals delete  /-->
    <b-modal v-if="id !== null" id="delete" ref="delete" title="Détail" title-class="font-18" size="xs" hide-footer centered @hidden="getInformations(options.route, options.byId)">
      <div class="card">
        <div class="card-body">
          <h5>Êtes-vous sûr de vouloir supprimer?</h5>
          <div class="row" style="height: 10px;"></div>
          <b-button variant="outline-success" @click="deleteTable(options.route, id); $refs['delete'].hide()" >Oui</b-button>
          <b-button style="margin-left: 10%;" variant="outline-danger" @click="$refs['delete'].hide()">Non</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>


<style scoped>

</style>