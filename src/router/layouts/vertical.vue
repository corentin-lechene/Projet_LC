<script>

import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";


export default {
  components: {NavBar, Footer},
  data() {
    return {
      loader: true,
      admin: false,
    };
  },
  mounted() {
    document.getElementById("preloader").style.display = "block";
    document.getElementById("status").style.display = "block";
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }, 500);
  },
  created() {
    document.body.setAttribute("data-layout", "vertical");
  }
}
</script>

<template>
  <div>
    <div id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <!-- Begin page -->
    <div id="layout-wrapper">
      <!-- ============================================================== -->
      <!-- Start right Content here -->
      <!-- ============================================================== -->
      <NavBar/>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <slot/>
          </div>
          <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
        <Footer/>
      </div>
      <!-- end main content-->
    </div>
    <!-- END layout-wrapper -->
  </div>
</template>

<style scoped>

</style>