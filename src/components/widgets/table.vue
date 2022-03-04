<script>/**
 * Forms component
 */
import {validRequest} from "@/components/my-functions";
import {sendInformation} from "@/components/requests-bdd";


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
      sortBy: "name",
      sortDesc: false,
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
    createObjectWithValues(dest, src, valuesForm) {
      let i = 0;
      for (const key in src) {
        dest[key] = valuesForm[i];
        i++;
      }
    },
    jsonToArray(src) {
      for (const key in src) {
        this.valuesForm.push(src[key]);
      }
    },

    getInformation(table, id = false) { //Changer le nom de la variable
      let promise = sendInformation(table, id);
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
        <tr v-for="(user, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname}}</td>
          <td>{{ user.mail}}</td>
          <td>{{ user.birthDay}}</td>
          <td>{{ user.phone}}</td>
          <td class="text-nowrap">{{ user.address}}</td>
          <td class="text-nowrap">{{ user.city}}</td>
          <td>{{ user.country}}</td>
          <td>{{ user.postal_code}}</td>
          <td>{{ user.company}}</td>
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
        <tr v-for="(user, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname}}</td>
          <td>{{ user.mail}}</td>
          <td class="text-nowrap">{{ user.job}}</td>
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
        </tr>
        </tbody>
      </table>
      <table v-else class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, i) in datas" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname}}</td>
          <td>{{ user.mail}}</td>
          <td>{{ user.phone}}</td>
          <td class="text-nowrap">{{ user.company}}</td>
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