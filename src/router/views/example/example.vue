<script>

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  name: "example",
  components: {Layout, PageHeader},
  data() {
    return {
      title: "example",
      width: 250,
      currentPage: 'user',
    }
  },
  methods: {},
  created() {}
}

</script>

<template>
  <Layout horizontal>
    <PageHeader :title="title"/>
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow :width="width + 'px'">
      <template #footer="{ hide }">
        <div class="row bg-dark align-items-center">
          <div class="col d-block ml-2 my-2">
            <b-button v-if="width === 250"
                      class="btn-block" size="sm"
                      @click="width = 100">Close
            </b-button>
            <b-button v-else
                      class="btn-block" size="sm"
                      @click="width = 250">Open
            </b-button>
          </div>
        </div>
      </template>
      <div class="px-3 py-2">
        <b-nav vertical class="w-25" @click="width = 100">
          <b-nav-item active @click="currentPage='user'">Active</b-nav-item>
          <b-nav-item @click="currentPage='other'">Link</b-nav-item>
          <b-nav-item>Another Link</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>

    <div v-if="currentPage === 'user'">user</div>
    <div v-if="currentPage === 'other'">other</div>

  </Layout>
</template>

