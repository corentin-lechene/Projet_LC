<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "Default",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="card">
      <div class="btn-toolbar p-3" role="toolbar">

      </div>
      <div class="card-body">
        <div class="media mb-4">
          <img
              class="d-flex mr-3 rounded-circle avatar-sm"
              src="@/assets/images/users/avatar-2.jpg"
              alt="Generic placeholder image"
          />
          <div class="media-body">
            <h5 class="font-size-14 mt-1"> qsjdhqs </h5>
            <small class="text-muted"> support@domain.com</small>
          </div>
        </div>

        <h4 class="mt-0 font-size-16"> sqkjdnqsd </h4>

        <p>Dear Lorem Ipsum,</p>
        <p> mqzeozp </p>
        <p>Sed elementum turpis eu lorem interdum, sed porttitor eros commodo. Nam eu venenatis tortor, id lacinia diam. Sed aliquam in dui et porta. Sed bibendum orci non tincidunt ultrices. Vivamus fringilla, mi lacinia dapibus condimentum, ipsum urna lacinia lacus, vel tincidunt mi nibh sit amet lorem.</p>
        <p>Sincerly,</p>
        <hr />

        <div class="row">
          <div class="col-xl-2 col-6">
            <div class="card">
              <img
                  class="card-img-top img-fluid"
                  src="@/assets/images/small/img-3.jpg"
                  alt="Card image cap"
              />
              <div class="py-2 text-center">
                <a href class="font-weight-medium">Download</a>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-6">
            <div class="card">
              <img
                  class="card-img-top img-fluid"
                  src="@/assets/images/small/img-4.jpg"
                  alt="Card image cap"
              />
              <div class="py-2 text-center">
                <a href class="font-weight-medium">Download</a>
              </div>
            </div>
          </div>
        </div>

        <a href="javascript: void(0);" class="btn btn-secondary waves-effect mt-4">
          <i class="mdi mdi-reply"></i> Reply
        </a>
      </div>
    </div>
  </Layout>
</template>
