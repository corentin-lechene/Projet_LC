<script>

import AdminTable from "@/components/widgets/admin-table";

export default {
  name: "admin",
  components: {AdminTable},
  data() {
   return {

     goods: {
       options: {route: `goods`, name_id: 'good_id'},
       fields: [
         {key: 'good_id', label: 'ID', layer: true, sortable: true},
         {key: 'name', label: 'Name', layer: true, sortable: true},
         {key: 'price', label: 'Price', layer: true, sortable: true},
         {key: 'company', label: 'Company', layer: true, sortable: true},
         {key: 'actions', label: 'Actions'}],
       modals: {info: 'info', update: 'update', delete: 'delete'}
     },
   };
  }

}
</script>


<template>
  <div>
    <AdminTable v-if="$route.hash === '#goods'" :options="goods.options" :fields="goods.fields" :modals="goods.modals"/>
  </div>
</template>


<style scoped>

</style>