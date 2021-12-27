import axios from '../../http';
import {
  SHOWS_GET,
  SHOW_EPISODES_TAGS_GET,
  SHOWS_RESET } from '../mutation-types';

const state = {
  showsFound: [],
  showEpisodesTags: []
};

const getters = {};

const actions = {
  async showsGet({ commit, dispatch }, q) {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.VUE_APP_TVMAZE_API_URL}/search/shows`,
        params: { q }
      });

      if(res.data.length == 0) {
        return dispatch('showToast', {
          title: 'Not Found',
          message: 'Show could not be found.'
        });
      }

      commit(SHOWS_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
    }
  },
  async showsEpisodesTagsGet({ commit, dispatch }, showId) {
    commit('SHOWS_RESET');

    try {
      const res = await axios({
        method: 'GET',
        url: `/episode-tags/${showId}/tags`
      });

      commit(SHOW_EPISODES_TAGS_GET, res.data.tags);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
    }
  },
  async save({ dispatch }, show) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/shows',
        data: show
      });

      return data;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async updateShow({ dispatch }, showId) {
    try {
      const res = await axios({
        method: 'POST',
        url: `/shows/${showId}/update`
      });

      dispatch('showToast', { title: res.status == 200 ? 'Show Updated.' : 'Show Already Upto Date.' }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
    }
  },
  async updateShows({ dispatch }) {
    try {
      const res = await axios({
        method: 'POST',
        url: '/shows/update'
      });

      dispatch('showToast', { title: 'Shows Updated.' }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
    }
  },
  reset({ commit }) {
    commit(SHOWS_RESET);
  }
};

const mutations = {
  [SHOWS_GET](state, showsFound) {
    state.showsFound = showsFound.map(({ show }) => ({
      ...show,
      image: show.image || {}
    }));
  },
  [SHOW_EPISODES_TAGS_GET](state, tags) {
    state.showEpisodesTags = tags;
  },
  [SHOWS_RESET](state) {
    state.showsFound = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
