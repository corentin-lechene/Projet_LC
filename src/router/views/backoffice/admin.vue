<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  name: "example",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "example",
      values_1: null,
      values_2: null,
    }
  },
  methods: {
    getGoods() {
      fetch('http://localhost:9000/users')
          .then(response => response.json())
          .then((json) => {
            this.values_1 = json;
          });
    },
    getGoodsById() {
      fetch('http://localhost:9000/goods/3')
          .then(response => response.json())
          .then((json) => {
            this.values_2 = json;
          });
    },
  },
  created() {
    this.getGoods();
    this.getGoodsById();
  }
}

</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    Example
    getGoods : {{values_1}}
    <br>
    <!--    getGoodsById : {{values_2}}-->
  </Layout>
</template>

<style>

</style>