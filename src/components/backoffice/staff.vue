<script>

import AdminTable from "@/components/widgets/admin-table";

export default {
  name: "staffs",
  components: {AdminTable},
  data() {
   return {

     roles: {
       companies:{
         hash: '#companies',
         options: {route: `companies`, name_id: 'company_id'},
         fields: [
           {key: 'company_id', label: 'ID', sortable: true},
           {key: 'company', label: 'Company', sortable: true},
           {key: 'user_id', label: 'ID', sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {register: 'companies', info: 'info', update: 'update', delete: 'delete'}
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
         modals: {register: 'goods', info: 'info', update: 'update', delete: 'delete'}
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
         modals: {register: 'services', info: 'info', update: 'update', delete: 'delete'}
       },
       users: {
         hash: '#users',
         options: {route: `users-staffs`, name_id: 'user_id'},
         fields: [
           {key: 'user_id', label: 'ID', sortable: true},
           {key: 'firstname', label: 'Firstname', sortable: true},
           {key: 'lastname', label: 'Lastname', sortable: true},
           {key: 'mail', label: 'Email', sortable: true},
           {key: 'role', label: 'Role', sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {register: 'users', info: 'UserDetail', update: 'update', delete: 'delete'}
       },
       warehouses: {
         hash: '#warehouses',
         options: {route: 'warehouses', name_id: 'warehouse_id'},
         fields: [
           {key: 'warehouse_id', label: 'ID', sortable: true},
           {key: 'number', label: 'Number', sortable: true},
           {key: 'address', label: 'Address', sortable: true},
           {key: 'phone', label: 'Phone',sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {register: 'warehouses', info: 'info', update: 'update', delete: 'delete'}
       },
       categories: {
         hash: '#categories',
         options: {route: 'categories', name_id: 'category_id'},
         fields: [
           {key: 'category_id', label: 'ID', sortable: true},
           {key: 'title', label: 'Title', sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {register: 'categories', info: 'info', update: 'update', delete: 'delete'}
       },
       catalogues: {
         hash: '#catalogues',
         options: {route: 'catalogues', name_id: 'catalogues_id'},
         fields: [
           {key: 'catalogue_id', label: 'ID', sortable: true},
           {key: 'name', label: 'Name', sortable: true},
           {key: 'start_date', label: 'Start Date', sortable: true},
           {key: 'end_date', label: 'End Date', sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {register: 'catalogues', info: 'info', update: 'update', delete: 'delete'}
       },
       sellers: {
         hash: '#sellers',
         options: {route: `sellers`, name_id: 'seller_id'},
         fields: [
           {key: 'seller_id', label: 'ID', sortable: true},
           {key: 'firstname', label: 'Firstname', sortable: true},
           {key: 'lastname', label: 'Lastname', sortable: true},
           {key: 'status', label: 'Status', sortable: true},
           {key: 'company', label: 'Company', sortable: true},
           {key: 'mail', label: 'Email', sortable: true},
           {key: 'user_id', thClass: 'd-none', tdClass: 'd-none'},
           {key: 'actions', label: 'Actions'}],
         modals: {register: 'sellers', info: 'UserDetail', update: 'update', delete: 'delete'}
       },
     }

   };
  }

}
</script>


<template>
  <div>
    <span v-for="(role, i) in roles" :key="i">
      <AdminTable v-if="$route.hash === role.hash" :options="role.options" :fields="role.fields" :modals="role.modals"/>
    </span>
  </div>
</template>


<style scoped>

</style>