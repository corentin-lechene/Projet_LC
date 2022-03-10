<script>

import {sendGetDataTable} from "@/components/requests-bdd";
import {createValue, validRequest} from "@/components/my-functions";


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
        return {info: false, update: false, delete: false};
      }
    }
  },
  components: {},
  data() {
    return {
      data: [],

      id: null,
      layer: null,

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
          console.log(res.result);
          this.data = createValue(res.result, this.layer);
          this.totalRows = this.data.length;
        }
      })
    },
    getId(item) {
      this.id = item[this.options.name_id];
    },
    createLayer(src) {
      let temp = [];
      for (let i = 0; i < src.length; i++) {
        if(src[i].layer)
          temp.push(src[i].key);
      }
      return temp
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
          <h4 class="card-title">Data Table</h4>
          <div class="row mt-4">
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                <label class="d-inline-flex align-items-center">
                  Search:
                  <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                  ></b-form-input>
                </label>
              </div>
            </div>
            <!-- End search -->
          </div>
          <!-- Table -->
          <div class="table-responsive mb-0">
            <b-table
                v-if="data"
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
                      v-if="modals.info" v-b-modal="modals.info"
                      variant="info" size="sm" class="mx-1"><i class="bx bx-info-circle"></i></b-button>
                  <b-button
                      v-if="modals.update" v-b-modal="'update'"
                      variant="success" size="sm" class="mx-1"><i class="bx bx-pencil"></i></b-button>
                  <b-button
                      v-if="modals.delete" v-b-modal="modals.delete || 'delete'"
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

    <!--  Modals info  /-->
    <b-modal v-if="id !== null" id="info" title="Détail" title-class="font-18" size="xl" hide-footer centered>
      <div class="card">
        <div class="card-body">
          info id : {{id}}
        </div>
      </div>
    </b-modal>

    <!--  Modals update  /-->
    <b-modal v-if="id !== null" id="update" title="Détail" title-class="font-18" size="xl" hide-footer centered>
      update {{id}}
    </b-modal>

    <!--  Modals delete  /-->
    <b-modal v-if="id !== null" id="delete" title="Détail" title-class="font-18" size="xs" hide-footer centered>
      <div class="card">
        <div class="card-body">
          <h5>Êtes-vous sûr de vouloir supprimer?</h5>
          <div class="row" style="height: 10px;"></div>
          <b-button variant="outline-success">Oui</b-button>
          <b-button style="margin-left: 10%;" variant="outline-danger">Non</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>


<style scoped>

</style>