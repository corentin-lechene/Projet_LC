<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import {validRequest} from "@/components/my-functions";
import {sendGetUserByToken, sendGetDataTable, sendDeleteTable, sendInsertTable} from "@/components/requests-bdd";

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
      deleteTable: {},
      addTable_v: {}
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
    getStaffs(table, id = false) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if(!validRequest(res)) {
          if (!id)
            this.staffs = res.result;
          else
            this.staffsById = res.result;
        }
      });
    },
    getUsers(table, id = false) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if(!validRequest(res)) {
          if (!id)
            this.users = res.result;
          else
            this.usersById = res.result;
        }
      });
    },
    deleteTableById(table, id) {
      let promise = sendDeleteTable(table, id);
      promise.then((res) => {
        if(!validRequest(res))
          this.deleteTable = res.result;
      });
    },
    addTable(table, body) {
      let promise = sendInsertTable(table, body);
      promise.then((res) => {
        if(!validRequest(res))
          this.addTable_v = res.result;
      });
    },
  },
  created() {
    this.getUserByToken();
    this.getUsers('users');
    this.getUsers('users', 2);
    this.getStaffs('staffs');
    this.getStaffs('staffs', 4);

    this.deleteTableById('users', 9);
    this.addTable('users', {
      postal_code: 'testadd'
    });

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
    user delete id (6) : {{deleteTable}} <br><br>
    user insert (6) : {{addTable_v}} <br><br>

  </Layout>
</template>

