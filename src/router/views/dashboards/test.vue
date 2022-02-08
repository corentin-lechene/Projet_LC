<script>

import appConfig from "@/app.config.json";

export default {
  page: {
    title: "Test",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
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

  <div>bonjour</div>

</template>

