import axios from '../../http';
import {
  MOVIE_COLLECTION_SET,
  MOVIE_COLLECTION_GET,
  MOVIE_COLLECTION_ADD,
  MOVIE_COLLECTION_DELETE,
  MOVIE_COLLECTION_REQUESTING } from '../mutation-types';

const state = {
  collection: [],
  currentPage: 1,
  requesting: false,
  totalPages: 10,
  pageSize: 15
};

const getters = {};

const actions = {
  async getMovieCollection({ state, commit, dispatch }, { currentPage }) {
    if(state.requesting || state.totalPages < currentPage && currentPage > 1) return;

    try {
      commit(MOVIE_COLLECTION_REQUESTING, true);
      const res = await axios({
        method: 'GET',
        url: '/movie-collections',
        params: { currentPage }
      });

      if (currentPage === 1) {
        commit(MOVIE_COLLECTION_REQUESTING, false);
        return commit(MOVIE_COLLECTION_SET, res.data);
      }

      if(res.data.collection.length == 0) {
        return commit('updateState', { reachedEnd: true });
      }

      commit(MOVIE_COLLECTION_REQUESTING, false);
      commit(MOVIE_COLLECTION_GET, res.data);
    } catch ({ data }) {
      commit(MOVIE_COLLECTION_REQUESTING, false);
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async saveToMovieCollectionMovie({ commit, dispatch }, movie) {
    try {
      const posterUrl = movie.Poster.substring(0, movie.Poster.length - 7);
      const { data } = await axios({
        method: 'POST',
        url: '/movie-collections',
        data: {
          ...movie,
          Poster: posterUrl + '210.jpg',
          PosterXL: posterUrl + '720.jpg'
        }
      });

      commit(MOVIE_COLLECTION_ADD, data.movie);

      dispatch('showToast', { title: 'Movie added.', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async deleteFromMovieCollection({ commit, dispatch }, id) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/movie-collections/${id}`
      });

      commit(MOVIE_COLLECTION_DELETE, id);

      dispatch('showToast', { title: 'Movie Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
};

const mutations = {
  updateState(state, { prop, value }) {
    state = {
      ...state,
      [prop]: value
    };
  },
  [MOVIE_COLLECTION_REQUESTING](state, value) {
    state.requesting = value;
  },
  [MOVIE_COLLECTION_SET](state, { collection, currentPage, totalPages, pageSize }) {
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.collection = collection;
    state.pageSize = pageSize;
  },
  [MOVIE_COLLECTION_GET](state, { collection, currentPage, totalPages, pageSize }) {
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.pageSize = pageSize;
    state.collection = [
      ...state.collection,
      ...collection
    ];
  },
  [MOVIE_COLLECTION_ADD](state, movie) {
    state.collection = [...state.collection, movie];
  },
  [MOVIE_COLLECTION_DELETE](state, id) {
    state.collection = state.collection.filter(item => item._id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
