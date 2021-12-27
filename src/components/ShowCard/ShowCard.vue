<template lang="html">
<div class="show-card" tabindex="0" :class="{ 'deleteable': deleteable }" :style="{ 'background-image': 'url('+ imgSrc +')' }">
  <button class="icon-button red dripicons-trash" tabindex="0" @click.stop="confirmDelete()"></button>
  <button class="icon-button dripicons-plus" tabindex="0" @click.stop="onAddToWatchlist()"></button>
  <button class="icon-button dripicons-clockwise" tabindex="0" @click.stop="update()"></button>
  <h2>{{ heading }}</h2>
</div>
</template>

<script>
export default {
  name: 'ShowCard',
  data() {
    return {
      deleteOpen: false,
      deleteFromWatched: false
    };
  },
  props: {
    heading: String,
    imgSrc: String,
    id: String,
    showId: String,
    data: Object,
    deleteable: Boolean
  },
  methods: {
    update() {
      this.$store.dispatch('shows/updateShow', {
        showId: this.showId,
        imdbId: this.data.imdbId
      });
    },
    async onAddToWatchlist() {
      this.$parent.$refs.addToWatchlist.form = {
        showId: this.showId,
        episode: '',
        season: ''
      };
      await this.$store.dispatch('lookups/getSeasons', this.showId);
      this.$parent.$refs.popup.open();
    }
  }
};
</script>

<style lang="scss">
.show-card {
  overflow: hidden;
  position: relative;
  display: block;
  margin: 0 auto 60px auto;
  max-width: 210px;
  height: 320px;
  border-radius: 10px;
  padding: 20px 15px 0 15px;
  background-color: #000000;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0 130px 130px rgba(0, 0, 0, 0.2),
    0 20px 40px -10px rgba(0, 0, 0, 0.7);

  &.deleteable {
    &:hover {
      cursor: pointer;
    }

    &:focus {
      .icon-button {
        transform: translate(0, 0);
      }
    }
  }

  h2 {
    font-size: 22px;
    z-index: 10;
    font-weight: bold;
    position: relative;
    z-index: 10;
    color: #ffffff;
  }

  .dripicons-plus {
    right: 15px;
    top: 15px;
    transition: 250ms all ease;
    transform: translate(45px, 0);
  }

  .dripicons-trash {
    left: 15px;
    top: 15px;
    transition: 250ms all ease;
    transform: translate(-45px, 0);
  }

  .dripicons-clockwise {
    bottom: 15px;
    right: 15px;
    transition: 250ms all ease;
    transform: translate(45px, 0);
  }

  .icon-button {
    z-index: 100;
    position: absolute;

    &:focus {
      transform: translate(0, 0);
    }
  }
}
</style>
