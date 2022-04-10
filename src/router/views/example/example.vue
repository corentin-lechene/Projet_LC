<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Register from "@/components/modals/backoffice/register";

export default {
  name: "example",
  components: {Layout, PageHeader, Register},
  data() {
    return {
      title: "example",
      width: 250,
      currentPage: 'user',
    }
  },
  methods: {},
  created() {
  }
}

</script>

<template>
  <Layout horizontal>
    <PageHeader :title="title"/>
    <Register :route="'goods'" />

  </Layout>
</template>

