<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Form from '@/components/widgets/form';
import {formData} from "@/data/data-forms";



export default {
  name: "example",
  components: {Layout, PageHeader, Form},
  data() {
    return {
      title: "example",
      formData,
    }
  },
  methods: {

  }
}

</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <Form :forms="formData.customer" :options="{route: 'users', method: 'post'}" role="insert"/>

  </Layout>
</template>

<style>

</style>