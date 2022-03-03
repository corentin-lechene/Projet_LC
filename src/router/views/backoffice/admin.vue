<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';
import Table from '@/components/widgets/table';
import {tableData} from "@/data/data-tables";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
/**
 * Products-order component
 */
export default {
  page: {
    title: "Admin",
  },
  components: {Layout, PageHeader, Table},
  data() {
    return {
      title: 'Admin',
      profile: [],
      tableData,
    }
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <b-tabs vertical justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Liste d'utilisateurs</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste d'utilisateurs</h4>
                        <Table :tables="tableData.customer" role="customer"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>