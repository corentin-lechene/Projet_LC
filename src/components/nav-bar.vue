<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex" style="margin-left: 13%">
      <div class="d-flex">
        <!-- Logo -->
        <div class="d-flex" style="padding-left: 5px;">
          <a href="">
          <img src="@/assets/images/logolc.png" alt class="rounded avatar-sm" style="margin-top: 5px;"/>
          </a>
        </div>

        <!-- Boutton Offers-->
        <div class="d-flex">
        <b-button variant="white">Offres partenaires</b-button>
        </div>

        <!-- Boutton LCshop-->
        <div class="d-flex">
          <b-button variant="white">LC Shop</b-button>
        </div>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" />
            <span class="bx bx-search-alt"></span>
          </div>
        </form>
      </div>
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
        <div class="d-flex" style="margin-right: 15px">
          <a href="">
          <img src="@/assets/images/pictocarte.png" alt class="rounded avatar-sm" style="margin-top: 5px;" />
          </a>
        </div>

        <!-- Picto cart -->
        <div class="d-flex" style="margin-right: 15px" >
          <a href="">
          <img src="@/assets/images/Pictocart.png" alt class="rounded avatar-sm" style="margin-top: 10px; height: 40px;" />
          </a>
        </div>

        <!-- Picto profile -->
        <b-dropdown right variant="black" toggle-class="header-item">
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
            <router-link tag="span" to="/contacts/profile">
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              {{ $t('Profile') }}
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item href="/contacts/myhistory">
            <i class="bx bx-wallet font-size-16 align-middle mr-1"></i>
            {{ $t('History') }}
          </b-dropdown-item>
          <b-dropdown-item class="d-block" href="javascript: void(0);">
            <span class="badge badge-success float-right">11</span>
            <i class="bx bx-wrench font-size-16 align-middle mr-1"></i>
            {{ $t('Settings') }}
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <a href="" class="dropdown-item text-danger">
            <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            {{ $t('Logout') }}
          </a>
        </b-dropdown>


      </div>
    </div>
  </header>
</template>
