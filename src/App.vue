<script>
import TwNavigationBar from '@/components/TwNavigationBar';
export default {
  async mounted() {
    await this.$store.dispatch('storage/initialiseStore');
  },
  components: {
    TwNavigationBar
  }
}
</script>

<template>
  <tw-navigation-bar></tw-navigation-bar>
  <router-view />
</template>

<style>

</style>
