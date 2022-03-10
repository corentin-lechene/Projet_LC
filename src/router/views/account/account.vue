<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'

import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

import Admin from "@/components/widgets/backoffice/admin";

import {tableData} from "@/data/data-tables";

import {roleData} from "@/data/data-role";


export default {
  page: {
    title: "Admin",
  },
  components: {Layout, PageHeader, VueSidebarMenuAkahon, Admin},
  data() {
    return {
      title: 'Admin',
      profile: [],
      tableData,
      roleData,

      width: 250,
      currentPage: 'user',


      tabs: {
        customers: {
          title: "Liste des clients",
          btn: "Ajouter un client",
          tables: "customers",
          form: 'register',
          route: 'customers'
        },
        companies: {
          title: "Liste des entreprises",
          btn: "Ajouter une entreprise",
          tables: "other",
          form: 'register',
          route: 'companies'
        },
        sellers: {
          title: "Liste des commerçants",
          btn: "Ajouter un commerçant",
          tables: "other",
          form: 'register',
          route: 'sellers'
        },
        staffs: {
          title: "Liste des employés",
          btn: "Ajouter un employé",
          tables: "staffs",
          form: 'register',
          route: 'staffs'
        },
        goods: {
          title: "Liste des biens",
          btn: "Ajouter un bien",
          tables: "goods",
          form: 'register',
          route: 'goods'
        },
        services: {
          title: "Liste des services",
          btn: "Ajouter un service",
          tables: "services",
          form: 'register',
          route: 'goods'
        },
      },

    }
  },

}
</script>

<template>
  <Layout>
    <VueSidebarMenuAkahon :menu-items="roleData.admin"></VueSidebarMenuAkahon>
    <PageHeader :title="title"/>


    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
              <Admin />

          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

  </Layout>
</template>