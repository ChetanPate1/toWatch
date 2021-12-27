import axios from '../../http';
import { SEASONS_GET, EPISODES_GET, EPISODE_TAGS_GET, SHOW_TYPES_GET } from '../mutation-types';

const state = {
  seasons: [],
  episodes: [],
  episodeTags: [],
  showTypes: []
};

const getters = {};

const actions = {
  async getEpisodes({ commit, dispatch }, seasonId) {
    try {
      commit('resetState', 'episodes');
      const res = await axios({
        method: 'GET',
        url: `/episodes/${seasonId}`
      });

      commit(EPISODES_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getEpisodeTags({ commit, dispatch }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/episode-tags'
      });

      commit(EPISODE_TAGS_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getShowTypes({ commit, dispatch }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/show-types'
      });

      commit(SHOW_TYPES_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
}

const mutations = {
  [SEASONS_GET](state, data) {
    state.seasons = data;
  },
  [EPISODES_GET](state, data) {
    state.episodes = data;
  },
  [EPISODE_TAGS_GET](state, data) {
    state.episodeTags = data;
  },
  [SHOW_TYPES_GET](state, data) {
    state.showTypes = data;
  },
  resetState(state, prop) {
    state[prop] = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
