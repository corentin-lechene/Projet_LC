<template>
  <Layout>
    <div class="row">
      <div class="col-4">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/img-corentin.jpg')" img-alt="Card image" img-top>
          <b-card-title>
            <h5 class="card-title">Corentin Lechêne</h5>
          </b-card-title>
          <b-card-text>
            Chef Réseau
          </b-card-text>
          <b-button href="https://www.linkedin.com/in/corentin-lech%C3%AAne-8747091b8/" variant="primary">Linkedin</b-button>
        </b-card>
      </div>
      <div class="col-4">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/img-hadrien.jpg')" img-alt="Card image" img-top>
          <b-card-title>
            <h5 class="card-title">Hadrien Suryous</h5>
          </b-card-title>
          <b-card-text>
            Chef Développeur          </b-card-text>
          <b-button href="https://www.linkedin.com/in/hadrien-suryous-48a39b1b7/" variant="primary">Linkedin</b-button>
        </b-card>
      </div>
      <div class="col-4">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/carteloyalty.png')" img-alt="Card image" img-top>
          <b-card-title>
            <h5 class="card-title">Mattéo Solari</h5>
          </b-card-title>
          <b-card-text>
            Développeur          </b-card-text>
            <b-button href="https://www.linkedin.com/in/mattéo-solari/" variant="primary">Linkedin</b-button>
        </b-card>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "About us",
  },
  components: {
    Layout,
  },
  data() {
    return {

    };
  },
};
</script>


<style>

</style>
