<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';
import Table from '@/components/widgets/table';
import {tableData} from "@/data/data-tables";
import Form from '@/components/widgets/form';
import {formData} from "@/data/data-forms";

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
  components: {Layout, PageHeader, Table, Form},
  data() {
    return {
      title: 'Admin',
      profile: [],
      tableData,
      formData,

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
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <b-tabs pills card justified content-class="p-3 text-muted">
              <b-tab v-for="(tab, i) in tabs" :key="i" :title="tab.title" active>
                <b-card-text>
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h1 class="card-title text-center" style="font-size: 2em">{{ tab.title }}</h1>
                          <Table :tables="tableData[tab.tables]" :route="tab.route"/>
                          <b-button v-b-modal.add>add</b-button>
                          <b-modal id="add" title="Ajouter un client" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">

                                  <Form :forms="formData.register" :insert="{route: tab.route}"/>

                                </div>
                              </div>
                            </div>
                          </b-modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-card-text>
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