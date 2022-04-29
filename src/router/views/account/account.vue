<script>

import SidebarMenu from "@/components/sidebar-menu";

import Admin from "@/components/backoffice/admin";
import Staff from "@/components/backoffice/staff";
import Company from "@/components/backoffice/company";
import Customer from "@/components/backoffice/customer"

import roles from "@/data/data-roles";
import Sellers from "@/components/backoffice/seller";
import {sendGetUserByToken} from "@/components/requests-bdd";


export default {
  page: {
    title: "Admin",
  },
  components: {Sellers, SidebarMenu, Admin, Staff, Company, Customer},
  data() {
    return {
      title: 'Admin',
      role: roles,

      user_role: null,
    }
  },
  mounted() {
    window.location.href = '#profile';
  },
  async created() {
    const user = await sendGetUserByToken();
    if(user !== undefined)
      this.user_role = user.result.role;
    else
      await this.$router.push('/404');
  }
}
</script>

<template>
  <div>
    <div v-if="user_role !== null">
      <SidebarMenu :menu-items="role[user_role]"></SidebarMenu>

      <!--    <b-button @click="user_role = 'admin'">Admin</b-button>
          <b-button @click="user_role = 'staffs'">staffs</b-button>
          <b-button @click="user_role = 'customers'">customers</b-button>
          <b-button @click="user_role = 'companies'">companies</b-button>
          <b-button @click="user_role = 'sellers'">sellers</b-button>-->

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h1 v-if="user_role === 'admin'" class="text-center">Espace Admin</h1>
              <h1 v-else-if="user_role === 'staffs'" class="text-center">Espace Staff</h1>
              <h1 v-else-if="user_role === 'customers'" class="text-center">Espace client</h1>
              <h1 v-else-if="user_role === 'companies'" class="text-center">Espace entreprise</h1>
              <h1 v-else-if="user_role === 'sellers'" class="text-center">Espace vendeur</h1>

              <Admin    v-if="user_role === 'admin'" />
              <Staff    v-else-if="user_role === 'staffs'" />
              <Company  v-else-if="user_role === 'companies'"/>
              <Customer v-else-if="user_role === 'customers'"/>
              <Sellers  v-else-if="user_role === 'sellers'"/>
            </div>
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
  </div>
</template>