<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Transaction from '@/components/widgets/transaction'
/**
 * Products-order component
 */
export default {
  page: {
    title: "Profile",
  },
  components: { Layout, PageHeader, Transaction },
  data() {
    return {
      title: 'Profile',
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
                        <h4 style="font-size: large;" class="card-title">Vos informations</h4>
                        <div class="row" style="height: 15px;"> </div>
                        <div class="table-responsive mb-0">
                          <table class="table table-bordered table-striped">
                            <tbody>
                            <tr>
                              <th class="text-nowrap" scope="row">Prénom</th>
                              <td>Mattéo</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Nom</th>
                              <td>Solari</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Né(e) le</th>
                              <td>16/01/2002</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">E-mail</th>
                              <td>22matteoz@gmail.com</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Mot de passe</th>
                              <td>*********</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Téléphone</th>
                              <td>0658585858</td>
                            </tr><tr>
                              <th class="text-nowrap" scope="row">Adresse de livraison</th>
                              <td>12 avenue de la liberté</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Adresse de facturation</th>
                              <td>12 avenue de la liberté</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div style="float: right">
                      <b-button variant="success" class="w-md">Modifier mon profil</b-button>
                    </div>
                  </div>
                  <!-- end col -->
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
                    <Transaction :transactions="transactions" />
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