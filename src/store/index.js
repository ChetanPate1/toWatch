import { createStore, createLogger } from 'vuex';
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

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
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
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})