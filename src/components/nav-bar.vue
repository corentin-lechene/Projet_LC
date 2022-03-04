<script>

export default {
  data() {
    return {
      token: null,
    }
  },
  created() {
    if(localStorage.user_token) {
      this.token = localStorage.getItem('user_token');
    }
  }
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
            <img src="@/assets/images/logolc.png" alt class="rounded avatar-sm" style="margin-top: 5px;"/>
            </router-link>
        </div>


        <!-- Boutton Offers-->
        <div class="d-flex">
          <router-link tag="a" class="text-dark" to="/offers-partners">
        <b-button variant="white" style="padding-top: 17%;">Offres partenaires</b-button>
          </router-link>
        </div>

        <!-- Boutton LCshop-->
        <div class="d-flex">
          <router-link tag="a" class="text-dark" to="/lc-shop">
          <b-button variant="white" style="padding-top: 31%;">LC Shop</b-button>
          </router-link>
        </div>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input type="text" class="form-control" :placeholder="$t('navbar.search')" />
            <span class="bx bx-search-alt"></span>
          </div>
        </form>
      </div>
      </div>
      <!-- Boutton Admin -->
      <div class="button-items">
        <router-link tag="a" class="text-dark" to="/admin">
        <b-button variant="primary">Admin</b-button>
        </router-link>
      </div>

      <!-- Dropdown profile-->
      <div class="d-flex" style="margin-right: 11%">
        <b-dropdown
          class="d-inline-block d-lg-none ml-2"
          variant="black"
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          right
        >
          <template v-slot:button-content>
            <i class="mdi mdi-magnify"></i>
          </template>

          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
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

        <!-- Picto LC card -->

        <!-- <div class="d-flex" style="margin-right: 15px">
          <router-link tag="a" to="/loyalty-card">
          <img src="@/assets/images/pictocarte.png" alt class="rounded avatar-sm" style="margin-top: 5px;" />
          </router-link>
        </div>-->

        <div class="d-flex" style="margin-right: 10px">
          <b-button v-b-modal.modal-standard style="background-color: white; border-color: white;">
            <div>
            <img src="@/assets/images/pictocarte.png" alt class="avatar-sm"/>
            </div>
          </b-button>
          <div class="contenant">
          <b-modal id="modal-standard" title="Ma carte de fidélité" title-class="font-18">
            <img
                alt="200x200"
                width="460"
                src="@/assets/images/cartevide.png"
                data-holder-rendered="true"
            />
          </b-modal>
          </div>
        </div>

        <!-- Picto cart -->
        <div class="d-flex" style="margin-right: 15px" >
          <router-link tag="a" to="/cart">
          <img src="@/assets/images/Pictocart.png" alt class="rounded avatar-sm" style="margin-top: 10px; height: 40px;" />
          </router-link>
        </div>

        <!-- Picto profile -->
        <b-dropdown v-if="token" right variant="black" toggle-class="header-item">
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1"></span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link tag="span" to="/profile">
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              {{ $t('navbar.profile.text') }}
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item href="/profile">
            <i class="bx bx-wallet font-size-16 align-middle mr-1"></i>
            {{ $t('navbar.profile.orders') }}
          </b-dropdown-item>
          <b-dropdown-item class="d-block" href="/profile">
            <span class="badge badge-success float-right">11</span>
            <i class="bx bx-wrench font-size-16 align-middle mr-1"></i>
            {{ $t('navbar.profile.settings') }}
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <router-link to="/logout" class="dropdown-item text-danger">
            <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            {{ $t('navbar.profile.logout') }}
          </router-link>
        </b-dropdown>

        <b-dropdown v-else right variant="black" toggle-class="header-item">
          <template v-slot:button-content>
            <img
                class="rounded-circle header-profile-user"
                src="@/assets/images/users/avatar-1.jpg"
                alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1"></span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link tag="span" to="/login">
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              Se connecter
            </router-link>
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
  color: red;
}
</style>