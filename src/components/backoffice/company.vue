<script>

import AdminTable from "@/components/widgets/admin-table";
import Profile from "@/components/widgets/profile";

import forms from "@/data/data-forms";

export default {
  name: "company",
  components: {AdminTable, Profile},
  data() {
    return {

      forms,

      roles:{
        customers: {
          hash: '#customers',
          options: {route: `customers-companies`, name_id: 'user_id', byId: 1},
          fields: [
            {key: 'customer_id', label: 'ID', sortable: true},
            {key: 'firstname', label: 'Firstname', sortable: true},
            {key: 'lastname', label: 'Lastname', sortable: true},
            {key: 'mail', label: 'Email', sortable: true},
            {key: 'phone', label: 'Phone', sortable: true},
            {key: 'user_id', thClass: 'd-none', tdClass: 'd-none'},
            {key: 'actions', label: 'Actions'}],
          modals: {info: 'UserDetail', update: 'update', delete: 'delete'}
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