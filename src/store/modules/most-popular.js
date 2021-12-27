import axios from 'axios';
import { SET_MOST_POPULAR_SHOWS } from '../mutation-types';

const state = {
  shows: []
};

const getters = {};

const actions = {
  getMostPopularShows({ commit }) {
    axios.get('https://www.episodate.com/api/most-popular?page=1')
      .then(res => {
        commit(SET_MOST_POPULAR_SHOWS, res.data.tv_shows);
      });
  }
};

const mutations = {
  [SET_MOST_POPULAR_SHOWS](state, shows) {
    state.shows = shows;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
