<template lang="html">
<div class="movie-card"
  @click.stop="goToMovieDetails(movieId)"
  tabindex="0"
  :class="{ 'deleteable': deleteable }"
  :style="{ 'background-image': 'url('+ imgSrc +')' }">

  <button class="icon-button red dripicons-trash"
    tabindex="0"
    @click.stop="$emit('onDelete', id)"></button>
  <h2>{{ heading }}</h2>
</div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    heading: String,
    imgSrc: String,
    movieId: String,
    id: String,
    deleteable: Boolean
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'movieDetails', params: { movieId } });
    }
  }
};
</script>

<style lang="scss">
.movie-card {
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
  border-top: 1px solid rgba(200, 200, 200, 0.5);

  &.deleteable {
    &:hover,
    &:focus {
      cursor: pointer;
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

  .dripicons-trash {
    left: 15px;
    top: 15px;
    transition: 250ms all ease;
    transform: translate(-45px, 0);
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
