<script>

import i18n from "@/i18n";
import Qrcode from 'v-qrcode/src/index'
import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  props: {
    user_id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      user: {},
      id:null,
      qrCls: 'qrcode',
      size: 100,
      background: '#F3ECEC',
      token: null,
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "Spanish",
        }
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
    }
  },
  components: {
    Qrcode,
  },
  methods: {
    getUsers() {
      let promise = sendGetDataTable('users', this.user_id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.user = res.result;
        }
      })
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      i18n.locale = locale;
    },
  },
  mounted() {
    this.getUsers();
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  created() {
    if (localStorage.user_token) {
      this.token = localStorage.getItem('user_token');
    }
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex" style="margin-left: 13%">
        <div class="d-flex">
          <!-- Logo -->
          <div class="d-flex" style="padding-left: 5px;">
            <router-link tag="a" to="/">
              <img alt class="rounded avatar-sm" src="@/assets/images/logolc.png" style="margin-top: 5px;"/>
            </router-link>
          </div>


          <!-- Boutton Offers-->
          <div class="d-flex">
            <router-link class="text-dark" tag="a" to="/offers-partners">
              <b-button style="padding-top: 17%;" variant="white">Offres partenaires</b-button>
            </router-link>
          </div>

          <!-- Boutton LCshop-->
          <div class="d-flex">
            <router-link class="text-dark" tag="a" to="/lc-shop">
              <b-button style="padding-top: 31%;" variant="white">LC Shop</b-button>
            </router-link>
          </div>

          <!-- App Search-->
          <!--        <form class="app-search d-none d-lg-block">
                    <div class="position-relative">
                      <input type="text" class="form-control" :placeholder="$t('navbar.search')" />
                      <span class="bx bx-search-alt"></span>
                    </div>
                  </form>-->
        </div>
      </div>
      <!-- Boutton Admin -->
      <div class="button-items">
        <router-link class="text-dark" tag="a" to="/admin#profile">
          <b-button variant="primary">Admin</b-button>
        </router-link>
      </div>

      <!-- Dropdown profile-->
      <div class="d-flex" style="margin-right: 11%">
        <b-dropdown
            class="d-inline-block d-lg-none ml-2"
            menu-class="dropdown-menu-lg p-0"
            right
            toggle-class="header-item noti-icon"
            variant="black"
        >
          <template v-slot:button-content>
            <i class="mdi mdi-magnify"></i>
          </template>

          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                    aria-label="Recipient's username"
                    class="form-control"
                    placeholder="Search ..."
                    type="text"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>


        <div>
        <span v-if="token">
        <div class="d-flex" style="margin-right: 10px">
          <b-button v-b-modal.modal-standard style="background-color: white; border-color: white;">
            <div>
              <img alt class="avatar-sm" src="@/assets/images/pictocarte.png"/>
            </div>
          </b-button>
          <div>
          <b-modal id="modal-standard" :title="$t('nav-bar.cart.loyalty-card')" title-class="font-18">
          <div style="position:relative; height:250px">
            <div style="position:absolute;z-index:1">
              <img
                  alt="200x200"
                  data-holder-rendered="true"
                  src="@/assets/images/cartevidee.png"
                  width="460"
              />
              </div>
            <div style="position:absolute;top:50%; left: 40%; z-index:2;">
              <qrcode :background="background" :size="size" :cls="qrCls" :value="token"></qrcode>
              <div class="row">
                <div class="card">
                  <h5 class="text-truncate">{{ user.firstname }}</h5>
                  <h5 class="text-truncate">{{ user.lastname }}</h5>
                </div>
              </div>
              </div>

          </div>
            </b-modal>
          </div>
        </div>
              </span>
          <span v-else>
          <div class="d-flex" style="margin-right: 15px">
          <router-link tag="a" to="/loyalty-card">
          <img src="@/assets/images/pictocarte.png" alt class="rounded avatar-sm" style="margin-top: 5px;"/>
          </router-link>
        </div>
        </span>
        </div>




        <!-- Picto cart -->
        <div class="d-flex" style="margin-right: 15px">
          <router-link tag="a" to="/cart">
            <img alt class="rounded avatar-sm" src="@/assets/images/Pictocart.png"
                 style="margin-top: 10px; height: 40px;"/>
          </router-link>
        </div>

        <!-- Picto profile -->
        <b-dropdown v-if="token" right toggle-class="header-item" variant="black">
          <template v-slot:button-content>
            <img
                alt="Header Avatar"
                class="rounded-circle header-profile-user"
                src="@/assets/images/users/avatar-1.jpg"
            />
            <span class="d-none d-xl-inline-block ml-1"></span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link tag="span" to="/admin#profile">
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              {{ $t('nav-bar.profile.text') }}
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item href="/admin#orders">
            <i class="bx bx-wallet font-size-16 align-middle mr-1"></i>
            {{ $t('nav-bar.profile.orders') }}
          </b-dropdown-item>
          <b-dropdown-item class="d-block" href="/profile">
            <span class="badge badge-success float-right">11</span>
            <i class="bx bx-wrench font-size-16 align-middle mr-1"></i>
            {{ $t('nav-bar.profile.settings') }}
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <router-link class="dropdown-item text-danger" to="/logout">
            <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            {{ $t('g.logout') }}
          </router-link>
        </b-dropdown>

        <b-dropdown v-else right toggle-class="header-item" variant="black">
          <template v-slot:button-content>
            <img
                alt="Header Avatar"
                class="rounded-circle header-profile-user"
                src="@/assets/images/users/avatar-1.jpg"
            />
            <span class="d-none d-xl-inline-block ml-1"></span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link tag="span" to="/login">
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              {{ $t('g.login') }}
            </router-link>
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
          </template>
          <b-dropdown-item
              class="notify-item"
              v-for="(entry, i) in languages"
              :key="`Lang${i}`"
              :value="entry"
              @click="setLanguage(entry.language, entry.title, entry.flag)"
              :class=" {'active' : lan === entry.language}"
          >
            <img :src="`${entry.flag}`" alt="user-image" class="mr-1" height="12" />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>

      </div>
    </div>
  </header>
</template>

<style>
.contenant {
  position: relative;
  text-align: center;
}
.texte-hover {
  position: absolute;
  z-index:2;
}
</style>