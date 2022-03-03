<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import {validRequest} from "@/components/my-functions";
import {sendGetUserByToken, sendGetStaffs, sendGetUsers} from "@/components/requests-bdd";

export default {
  name: "example",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "example",
      users: {},
      usersById: {},
      userToken: {},
      staffs: {},
      staffsById: {},
    }
  },
  methods: {
    getUserByToken() {
      let promise = sendGetUserByToken();
      promise.then((res) => {
        if(!validRequest(res))
          this.userToken = res.result;
      });
    },
    getStaffs(id = false) {
      let promise = sendGetStaffs(id);
      promise.then((res) => {
        if(!validRequest(res)) {
          if (!id)
            this.staffs = res.result;
          else
            this.staffsById = res.result;
        }
      });
    },
    getUsers(id = false) {
      let promise = sendGetUsers(id);
      promise.then((res) => {
        if(!validRequest(res)) {
          if (!id)
            this.users = res.result;
          else
            this.usersById = res.result;
        }
      });
    },
  },
  created() {
    this.getUserByToken();
    this.getUsers();
    this.getUsers(2);
    this.getStaffs();
    this.getStaffs(4);
  }
}

</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    Example pour utiliser les requêtes à la bdd via le fichier<br><br>
    users : {{users}} <br><br>
    users id (2) : {{usersById}} <br><br>
    user token : {{userToken}} <br><br>
    staff : {{staffs}} <br><br>
    staff id (4) : {{staffsById}} <br><br>

  </Layout>
</template>

