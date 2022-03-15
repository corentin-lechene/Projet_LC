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
    if (localStorage.user_token) {
      localStorage.removeItem('user_token');
    }
    //Recupère les params.
    const data = this.$route.params;
    this.$router.push({
      name: data.redirect || 'Homepage',
      params: {notification: data.notification || {message: "Deconnexion réussite", variant: "success"}}
    });
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div>Deconnexion...</div>
  </Layout>
</template>