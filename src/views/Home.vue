<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/company" name="Instituição" icon="ti-panel"/>
        <sidebar-link to="/individual" name="Voluntários" icon="ti-panel"/>
      </template>
      <mobile-menu>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import MobileMenu from "./layouts/MobileMenu.vue";
import TopNavbar from "./layouts/TopNavbar.vue";
import ContentFooter from "./layouts/ContentFooter.vue";
import DashboardContent from "./layouts/Content.vue";

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TopNavbar,
    MobileMenu,
    ContentFooter,
    DashboardContent
  },
  computed: {
    ...mapState('account', ['status'])
  },
  methods: {
    ...mapActions('account', ['logout']),
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
        this.logout();
    }
  }
};
</script>
