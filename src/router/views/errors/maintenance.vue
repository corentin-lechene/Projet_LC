<script>


import {sendGetDataTable} from "@/components/requests-bdd";

export default {
  name: "maintenance",
  data() {
    return {
      route: null,
    };
  },
  methods: {
    tryToConnect() {
      const user = sendGetDataTable('users', -1);
      user.then((res) => {
        if(res === -1) {
          this.$router.push('/maintenance');
        } else {
          this.$router.push('/');
        }
      })
    }

  },
}
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <b-button @click="tryToConnect" style="background-color: transparent; border: none">
        <i class="fas fa-home h2"></i>
      </b-button>
    </div>
    <section class="my-5 pt-2">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="home-wrapper">
              <div class="mb-5">
                <b-img :src="require(`@/assets/images/logolc.svg`)" alt="img" fluid height="100" width="100"/>
              </div>

              <div class="row justify-content-center">
                <div class="col-sm-4">
                  <div class="maintenance-img">
                    <img alt class="img-fluid mx-auto d-block" src="@/assets/images/maintenance.png"/>
                  </div>
                </div>
              </div>
              <h3 class="mt-5">Site is Under Maintenance</h3>
              <p>Please check back in sometime.</p>

              <div class="row">
                <div class="col-md-4">
                  <div class="card mt-4 maintenance-box">
                    <div class="card-body">
                      <i class="bx bx-broadcast mb-4 h1 text-primary"></i>
                      <h5 class="font-size-15 text-uppercase">Why is the Site Down?</h5>
                      <p class="text-muted mb-0">
                        There are many variations of passages of
                        Lorem Ipsum available, but the majority have suffered alteration.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mt-4 maintenance-box">
                    <div class="card-body">
                      <i class="bx bx-time-five mb-4 h1 text-primary"></i>
                      <h5 class="font-size-15 text-uppercase">What is the Downtime?</h5>
                      <p class="text-muted mb-0">
                        Contrary to popular belief, Lorem Ipsum is not
                        simply random text. It has roots in a piece of classical.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mt-4 maintenance-box">
                    <div class="card-body">
                      <i class="bx bx-envelope mb-4 h1 text-primary"></i>
                      <h5 class="font-size-15 text-uppercase">Do you need Support?</h5>
                      <p class="text-muted mb-0">
                        If you are going to use a passage of Lorem
                        Ipsum, you need to be sure there isn't anything embar..
                        <a
                            class="text-decoration-underline"
                            href="mailto:no-reply@domain.com"
                        >no-reply@domain.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>