<template lang="html">
<form v-on:submit.prevent="findShow">
  <div class="form-element search dark">
    <button type="button" class="dripicons-cross"
        @click="empty"
        v-if="moviesFound.length > 0">
    </button>
    <loader :show="requesting"></loader>
    <input type="text" name="name" v-model="name" placeholder="'Movie Name, Year'">
    <button type="submit" class="dripicons-search"
        :disabled="requesting">
    </button>

    <div class="search-results" :class="{'show' : moviesFound }">
      <search-result-item
        v-for="(movie, index) in moviesFound" :key="index"
        :poster="movie.Poster"
        :title="movie.Title"
        :plot="movie.Plot"
        :year="movie.Year"
        @click="addMovie(movie)"
        :disabled="requesting"
      ></search-result-item>
    </div>
  </div>
</form>
</template>

<script>
import SearchResultItem from './SearchResultItem';
import Loader from '../Loader/Loader';

import { mapState } from 'vuex';

export default {
  name: 'SearchMovies',
  data() {
    return {
      name: '',
      requesting: false
    };
  },
  computed: {
    ...mapState({
      moviesFound: ({ movies }) => movies.moviesFound
    })
  },
  methods: {
    async addMovie(movie) {
      await this.$store.dispatch('movieCollection/saveToMovieCollectionMovie', movie);
      this.empty();
    },
    async findShow() {
      this.requesting = true;
      await this.$store.dispatch('movies/movieGet', this.name);
      this.requesting = false;
    },
    empty() {
      this.name = '';
      this.$store.dispatch('movies/reset');
    }
  },
  components: {
    SearchResultItem,
    Loader
  }
};
</script>

<style lang="scss">
.search-results {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
  transition: all 500ms ease;
  transform: translate(-100%, 0);
  height: auto;
  overflow-y: auto;
  opacity: 0;

  .poster {
    border-radius: 5px;
    margin-top: 20px;
    box-shadow: 0 20px 65px 6px rgba(0, 0, 0, 0.4);
  }

  &.show {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
