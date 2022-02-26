<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  page: {
    title: "Connexion",
  },
  components: {Layout, PageHeader},
  data() {
    return {
      title: "Connexion",
    }
  }
};
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>

    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-8 col-xl-6 col-xxl-6">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Vous nous avez manquez</h5>
                  <p>Veuillez vous connecter pour continuer.</p>
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
                    <img src="@/assets/images/logolc.svg" alt height="45" />
                  </span>
                </div>
              </router-link>
            </div>
            <b-alert variant="danger" class="mt-3" dismissible>erreur</b-alert>

            <!-- <div>Erreur de connexion, veuillez réesayer<div> -->
            <b-form class="p-2" @submit.prevent="">
              <b-form-group id="input-group-1" label="Email" label-for="input-1">
                <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Saisir votre email"
                ></b-form-input>
                <div class="invalid-feedback">
                  <span>L'email est requis.</span>
                  <span>Veuillez entrer un email valide.</span>
                </div>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password" label-for="input-2">
                <b-form-input
                    id="input-2"
                    type="password"
                    placeholder="Saisir votre mot de passe"
                ></b-form-input>
                <div class="invalid-feedback">Le mot de passe est requis</div>
              </b-form-group>
              <div class="custom-control custom-checkbox">
                <input id="customControlInline" type="checkbox" class="custom-control-input" />
                <label class="custom-control-label" for="customControlInline">Rester connecter</label>
              </div>
              <div class="mt-3">
                <b-button type="submit" variant="primary" class="btn-block">Se connecter</b-button>
              </div>
              <div class="mt-4 text-center">
                <router-link tag="a" to="/forgot-password" class="text-muted">
                  <i class="mdi mdi-lock mr-1"></i> Vous avez oublié votre mot de passe ? C'est ici
                </router-link>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

  </Layout>
</template>