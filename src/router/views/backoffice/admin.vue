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
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Liste des clients</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste des clients</h4>
                        <Table :tables="tableData.customer" :options="{route: 'customers', role: 'customers'}"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-md-inline-block"
                        style="margin-top: 10%;">Liste des entreprises partenaires</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste des entreprise partenaires</h4>
                        <Table :tables="tableData.other" :options="{route: 'companies', role: 'companies'}"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Liste des commerçants</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste des commerçants</h4>
                        <Table :tables="tableData.other" :options="{route: 'sellers', role: 'sellers'}"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Liste des employés</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste des employés</h4>
                        <Table :tables="tableData.staff" :options="{route: 'staffs', role: 'staffs'}"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Liste des biens</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste des biens</h4>
                        <Table :tables="tableData.good" :options="{route: 'goods', role: 'goods'}"></Table>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Liste des services</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Liste des services</h4>
                        <Table :tables="tableData.service" :options="{route: 'services', role: 'services'}"></Table>
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