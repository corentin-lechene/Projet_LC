<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";


export default {
  page: {
    title: "Deconnexion",
  },
  components: {Layout, PageHeader},
  data() {
    return {
      title: "deconnexion"
    }
  },
  mounted() {
    if(localStorage.user_token) {
      localStorage.removeItem('user_token');
    }
    this.$router.push({
      name: 'Homepage',
      params: {notification: {message: "Deconnexion réussite", variant: "success"}}
    });
  },


};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div>Deconnexion...</div>
  </Layout>
</template>
