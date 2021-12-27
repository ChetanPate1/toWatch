import axios from '../../http';
import {
  MOVIE_DETAILS_GET,
  MOVIE_GET,
  MOVIE_RESET } from '../mutation-types';

const state = {
  movieDetails: {},
  moviesFound: []
};

const getters = {};

const actions = {
  async movieGet({ commit, dispatch }, movie) {
    if (!movie) return;
    try {
      const { data } = await axios({
        method: 'GET',
        url: process.env.VUE_APP_OMDB_API_URL,
        params: {
          apikey: process.env.VUE_APP_OMDB_API_KEY,
          plot: 'full',
          t: movie.split(',')[0],
          y: movie.split(',')[1]
        }
      });
      
      if(data.Error) {
        return dispatch('showToast', {
          title: 'Not Found',
          message: 'Movie could not be found.'
        }, { root: true });
      }
  
      const posterUrl = data.Poster;
      const poster = posterUrl.substring(0, posterUrl.length - 7);
  
      commit(MOVIE_GET, [{
        ...data,
        Poster: poster + '125.jpg'
      }]);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  reset({ commit }) {
    commit(MOVIE_RESET);
  },
  async movieDetailsGet({ dispatch, commit }, movieId) {
    try {
      const { data }  = await axios({
        method: 'GET',
        url: `/movies/${movieId}`
      });

      commit(MOVIE_DETAILS_GET, data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
};

const mutations = {
  [MOVIE_DETAILS_GET](state, data) {
    state.movieDetails = data;
  },
  [MOVIE_GET](state, movies) {
    state.moviesFound = movies;
  },
  [MOVIE_RESET](state) {
    state.moviesFound = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
