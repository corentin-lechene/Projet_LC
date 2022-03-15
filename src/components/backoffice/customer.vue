<script>

import AdminTable from "@/components/widgets/admin-table";
import Profile from "@/components/widgets/profile";

import forms from "@/data/data-forms";

export default {
  name: "customer",
  components: {AdminTable, Profile},
  data() {
    return {

      forms,

      roles: {

      }

    };
  }

}
</script>


<template>
  <div>
    <Profile />
    <span v-for="(role, i) in roles" :key="i">
      <AdminTable v-if="$route.hash === role.hash" :options="role.options" :fields="role.fields" :modals="role.modals"/>
    </span>
  </div>
</template>


<style scoped>

</style>