<template>
  <div>
    <a class="logout-button" v-if="token" @click.prevent="logout" href>SIGNOUT</a>
    <nav class="navigation-bar" :class="{'open' : open }">
      <div class="container">
        <a class="brand">
          <strong>toWatch</strong>
        </a>

        <ul class="links margin-top-xs-40" v-if="!token" @click="open = false">
          <router-link :to="{ name: 'mostPopular'}" tag="li">
            <a>
              <span class="dripicons-star"></span> MOST POPULAR
            </a>
          </router-link>
        </ul>

        <ul class="links margin-top-xs-40" v-if="token" @click="open = false">
          <router-link :to="{ name: 'movieCollection'}" tag="li">
            <a>
              <span class="dripicons-camcorder"></span> MOVIE COLLECTION
            </a>
          </router-link>

          <router-link :to="{ name: 'watchedShows'}" tag="li">
            <a>
              <span class="dripicons-preview"></span> WATCHED SHOWS
            </a>
          </router-link>

          <router-link :to="{ name: 'watching'}" tag="li">
            <a>
              <span class="dripicons-monitor"></span> WATCHING
            </a>
          </router-link>
        </ul>
      </div>

      <ul class="links auth" v-if="!token">
        <router-link :to="{ name: 'login'}" tag="li">
          <a>SIGNIN</a>
        </router-link>
      </ul>
    </nav>

    <button class="navigation-button" type="button" name="button" @click="toggleOpen">
      <span class="dripicons-menu"></span>
    </button>
    <div class="navigation-underlay" :class="{'open' : open }" @click="toggleOpen"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavigationBar',
  data() {
    return {
      open: false,
      dropdown: false
    };
  },
  computed: {
    ...mapState({
      token: ({ storage }) => storage.token,
      user: ({ storage }) => storage.user
    })
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    logout() {
      this.$store.dispatch('auth/signUserOut');
      this.open = false;
    }
  }
};
</script>

<style lang="scss" src="./navigation-bar.scss"></style>
