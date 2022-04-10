<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'

import SidebarMenu from "@/components/sidebar-menu";

import Admin from "@/components/backoffice/admin";
import Staff from "@/components/backoffice/staff";
import Company from "@/components/backoffice/company";
import Customer from "@/components/backoffice/customer"

import roles from "@/data/data-roles";
import Sellers from "@/components/backoffice/seller";


export default {
  page: {
    title: "Admin",
  },
  components: {Sellers, Layout, PageHeader, SidebarMenu, Admin, Staff, Company, Customer},
  data() {
    return {
      title: 'Admin',
      role: roles,

      user_role: 'admin',
    }
  },
  mounted() {
    window.location.href = '#profile';
  }
}
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <SidebarMenu :menu-items="role[user_role]"></SidebarMenu>

    <b-button @click="user_role = 'admin'">Admin</b-button>
    <b-button @click="user_role = 'staffs'">staffs</b-button>
    <b-button @click="user_role = 'customers'">customers</b-button>
    <b-button @click="user_role = 'companies'">companies</b-button>
    <b-button @click="user_role = 'sellers'">sellers</b-button>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center">Role : {{user_role}}</h1>
            <Admin v-if="user_role === 'admin'" />
            <Staff v-else-if="user_role === 'staffs'" />
            <Company v-else-if="user_role === 'companies'"/>
            <Customer v-else-if="user_role === 'customers'"/>
            <Sellers v-else-if="user_role === 'sellers'"/>
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

  </Layout>
</template>