<script>

import Layout from "../../layouts/main";
import appConfig from "@/app.config.json";
import PageHeader from "@/components/page-header";

export default {
  page: {
    title: "Test",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Test",
      items: [
        {
          text: "le test",
          href: "/test",
        },
        {
          text: "Default",
          active: true,
        },
      ],
    };
  },
}
</script>


<template>
  <layout>
    <PageHeader :title="title" :items="items" />

    <div>bonjour</div>
  </layout>
</template>

