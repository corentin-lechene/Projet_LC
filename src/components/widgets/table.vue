<script>/**
 * Forms component
 */
import Form from "@/components/widgets/form";
import {formData} from "@/data/data-forms";

import {tableData} from "@/data/data-tables";

import {createValue, validRequest, displayLongStr} from "@/components/my-functions";
import {sendDeleteTable, sendGetDataTable} from "@/components/requests-bdd";


export default {
  components: {Form},
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

      selectedRow: null,
      selectRole: null,
      formData,
      tableData,

      totalRows: 1,
      data: [],

      currentPage: 1,
      perPage: 10,
      min: 0,
      max: 10,
      pageOptions: [10, 25, 50],

      filter: null,
      filterOn: [],

      layer: {
        customers: {
          user_id: {
            title: "n° Client",
          },
          firstname: {
            title: "Prénom"
          },
          lastname: {
            title: "Nom"
          },
          mail: {
            title: "Email"
          },
        }
      }

    };
  },
  methods: {
    displayLongStr,
    getInformations(table, id = false) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.data = createValue(res.result, (this.layer[this.route] || this.tables));
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

    refreshPagination() {
      this.max = (this.currentPage * this.perPage);
      this.min = (this.currentPage * this.perPage) - this.perPage;
    }
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
            <b-form-select v-model="perPage" size="sm" :options="pageOptions" @input="max = perPage"></b-form-select>&nbsp;entrées
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
      <table class="table table-centered mb-0 table-nowrap text-center">
        <thead>
        <tr>
          <th>#</th>
          <th v-for="table in (layer[route] || tables)" :key="table.id" scope="col">{{ displayLongStr(table.title, 30) }}</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rows, i) in data.slice(min, max)" :key="i">
          <th scope="row">{{ min + i + 1 }}</th>
          <td v-for="(row, y) in rows" :key="y">{{ displayLongStr(row, 30) }}</td>
          <td>
            <b-button v-if="layer[route]"
                      title="Voir plus"
                      v-b-modal.user-detail pill variant="info" class="mx-1"
                      @click="selectedRow = rows[0]; selectRole = 'display'"><i class="bx bx-info-circle"></i>
            </b-button>
            <b-button 
                      title="Modifier"
                      v-b-modal.user-detail pill variant="success" class="mx-1"
                      @click="selectedRow = rows[0]; selectRole = 'update'"><i class="bx bx-pencil"></i>
            </b-button>
            <b-button 
                      title="Supprimer"
                      v-b-modal.user-delete pill variant="danger" class="mx-1"
                      @click="selectedRow = rows[0]"><i class="bx bx-trash"></i>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col">
        <div class="dataTables_paginate paging_simple_numbers float-right">
          <ul class="pagination pagination-rounded mb-0">
            <b-pagination v-model="currentPage" :total-rows="data.length" :per-page="perPage"
                          @input="refreshPagination()"></b-pagination>
          </ul>
        </div>
      </div>
    </div>


    <b-modal v-if="selectedRow !== null"
             id="user-detail" title="Detail du client" title-class="font-18"
             size="xl" hide-footer centered
    >
      <div class="card">
        <div class="card-body">
            <Form v-if="selectRole === 'display'" :forms="tableData[route]"
                  :display="{id: selectedRow, route: route}"/>
            <Form v-if="selectRole === 'update'" :forms="tableData[route]" :update="{id: selectedRow, route: route}"/>
        </div>
      </div>
    </b-modal>

    <b-modal v-if="selectedRow !== null"
             id="user-delete" title="Detail du client" title-class="font-18"
             size="xs" hide-footer centered
    >
      <div class="card">
        <div class="card-body">
            <h3>Supprimer le client ?</h3>
            <b-button variant="success" title="Oui">Oui</b-button>
            <b-button variant="danger" title="Annuler">Annuler</b-button>
        </div>
      </div>
    </b-modal>

  </div>
</template>