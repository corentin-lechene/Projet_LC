<script>

import AdminTable from "@/components/widgets/admin-table";

export default {
  name: "sellers",
  components: {AdminTable},
  data() {
    return {

      roles: {
        goods: {
          hash: '#goods',
          options: {route: `goods-sellers`, name_id: 'good_id', byId: 2},
          fields: [
            {key: 'good_id', label: 'ID', sortable: true},
            {key: 'name', label: 'Name', sortable: true},
            {key: 'price', label: 'Price', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {info: 'info', update: 'update', delete: 'delete'}
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
          modals: {info: 'info', update: 'update', delete: 'delete'}
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