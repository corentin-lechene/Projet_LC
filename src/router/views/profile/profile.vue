<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Orders from '@/components/widgets/orders'
import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";
import Qrcode from 'v-qrcode/src/index'

/**
 * Products-order component
 */
export default {
  props: {
    user_id: {
      type: Number,
      default: null
    }
  },
  page: {
    title: "Profile",
  },
  components: { Layout, PageHeader, Orders, Qrcode},
  data() {
    return {
      qrCls: 'qrcode',
      size: 100,
      background: 'white',
      token: null,
      title: 'Profile',
      valuesForm:{},
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
    }
  },
  methods: {
    getUsers(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res))
        {this.valuesForm = res.result;}

      })
    }
  },
  mounted() {
    this.getUsers('users', this.user_id);
  },
  created() {
    if (localStorage.user_token) {
      this.token = localStorage.getItem('user_token');
    }
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">

        <div class="card">
          <div class="card-body">
            <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Profil</span>
                </template>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 style="font-size: large; padding-left: 5%;" class="card-title">Vos informations</h4>
                        <div class="row" style="height: 25px; width: 100%;"></div>
                        <div class="row">
                          <div class="col-2"></div>
                          <div class="col-10">
                            <div class="row" style="width: 100%;">
                              <div class="col-6">Nom
                                <div class="row" style="height: 5px; width: 100%;"></div>
                              </div>
                              <div class="col-6">Prénom
                                <div class="row" style="height: 5px; width: 100%;"></div>
                              </div>
                            </div>
                            <div class="row" style="width: 100%;">
                              <div class="col-6">
                                <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                              v-model="valuesForm.lastname"></b-form-input>
                              </div>
                              <div class="col-6">
                                <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                              v-model="valuesForm.firstname"></b-form-input>
                              </div>
                            </div>
                            <div class="row" style="height: 35px; width: 100%;"></div>
                            <div class="row" style="width: 100%;">
                              <div class="col-6">Téléphone
                                <div class="row" style="height: 5px; width: 100%;"></div>
                              </div>
                              <div class="col-6">Email
                                <div class="row" style="height: 5px; width: 100%;"></div>
                              </div>
                            </div>
                            <div class="row" style="width: 100%;">
                              <div class="col-6">
                                <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                              v-model="valuesForm.phone"></b-form-input>
                              </div>
                              <div class="col-6">
                                <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                              v-model="valuesForm.mail"></b-form-input>
                              </div>
                            </div>
                            <div class="row" style="height: 35px; width: 100%;"></div>
                            <div class="row" style="width: 100%;">
                              <div class="col-6">Adresse
                                <div class="row" style="height: 5px; width: 100%;"></div>
                              </div>
                              <div class="col-6">Code postal
                                <div class="row" style="height: 5px; width: 100%;"></div>
                              </div>
                            </div>
                            <div class="row" style="width: 100%;">
                              <div class="col-6">
                                <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                              v-model="valuesForm.address"></b-form-input>
                              </div>
                              <div class="col-6">
                                <b-form-input id="input-default" style="width: 80%; text-align: center;" readonly
                                              v-model="valuesForm.postal_code"></b-form-input>
                              </div>
                            </div>
                            <div class="row" style="height: 35px; width: 100%;"></div>
                          </div>
                        </div>
                        <div style="float: right">
                          <b-button variant="success" class="w-md">Modifier mon profil</b-button>
                        </div>
                      </div>
                      <!-- end col -->
                    </div>
                  </div>
                </div>


              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Historique</span>
                </template>
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-2">
                      <div class="col-sm-4">
                        <div class="search-box mr-2 mb-2 d-inline-block">
                          <div class="position-relative">
                            <input type="text" class="form-control" placeholder="Search..." />
                            <i class="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-8">
                      </div>
                      <!-- end col-->
                    </div>
                    <!-- Table data -->
                    <Orders :orders="orders" />
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
                  <span class="d-none d-sm-inline-block">Paramètres</span>
                </template>
                <div class="row">
                  <div class="col-1"></div>
                  <div class="col-2">
                    <p style="font-size: large;"> La newsletter </p>
                  </div>
                  <div class="col-5">
                    <input type="text" class="form-control" placeholder="Votre email" />

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
                <qrcode :background="background" :size="size" :cls="qrCls" :value="token"></qrcode>
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