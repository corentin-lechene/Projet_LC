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
           {key: 'company_id', label: 'ID', layer: true, sortable: true},
           {key: 'company', label: 'Company', layer: true, sortable: true},
           {key: 'user_id', label: 'ID', layer: true, sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {info: 'info', update: 'update', delete: 'delete'}
       },
       goods: {
         hash: '#goods',
         options: {route: `goods-sellers`, name_id: 'good_id', byId: 2},
         fields: [
           {key: 'good_id', label: 'ID', layer: true, sortable: true},
           {key: 'name', label: 'Name', layer: true, sortable: true},
           {key: 'price', label: 'Price', layer: true, sortable: true},
           {key: 'company', label: 'Company', layer: true, sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {info: 'info', update: 'update', delete: 'delete'}
       },
       services: {
         hash: '#services',
         options: {route: `services`, name_id: 'service_id'},
         fields: [
           {key: 'service_id', label: 'ID', layer: true, sortable: true},
           {key: 'name', label: 'Name', layer: true, sortable: true},
           {key: 'price', label: 'Price', layer: true, sortable: true},
           {key: 'company', label: 'Company', layer: true, sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {info: 'info', update: 'update', delete: 'delete'}
       },
       users: {
         hash: '#users',
         options: {route: `users-staffs`, name_id: 'user_id'},
         fields: [
           {key: 'user_id', label: 'ID', layer: true, sortable: true},
           {key: 'firstname', label: 'Firstname', layer: true, sortable: true},
           {key: 'lastname', label: 'Lastname', layer: true, sortable: true},
           {key: 'mail', label: 'Email', layer: true, sortable: true},
           {key: 'role', label: 'Role', layer: true, sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {info: 'info', update: 'update', delete: 'delete'}
       },
       warehouses: {
         hash: '#warehouses',
         options: {route: 'warehouses', name_id: 'warehouse_id'},
         fields: [
           {key: 'warehouse_id', label: 'ID', layer: true, sortable: true},
           {key: 'number', label: 'Number', layer: true, sortable: true},
           {key: 'address', label: 'Address', layer: true, sortable: true},
           {key: 'phone', label: 'Phone', layer: true,sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {info: 'info', update: 'update', delete: 'delete'}
       },
       categories: {
         hash: '#categories',
         options: {route: 'categories', name_id: 'category_id'},
         fields: [
           {key: 'warehouse_id', label: 'ID', layer: true, sortable: true},
           {key: 'number', label: 'Number', layer: true, sortable: true},
           {key: 'address', label: 'Address', layer: true, sortable: true},
           {key: 'phone', label: 'Phone', layer: true,sortable: true},
           {key: 'actions', label: 'Actions'}],
         modals: {info: 'info', update: 'update', delete: 'delete'}
       }
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