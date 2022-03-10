<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'

import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

import Admin from "@/components/widgets/backoffice/admin";

import role from "@/data/role";


export default {
  page: {
    title: "Admin",
  },
  components: {Layout, PageHeader, VueSidebarMenuAkahon, Admin},
  data() {
    return {
      title: 'Admin',
      profile: [],

      role,
    }
  },

}
</script>

<template>
  <Layout>
    <VueSidebarMenuAkahon :menu-items="role.admin"></VueSidebarMenuAkahon>
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