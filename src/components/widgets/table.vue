<script>/**
 * Forms component
 */
import {validRequest} from "@/components/my-functions";
import {sendGetDataTable} from "@/components/requests-bdd";


export default {
  props: {
    tables: {
      type: Object,
      default: function () {
        return {};
      }
    },
    options: {
      type: Object,
      default: function () {
        return {};
      }
    },
    role: {
      type: String,
      default: function () {
        return "";
      }
    }
  },
  data() {
    return {
      showModal: false,
      valuesForm: [],
      totalRows: 1,
      datas: [],
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],


      items: [
        {
          text: "Tables",
          href: "/"
        },
        {
          text: "Advanced",
          active: true
        }
      ],
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.datas.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {

    getInformation(table, id = false) { //Changer le nom de la variable
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if(!validRequest(res))
          this.datas = res.result; //là où tu veux stocker le resultat
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
    this.getInformation(this.options.route)


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
            <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entrées
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
    <div class="table-responsive mb-0">
      <table v-if="options.role === 'customers'" class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(customer, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ customer.firstname }}</td>
          <td>{{ customer.lastname}}</td>
          <td>{{ customer.mail}}</td>
          <td>{{ customer.birthDay}}</td>
          <td>{{ customer.phone}}</td>
          <td class="text-nowrap">{{ customer.address}}</td>
          <td class="text-nowrap">{{ customer.city}}</td>
          <td>{{ customer.country}}</td>
          <td>{{ customer.postal_code}}</td>
          <td>{{ customer.company}}</td>
          <td><b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button></td>
          <td><b-button variant="danger" title ="Supprimer"><i class="fas fa-trash-alt"></i></b-button></td>
        </tr>
        </tbody>
      </table>
      <table v-else-if="options.role === 'staffs'"  class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(staff, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ staff.firstname }}</td>
          <td>{{ staff.lastname}}</td>
          <td>{{ staff.mail}}</td>
          <td class="text-nowrap">{{ staff.job}}</td>
          <td><b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button></td>
          <td><b-button variant="danger" title ="Supprimer"><i class="fas fa-trash-alt"></i></b-button></td>
        </tr>
        </tbody>
      </table>
      <table v-else-if="options.role === 'goods'"  class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(good, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td class="text-nowrap">{{ good.name }}</td>
          <td class="text-truncate" style="max-width: 150px">{{ good.description}}</td>
          <td>{{ good.price}}€</td>
          <td>{{ good.reduction}}%</td>
          <td>{{ good.delivery_date}}</td>
          <td>{{ good.destocking_date}}</td>
          <td>{{ good.company}}</td>
          <td>{{ good.stock}}</td>
          <td>Entrepot n°{{ good.number}}</td>
          <td><b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button></td>
          <td><b-button variant="danger" title ="Supprimer"><i class="fas fa-trash-alt"></i></b-button></td>
        </tr>
        </tbody>
      </table>
      <table v-else-if="options.role === 'services'"  class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(service, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td class="text-nowrap">{{ service.name }}</td>
          <td class="text-truncate" style="max-width: 150px">{{ service.description}}</td>
          <td>{{ service.price}}€</td>
          <td>{{ service.reduction}}%</td>
          <td>{{ service.quantity}}</td>
          <td><b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button></td>
          <td><b-button variant="danger" title ="Supprimer"><i class="fas fa-trash-alt"></i></b-button></td>
        </tr>
        </tbody>
      </table>
      <table v-else-if="options.role === 'companies'" class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(company, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ company.firstname }}</td>
          <td>{{ company.lastname}}</td>
          <td>{{ company.mail}}</td>
          <td>{{ company.phone}}</td>
          <td class="text-nowrap">{{ company.company}}</td>
          <td><b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button></td>
          <td><b-button variant="danger" title ="Supprimer"><i class="fas fa-trash-alt"></i></b-button></td>
        </tr>
        </tbody>
      </table>
      <table v-else-if="options.role === 'sellers'" class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(seller, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ seller.firstname }}</td>
          <td>{{ seller.lastname}}</td>
          <td>{{ seller.mail}}</td>
          <td>{{ seller.phone}}</td>
          <td class="text-nowrap">{{ seller.company}}</td>
          <td><b-button variant="success" title="Modifier"><i class="fas fa-pencil-alt"></i></b-button></td>
          <td><b-button variant="danger" title ="Supprimer"><i class="fas fa-trash-alt"></i></b-button></td>
        </tr>
        </tbody>
      </table>
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
</template>