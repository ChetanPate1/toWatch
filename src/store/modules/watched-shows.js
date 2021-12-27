import axios from '../../http';
import {
  WATCHED_SHOWS_REQUESTING,
  WATCHED_SHOWS_SET,
  WATCHED_SHOWS_GET,
  WATCHED_SHOWS_DELETE } from '../mutation-types';

const state = {
  filter: { sort: 'Collection' },
  currentPage: 1,
  watchedShows: [],
  requesting: false,
  totalPages: 10,
  pageSize: 15
};

const getters = {};

const actions = {
  async getWatchedShows({ state, dispatch, commit }, { currentPage }) {
    if(state.requesting || state.totalPages < currentPage && currentPage > 1) return;

    try {
      commit(WATCHED_SHOWS_REQUESTING, true);

      const res = await axios({
        method: 'GET',
        url: '/watched-shows',
        params: {
          currentPage,
          showType: state.filter.sort
        }
      });

      if (currentPage === 1) {
        commit(WATCHED_SHOWS_REQUESTING, false);
        return commit(WATCHED_SHOWS_SET, res.data);
      }

      commit(WATCHED_SHOWS_REQUESTING, false);
      commit(WATCHED_SHOWS_GET, res.data);
    } catch ({ data }) {
      commit(WATCHED_SHOWS_REQUESTING, false);
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async deleteFromWatchedShows({ dispatch, commit }, { showId }) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `/watched-shows/${showId}`
      });

      commit(WATCHED_SHOWS_DELETE, showId);
      dispatch('showToast', { title: 'Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async continueWatching({ dispatch }, { showId, name }) {

    try {
      await axios({
        method: 'POST',
        url: `/watched-shows/${showId}/continue`
      });

      dispatch('showToast', { title: 'Continue Watching', message: name }, { root: true });
      return true;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
      return false;
    }
  },
  async rewatching({ dispatch }, { showId, name }) {
    try {
      await axios({
        method: 'POST',
        url: `/watched-shows/${showId}/rewatch`
      });

      dispatch('showToast', { title: 'Rewatching', message: name }, { root: true });
      return true;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
      return false;
    }
  }
};

const mutations = {
  [WATCHED_SHOWS_REQUESTING](state, value) {
    state.requesting = value;
  },
  [WATCHED_SHOWS_SET](state, { watchedShows, currentPage, totalPages, pageSize }) {
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.pageSize = pageSize;
    state.watchedShows = watchedShows;
  },
  [WATCHED_SHOWS_GET](state, { watchedShows, currentPage, totalPages, pageSize }) {
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.pageSize = pageSize;
    state.watchedShows = [
      ...state.watchedShows,
      ...watchedShows
    ];
  },
  [WATCHED_SHOWS_DELETE](state, showId) {
    state.watchedShows = state.watchedShows.filter(item => item.showId != showId);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
