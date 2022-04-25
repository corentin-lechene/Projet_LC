<script>

import AdminTable from "@/components/widgets/admin-table";
import Profile from "@/components/widgets/profile";
import {sendGetUserByToken} from "@/components/requests-bdd";

export default {
  name: "company",
  components: {AdminTable, Profile},
  data() {
    return {
      company: {},
      roles:{
        customers: {
          hash: '#customers',
          options: {route: `customers-companies`, name_id: 'user_id', byId: null},
          fields: [
            {key: 'online', label: 'Online', sortable: true},
            {key: 'customer_id', label: 'ID', sortable: true},
            {key: 'firstname', label: 'Firstname', sortable: true},
            {key: 'lastname', label: 'Lastname', sortable: true},
            {key: 'mail', label: 'Email', sortable: true},
            {key: 'phone', label: 'Phone', sortable: true},
            {key: 'user_id', thClass: 'd-none', tdClass: 'd-none'},
            {key: 'actions', label: 'Actions'}
          ],
          modals: {register: 'customers', info: 'CompanyDetail', update: 'update', delete: 'delete'}
        },
      }

    };
  },
  async created() {
    const company = await sendGetUserByToken();
    this.user_role = company.result.role; //TODO si pas de user redirection + msg
    this.company = company.result;
    this.roles.customers.options.byId = this.company.company_id;
  }
}
</script>


<template>
  <div>
    <Profile v-if="$route.hash === '#profile'"/>
    <span v-for="(role, i) in roles" :key="i">
      <AdminTable v-if="$route.hash === role.hash" :options="role.options" :fields="role.fields" :modals="role.modals"/>
    </span>
    <div v-if="$route.hash === '#settings'">
      <h4>Votre revenue de cette année : {{ company.revenue }} €</h4>
      <h4>La cotisation entreprise : {{ company.contribution }} €</h4>
    </div>
  </div>
</template>


<style scoped>

</style>