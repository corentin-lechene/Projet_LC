<script>

import AdminTable from "@/components/widgets/admin-table";
import Profile from "@/components/widgets/profile";

export default {
  name: "admin",
  components: {AdminTable, Profile},
  data() {
    return {

      roles: {
        companies: {
          hash: '#companies',
          options: {route: `companies`, name_id: 'company_id'},
          fields: [
            {key: 'company_id', label: 'ID', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'firstname', label: 'Firstname', sortable: true},
            {key: 'lastname', label: 'Lastname', sortable: true},
            {key: 'mail', label: 'Email', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'companies', info: 'CompanyDetail', update: 'update', delete: 'delete'}
        },
        goods: {
          hash: '#goods',
          options: {route: `goods`, name_id: 'good_id'},
          fields: [
            {key: 'good_id', label: 'ID', sortable: true},
            {key: 'name', label: 'Name', sortable: true},
            {key: 'price', label: 'Price', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'goods', info: 'GoodDetail', update: 'update', delete: 'delete'}
        },
        services: {
          hash: '#services',
          options: {route: `services`, name_id: 'service_id'},
          fields: [
            {key: 'service_id', label: 'ID', sortable: true},
            {key: 'name', label: 'Name', sortable: true},
            {key: 'price', label: 'Price', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'services', info: 'ServiceDetail', update: 'update', delete: 'delete'}
        },
        users: {
          hash: '#users',
          options: {route: `users`, name_id: 'user_id'},
          fields: [
            {key: 'user_id', label: 'ID', sortable: true},
            {key: 'firstname', label: 'Firstname', sortable: true},
            {key: 'lastname', label: 'Lastname', sortable: true},
            {key: 'mail', label: 'Email', sortable: true},
            {key: 'role', label: 'Role', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'all_users', info: 'UserDetail', update: 'update', delete: 'delete'}
        },
        sellers: {
          hash: '#sellers',
          options: {route: `sellers`, name_id: 'user_id'},
          fields: [
            {key: 'seller_id', label: 'ID', sortable: true},
            {key: 'firstname', label: 'Firstname', sortable: true},
            {key: 'lastname', label: 'Lastname', sortable: true},
            {key: 'status', label: 'Status', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'mail', label: 'Email', sortable: true},
            {key: 'user_id', thClass: 'd-none', tdClass: 'd-none'},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'sellers', info: 'SellerDetail', update: 'update', delete: 'delete'}
        },
        warehouses: {
          hash: '#warehouses',
          options: {route: 'warehouses', name_id: 'warehouse_id'},
          fields: [
            {key: 'warehouse_id', label: 'ID', sortable: true},
            {key: 'name_warehouse', label: 'Name', sortable: true},
            {key: 'address', label: 'Address', sortable: true},
            {key: 'phone', label: 'Phone', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'warehouses', info: 'WarehouseDetail', update: 'update', delete: 'delete'}
        },
        categories: {
          hash: '#categories',
          options: {route: 'categories', name_id: 'category_id'},
          fields: [
            {key: 'category_id', label: 'ID', sortable: true},
            {key: 'title', label: 'Title', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'categories', info: 'CategoryDetail', update: 'update', delete: 'delete'}
        },
        catalogues: {
          hash: '#catalogues',
          options: {route: 'catalogues', name_id: 'catalogue_id'},
          fields: [
            {key: 'catalogue_id', label: 'ID', sortable: true},
            {key: 'name', label: 'Name', sortable: true},
            {key: 'start_date', label: 'Start Date', sortable: true},
            {key: 'end_date', label: 'End Date', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'catalogues', info: 'info', update: 'update', delete: 'delete'}
        },
      }

    };
  }
}
</script>


<template>
  <div>
    <Profile v-if="$route.hash === '#profile'"/>
    <span v-for="(role, i) in roles" :key="i">
      <AdminTable v-if="$route.hash === role.hash" :options="role.options" :fields="role.fields" :modals="role.modals"/>
    </span>
  </div>
</template>


<style scoped>

</style>