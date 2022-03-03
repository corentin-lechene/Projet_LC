<script>/**
 * Forms component
 */

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
      object_form: {},
      totalRows: 1,
      users: [],
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
      return this.users.length;
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
      console.log(dest)
    },
    jsonToArray(src) {
      for (const key in src) {
        this.valuesForm.push(src[key]);
      }
    },
    getUsers() {
      fetch('http://localhost:9000/users')
          .then(response => response.json())
          .then((json) => {
            this.users = json;
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
    this.getUsers();

  },
};
</script>

<template>
  <div>
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
      <table v-if="role === 'customer'" class="table mt-5">
        <thead>
        <tr>
          <th v-for="table in tables" :key="table.id" scope="col">{{table.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, i) in users" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname}}</td>
          <td>{{ user.mail}}</td>
          <td>{{ user.birthdate}}</td>
          <td>{{ user.phone}}</td>
          <td>{{ user.address}}</td>
          <td>{{ user.city}}</td>
          <td>{{ user.country}}</td>
          <td>{{ user.postal_code}}</td>
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
        <tr v-for="(user, i) in users" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname}}</td>
          <td>{{ user.mail}}</td>
          <td>{{ user.phone}}</td>
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