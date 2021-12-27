<template>
  <div id="app">
    <toasts></toasts>

    <navigation-bar></navigation-bar>
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar/NavigationBar';
import Toasts from './components/Toasts/Toasts';

import { mapGetters } from 'vuex';

export default {
  name: 'app',
  async mounted() {
    await this.$store.dispatch('storage/initialiseStore');
  },
  computed: {
    ...mapGetters(['toasts'])
  },
  components: {
    NavigationBar,
    Toasts
  }
};
</script>

<style src="../scss/main.scss" lang="scss"></style>
