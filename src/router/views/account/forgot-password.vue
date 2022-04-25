<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import {sendGetDataTable, sendGetUserByToken} from "@/components/requests-bdd";

export default {
  name: "forgot-password",
  components: {PageHeader, Layout},
  data() {
    return {
      email: null,

    }
  },
  methods: {
    tryToReset() {
      if(this.email !== null) {
        sendGetDataTable('forgotpassword', this.email);
        this.$router.push({
          name: '/',
          params: {
            notification: {
              message: "Un mail a été envoyé.",
              variant: "success"
            }
          }
        })
      }
    }
  },
  async created() {
    const user = await sendGetUserByToken();
    if (user !== undefined) {
      await this.$router.push('/');
    }
  }
}
</script>

<template>
  <Layout>
    <PageHeader />
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Reset Password</h5>
                  <p>Re-Password with Skote.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logolc.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
            <div class="p-2">
              <form @submit.prevent="tryToReset">
                <div class="form-group">
                  <label for="useremail">Email</label>
                  <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      id="useremail"
                      placeholder="Enter email"
                  />
                </div>
                <div class="form-group row mb-0">
                  <div class="col-12 text-right">
                    <button class="btn btn-primary w-md" type="submit">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Remember It ?
            <router-link tag="a" to="/login" class="font-weight-medium text-primary">Sign In here</router-link>
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style scoped>

</style>