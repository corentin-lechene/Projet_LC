<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  name: "example",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "example",
      values: null,
    }
  },
  methods: {
    test() {
      fetch('http://localhost:9000/api/companies/1')
          .then(response => response.json())
          .then((json) => {
            this.values = json;
          });
    }
  },
  created() {
    this.test();
  }
}

</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    Example
    {{values}}
  </Layout>
</template>

<style>

</style>