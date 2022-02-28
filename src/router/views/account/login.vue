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

      user: null,
      userToken: null,

      email: "stafftest@gmail.com",
      password: "Test1234!",

      submitted: false,
      formError: null,
      authError: null,

      debug: null,

    }
  },
  methods: {



    async getUserByLogin(email, password) {
      let url = "http://localhost:9000/users/login";
      let header = { method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email: email, password: password})}

      try {
        const response = await fetch(url, header);
        return await response.json();
      } catch (err) {
        return null;
      }
    },

    validForm() {
      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
      if(this.email === "" || this.password === "") {
        this.formError = "empty";
        return false;
      } else if(this.email.match(emailRegex) === null || this.password.match(passwordRegex) === null ) {
        this.formError = "invalid";
        return false;
      }
      return true;
    },

    async tryToLogIn() {
      this.submitted = true;

      if (this.validForm()) {
        this.authError = null;
        //Connexion en cours
        this.user = await this.getUserByLogin(this.email, this.password);

        if(this.user !== null) {
          this.debug = "connexion reussite";
          await this.$router.push({name: 'Homepage'});
        } else {
          this.debug = "connexion echoué";
          this.authError = "wrong";
        }
      } else {
        this.debug = "nope";
      }
    }
  },
};
</script>


<template>
  <Layout>
    <PageHeader :title="title"/>
    <div>
      debug : {{debug}}
      <br><br>
      user : {{user}}
    </div>
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
            <b-alert v-if="formError === 'empty'" variant="danger" class="mt-3" dismissible show>L'email ou le mot de passe est vide</b-alert>
            <b-alert v-else-if="formError === 'invalid'" variant="danger" class="mt-3" dismissible show>L'email ou le mot de passe est invalide</b-alert>
            <b-alert v-else-if="authError === 'wrong'" variant="danger" class="mt-3" dismissible show>L'email ou le mot de passe est incorrecte</b-alert>

            <!-- <div>Erreur de connexion, veuillez réesayer<div> -->
            <b-form class="p-2" @submit.prevent="tryToLogIn()">
              <b-form-group id="input-group-1" label="Email" label-for="input-1">
                <b-form-input
                    v-model="email"
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
                    v-model="password"
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
                <b-button type="submit" variant="primary" class="btn-block">
                  Se connecter
                  <b-spinner v-if="submitted" class="m-2" variant="primary" role="status"></b-spinner>
                </b-button>
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