<script>

import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";


export default {
  components: {NavBar, Footer},
  data() {
    return {};
  }
};
</script>

<template>
  <div id="layout-wrapper">
    <NavBar />
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <slot />
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->
      <Footer />
    </div>
  </div>
</template>
