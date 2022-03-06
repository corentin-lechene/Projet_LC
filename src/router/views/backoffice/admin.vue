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
                        <Table :tables="tableData.customer" :options="{route: 'users', role: 'customers'}"/>
                        <div class="row">
                          <b-modal id="modal-1" title="Ajouter un client" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h4 style="font-size: large;" class="card-title">Ajouter les information</h4>

                                  <Form :forms="formData.register" :insert="{route: 'customers'}"/>

                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <div class="row" style="width: 100%;">
                            <div class="col-5"></div>
                            <div class="col-7">
                              <a
                                  class="popup-form btn btn-primary"
                                  href="javascript: void(0);"
                                  v-b-modal.modal-1
                              >Ajouter un client</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab >
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
                        <div class="row">
                          <b-modal id="modal-2" title="Ajouter une entreprise" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h4 style="font-size: large;" class="card-title">Ajouter les informations</h4>
                                  <Form :forms="formData.register" :insert="{route: 'companies'}"/>
                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <div class="row" style="width: 100%;">
                            <div class="col-5"></div>
                            <div class="col-7">
                              <a
                                  class="popup-form btn btn-primary"
                                  href="javascript: void(0);"
                                  v-b-modal.modal-2
                              >Ajouter une entreprise</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab >
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
                        <div class="row">
                          <b-modal id="modal-3" title="Ajouter un commerçant" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h4 style="font-size: large;" class="card-title">Ajouter les informations</h4>
                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <div class="row" style="width: 100%;">
                            <div class="col-5"></div>
                            <div class="col-7">
                              <a
                                  class="popup-form btn btn-primary"
                                  href="javascript: void(0);"
                                  v-b-modal.modal-3
                              >Ajouter un commerçant</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab >
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
                        <div class="row">
                          <b-modal id="modal-4" title="Ajouter un employé" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h4 style="font-size: large;" class="card-title">Ajouter les informations</h4>
                                  <Form :forms="formData.register" :insert="{route: 'staffs'}"/>
                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <div class="row" style="width: 100%;">
                            <div class="col-5"></div>
                            <div class="col-7">
                              <a
                                  class="popup-form btn btn-primary"
                                  href="javascript: void(0);"
                                  v-b-modal.modal-4
                              >Ajouter un employé</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab >
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
                        <div class="row">
                          <b-modal id="modal-5" title="Ajouter un bien" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h4 style="font-size: large;" class="card-title">Ajouter les informations</h4>
                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <div class="row" style="width: 100%;">
                            <div class="col-5"></div>
                            <div class="col-7">
                              <a
                                  class="popup-form btn btn-primary"
                                  href="javascript: void(0);"
                                  v-b-modal.modal-5
                              >Ajouter un bien</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab >
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
                        <div class="row">
                          <b-modal id="modal-6" title="Ajouter un service" hide-footer size="lg">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h4 style="font-size: large;" class="card-title">Ajouter les informations</h4>
                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <div class="row" style="width: 100%;">
                            <div class="col-5"></div>
                            <div class="col-7">
                              <a
                                  class="popup-form btn btn-primary"
                                  href="javascript: void(0);"
                                  v-b-modal.modal-6
                              >Ajouter un service</a>
                            </div>
                          </div>
                        </div>
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