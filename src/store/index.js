import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import mostPopular from './modules/most-popular';
import shows from './modules/shows';
import watching from './modules/watching';
import watchedShows from './modules/watched-shows';
import movieCollection from './modules/movie-collection';
import movies from './modules/movies';
import lookups from './modules/lookups';
import toast from './modules/toast';
import storage from './modules/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    mostPopular,
    shows,
    watching,
    watchedShows,
    movieCollection,
    movies,
    lookups,
    toast,
    storage
  }
});
