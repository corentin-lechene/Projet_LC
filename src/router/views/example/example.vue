<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  name: "example",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "example",
    }
  },
  methods: {

  }
}

</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    Example
  </Layout>
</template>

<style>

</style>