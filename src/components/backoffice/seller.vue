<script>

import Profile from "@/components/widgets/profile";
import AdminTable from "@/components/widgets/admin-table";
import {sendGetDataTable, sendGetUserByToken} from "@/components/requests-bdd";

export default {
  name: "sellers",
  components: {AdminTable, Profile},
  data() {
    return {
      chartOptions: {
        goods: {
          chart: {
            height: 350,
            type: 'area',
            toolbar: 'false',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 8,
              opacity: 0.2
            },
          },
          title: {
            text: "vente des biens",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: undefined,
              color: '#263238'
            },
          },
          xaxis: {
            type: 'datetime',
            categories: []
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#556ee6'],
          stroke: {
            curve: 'smooth',
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          }
        },
        services: {
          chart: {
            height: 350,
            type: 'area',
            toolbar: 'false',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 8,
              opacity: 0.2
            },
          },
          noData: {
            text: "Aucun achat",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '14px',
              fontFamily: undefined
            }
          },
          title: {
            text: "vente des services",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: undefined,
              color: '#263238'
            },
          },
          xaxis: {
            type: 'datetime',
            categories: []
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#55e688'],
          stroke: {
            curve: 'smooth',
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          }
        }
      },
      series: {
        goods: [],
        services: []
      },

      totalPriceGoods: 0,
      totalPriceServices: 0,

      roles: {
        goods: {
          hash: '#goods',
          options: {route: `goods-sellers`, name_id: 'good_id', byId: null},
          fields: [
            {key: 'online', label: 'Online', sortable: true},
            {key: 'good_id', label: 'ID', sortable: true},
            {key: 'name', label: 'Name', sortable: true},
            {key: 'price', label: 'Price', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'goods', info: 'info', update: 'goods', delete: 'delete'}
        },
        services: {
          hash: '#services',
          options: {route: `services-sellers`, name_id: 'service_id'},
          fields: [
            {key: 'service_id', label: 'ID', sortable: true},
            {key: 'name', label: 'Name', sortable: true},
            {key: 'price', label: 'Price', sortable: true},
            {key: 'company', label: 'Company', sortable: true},
            {key: 'actions', label: 'Actions'}],
          modals: {register: 'services', info: 'info', update: 'update', delete: 'delete'}
        },
      }
    };
  },
  async created() {
    const user = (await sendGetUserByToken()).result;
    this.roles.goods.options.byId = user.seller_id;
    this.roles.services.options.byId = user.seller_id;

    console.log("user: ", user);
    const data = (await sendGetDataTable('carts-dashboard', user.seller_id)).result;
    console.log("data: ", data);

    const goods = data.goods;
    const services = data.services;

    let g = {name: 'biens', data: []};
    let s = {name: 'services', data: []};

    //goods
    if(goods.length > 0) {
      this.chartOptions.goods.xaxis.categories.push(goods[0].seller_created_at);
      g.data.push(0);
    }
    for (let i = 0; i < goods.length; i++) {
      g.data.push(goods[i].total);
      this.chartOptions.goods.xaxis.categories.push(goods[i].created_at);
    }
    this.series.goods.push(g);

    //services
    if(services.length > 0) {
      s.data.push(0);
      this.chartOptions.services.xaxis.categories.push(goods[0].seller_created_at);
    }
    for (let i = 0; i < services.length; i++) {
      g.data.push(services[i].total);
      this.chartOptions.services.xaxis.categories.push(services[i].created_at);
    }
    this.series.services.push(s);

    this.totalPriceGoods = (goods.map(item => item.total_price).reduce((prev, curr) => prev + curr, 0)).toFixed(2)
    this.totalPriceServices = (services.map(item => item.total_price).reduce((prev, curr) => prev + curr, 0)).toFixed(2)
  }
}
</script>


<template>
  <div>
    <div v-if="$route.hash === '#dashboard'">
      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="avatar-xs mr-3">
                        <span
                            class="avatar-title rounded-circle bg-soft-primary text-primary font-size-18"
                        >
                          <i class="bx bx-copy-alt"></i>
                        </span>
                </div>
                <h5 class="font-size-14 mb-0">Revenue sur les biens</h5>
              </div>
              <div class="text-muted mt-4">
                <h4>
                  {{ totalPriceGoods }} €
                  <i class="mdi mdi-chevron-up ml-1 text-success"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="avatar-xs mr-3">
                      <span
                          class="avatar-title rounded-circle bg-soft-primary text-primary font-size-18"
                      >
                        <i class="bx bx-archive-in"></i>
                      </span>
                </div>
                <h5 class="font-size-14 mb-0">Revenue sur les services</h5>
              </div>
              <div class="text-muted mt-4">
                <h4>
                  {{ totalPriceServices }} €
                  <i class="mdi mdi-chevron-up ml-1 text-success"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="avatar-xs mr-3">
                      <span
                          class="avatar-title rounded-circle bg-soft-primary text-primary font-size-18"
                      >
                        <i class="bx bx-purchase-tag-alt"></i>
                      </span>
                </div>
                <h5 class="font-size-14 mb-0">Total de vos revenues</h5>
              </div>
              <div class="text-muted mt-4">
                <h4>
                  {{ parseFloat(totalPriceGoods) + parseFloat(totalPriceServices) }} €
                  <i class="mdi mdi-chevron-up ml-1 text-success"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <apexchart :options="chartOptions.goods" :series="series.goods" class="apex-charts" height="350" type="area"/>
        </div>
        <div class="col-6">
          <apexchart :options="chartOptions.services" :series="series.services" class="apex-charts" height="350"
                     type="area"/>
        </div>
      </div>
    </div>
    <Profile v-if="$route.hash === '#profile'"/>
    <span v-for="(role, i) in roles" :key="i">
      <AdminTable v-if="$route.hash === role.hash" :fields="role.fields" :modals="role.modals" :options="role.options"/>
    </span>
  </div>
</template>


<style scoped>

</style>