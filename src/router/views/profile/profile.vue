<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Transaction from '@/components/widgets/transaction'
import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';
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
    title: "Profile",
  },
  components: {Layout, PageHeader, Transaction, Form},
  data() {
    return {
      title: 'Profile',
      formData,
      items: [
        {
          text: 'Ecommerce',
          href: '/',
        },
        {
          text: 'Orders',
          active: true,
        },
      ],
      transactions: [
        {
          id: '#SK2540',
          name: 'Neal Matthews',
          date: '07 Oct, 2019',
          total: '$400',
          status: 'Paid',
          payment: ['fab fa-cc-mastercard', 'Mastercard'],
          index: 1,
        },
        {
          id: '#SK2541',
          name: 'Jamal Burnett',
          date: '07 Oct, 2019',
          total: '$380',
          status: 'Chargeback',
          payment: ['fab fa-cc-visa', 'Visa'],
          index: 2,
        },
        {
          id: '#SK2542',
          name: 'Juan Mitchell',
          date: '06 Oct, 2019',
          total: '$384',
          status: 'Paid',
          payment: ['fab fa-cc-paypal', 'Paypal'],
          index: 3,
        },
        {
          id: '#SK2543',
          name: 'Barry Dick',
          date: '05 Oct, 2019',
          total: '$412',
          status: 'Paid',
          payment: ['fab fa-cc-mastercard', 'Mastercard'],
          index: 4,
        },
        {
          id: '#SK2544',
          name: 'Ronald Taylor',
          date: '04 Oct, 2019',
          total: '$404',
          status: 'Refund',
          payment: ['fab fa-cc-visa', 'Visa'],
          index: 5,
        },
        {
          id: '#SK2545',
          name: 'Jacob Hunter',
          date: '04 Oct, 2019',
          total: '$392',
          status: 'Paid',
          payment: ['fab fa-cc-paypal', 'Paypal'],
          index: 6,
        },
        {
          id: '#SK2546',
          name: 'William Cruz',
          date: '03 Oct, 2019',
          total: '$374',
          status: 'Paid',
          payment: ['fas fa-money-bill-alt', 'COD'],
          index: 7,
        },
        {
          id: '#SK2547',
          name: 'Dustin Moser',
          date: '02 Oct, 2019',
          total: '$350',
          status: 'Paid',
          payment: ['fab fa-cc-mastercard', 'Mastercard'],
          index: 8,
        },
        {
          id: '#SK2548',
          name: 'Clark Benson',
          date: '01 Oct, 2019',
          total: '$345',
          status: 'Refund',
          payment: ['fab fa-cc-visa', 'Visa'],
          index: 9,
        },
      ],
    }
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
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
                  <span class="d-none d-md-inline-block" style="margin-top: 10%;">Mes informations</span>
                </template>
                <div class="row">
                  <b-modal id="modal-1" title="Modifier mes informations" hide-footer size="lg" centered>
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h4 style="font-size: large; padding-left: 5%;" class="card-title">Vos informations</h4>
                          <Form :forms="formData.customer" :options="{route: 'users', method: 'update'}" role="update"/>
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
                      >Modifier mes informations</a>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block" style="margin-top: 10%;">Mes commandes</span>
                </template>
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-2">
                      <div class="col-sm-4">
                        <div class="search-box mr-2 mb-2 d-inline-block">
                          <div class="position-relative">
                            <input type="text" class="form-control" placeholder="Search..."/>
                            <i class="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-8">
                      </div>
                      <!-- end col-->
                    </div>
                    <!-- Table data -->
                    <Transaction :transactions="transactions"/>
                    <ul class="pagination pagination-rounded justify-content-end mb-2">
                      <li class="page-item disabled">
                        <a class="page-link" href="javascript: void(0);" aria-label="Previous">
                          <i class="mdi mdi-chevron-left"></i>
                        </a>
                      </li>
                      <li class="page-item active">
                        <a class="page-link" href="javascript: void(0);">1</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="javascript: void(0);">2</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="javascript: void(0);">3</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="javascript: void(0);">4</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="javascript: void(0);">5</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="javascript: void(0);" aria-label="Next">
                          <i class="mdi mdi-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <!-- end card-body -->
                </div>
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-none d-sm-inline-block" style="margin-top: 10%;">Ma carte de fidélité</span>
                </template>


              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-sm-flex" style="margin-top: 10%;">Mes paramètres</span>
                </template>
                <div class="row">
                  <div class="col-1"></div>
                  <div class="col-2">
                    <p style="font-size: large;"> La newsletter </p>
                  </div>
                  <div class="col-5">
                    <input type="text" class="form-control" placeholder="Votre email"/>

                  </div>
                  <div class="col-4">
                    <b-button variant="success" class="w-md">Je m'abonne</b-button>
                  </div>
                </div>
                <div class="row" style="height: 10px;"></div>
                <div class="row">
                  <div class="col-1"></div>
                  <div class="col-2" style="font-size: medium">Changer la langue</div>
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