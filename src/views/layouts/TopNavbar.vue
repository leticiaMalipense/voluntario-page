<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
     
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
 
          <li class="nav-item">
            <button class="btn btn-primary btn-color"  v-on:click="logout()" >Sair</button>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  computed: {
      ...mapState('account', ['status']),
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    ...mapActions('account', ['logout']),
  }
};
</script>
<style>
.ml-auto {
  margin-left: auto !important;
}
.btn-color {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
}
</style>
