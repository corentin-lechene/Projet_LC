<script>/**
 * Forms component
 */
import {createValue, validRequest} from "@/components/my-functions";
import {sendDeleteTable, sendGetDataTable} from "@/components/requests-bdd";


export default {
  props: {
    tables: {
      type: Object,
      default: function () {
        return {};
      }
    },
    route: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      showModal: false,

      totalRows: 1,
      data: [],
      fields: null,

      numPage: null,
      currentPage: 1,
      max: 1,
      pageOptions: [],

      filter: null,
      filterOn: [],

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
    this.fields = createValue(this.tables);

  },
  methods: {
    getInformations(table, id = false) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.data = createValue(res.result, this.tables);
          this.pageOptions = [
            (this.data.length / 4).toFixed(0),
            (this.data.length / 3).toFixed(0),
            (this.data.length / 2).toFixed(0),
            (this.data.length).toFixed(0)
          ];
          this.max = this.pageOptions[0];
        }
      })
    },
    deleteTableById(table, id) {
      let promise = sendDeleteTable(table, id);
      promise.then((res) => {
        if (!validRequest(res))
          console.log(res.result);
      });
    },

    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  created() {
    this.getInformations(this.route);


  },
};
</script>

<template>
  <div>
    <div class="row mt-4">
      <div class="col-sm-12 col-md-6">
        <div id="tickets-table_length" class="dataTables_length">
          <label class="d-inline-flex align-items-center">
            Montrer
            <b-form-select v-model="max" size="sm" :options="pageOptions"></b-form-select>&nbsp;entrées
          </label>
        </div>
      </div>
      <!-- Search -->
      <div class="col-sm-12 col-md-6">
        <div id="tickets-table_filter" class="dataTables_filter text-md-right">
          <label class="d-inline-flex align-items-center">
            Rechercher:
            <b-form-input
                v-model="filter"
                type="search"
                placeholder="Rechercher..."
                class="form-control form-control-sm ml-2"
            ></b-form-input>
          </label>
        </div>
      </div>
      <!-- End search -->
    </div>
    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-centered mb-0 table-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th v-for="table in tables" :key="table.id" scope="col">{{ table.title }}</th>
          <th colspan="2">#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rows, i) in data.slice(0, max)" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td v-for="(user, y) in rows" :key="y">{{ user }}</td>
          <td>
            <b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button>
          </td>
          <td>
            <b-button variant="danger" @click="deleteTableById(route, rows.user_id)" title="Supprimer">
              <i class="fas fa-trash-alt"></i>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="dataTables_paginate paging_simple_numbers float-right">
          <ul class="pagination pagination-rounded mb-0">
            <!-- pagination -->
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="numPage"></b-pagination>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>