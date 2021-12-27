import axios from '../../http';
import {
  WATCHING_SET,
  WATCHING_GET,
  WATCHING_ADD,
  WATCHING_DELETE,
  EPISODES_GET,
  WATCHING_TOGGLE_EPISODE_WATCHED,
  WATCHING_TOGGLE_TAG,
  WATCHING_GET_TAG,
  WATCHING_REQUESTING } from '../mutation-types';

const state = {
  watching: [],
  currentPage: 1,
  requesting: false,
  totalPages: 10,
  pageSize: 8
};

const getters = {};

const actions = {
  async getWatching({ commit, dispatch }, { currentPage }) {
    if(state.requesting || state.totalPages < currentPage && currentPage > 1) return;

    try {
      commit(WATCHING_REQUESTING, true);

      const res = await axios({
        method: 'GET',
        url: '/watchings',
        params: {
          currentPage
        }
      });

      if (currentPage === 1) {
        commit(WATCHING_REQUESTING, false);
        return commit(WATCHING_SET, res.data);
      }

      commit(WATCHING_REQUESTING, false);
      commit(WATCHING_GET, res.data);
    } catch ({ data }) {
      commit(WATCHING_REQUESTING, false);
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async addToWatching({ dispatch, commit }, { showId, seasonId, episodeId }) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/watchings',
        data: { showId, seasonId, episodeId }
      });

      commit(WATCHING_ADD, data.watching);
      dispatch('showToast', { title: 'Added To Watching', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
    }
  },
  async deleteWatching({ state, dispatch, commit }, { id, showTypeId }) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/watchings/${id}`,
        data: { showTypeId }
      });

      commit(WATCHING_DELETE, id);
      dispatch('showToast', { title: 'Show Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getEpisodes({ commit, dispatch }, { watchingId, seasonId }) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `/episodes/${seasonId}`
      });

      commit(EPISODES_GET, { watchingId, seasonId, episodes: data });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async toggleWatched({ commit, dispatch }, { watchingId, episode }) {
    try {
      const { data }  = await axios({
        method: 'POST',
        url: `/watching/${watchingId}/watched/${episode._id}`
      });

      commit(WATCHING_TOGGLE_EPISODE_WATCHED, {
        watchingId,
        data
      });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getEpisodeTags({ rootState, commit, dispatch }, { watchingId, episode }) {
    try {
      const { episodeTags } = rootState.lookups;
      const { data }  = await axios({
        method: 'GET',
        url: `/episode-tags/${episode._id}/tag`
      });

      commit(WATCHING_GET_TAG, {
        watchingId,
        data,
        episode,
        episodeTags
      });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async toggleTag({ rootState, commit, dispatch }, { watchingId, tagId, episode }) {
    try {
      const { episodeTags } = rootState.lookups;
      const { data }  = await axios({
        method: 'POST',
        url: `/episode-tags/${episode._id}/tag/${tagId}`
      });

      commit(WATCHING_TOGGLE_TAG, {
        watchingId,
        data,
        episode,
        episodeTags
      });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
}

const mutations = {
  [WATCHING_REQUESTING](state, value) {
    state.requesting = value;
  },
  [WATCHING_SET](state, { watching, currentPage, totalPages, pageSize }) {
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.watching = watching;
    state.pageSize = pageSize;
  },
  [WATCHING_GET](state, { watching, currentPage, totalPages, pageSize }) {
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.pageSize = pageSize;
    state.watching = [
      ...state.watching,
      ...watching
    ];
  },
  [WATCHING_ADD](state, watching) {
    state.watching = [...state.watching, watching];
  },
  [WATCHING_DELETE](state, id) {
    state.watching = state.watching.filter(item => item._id != id);
  },
  [EPISODES_GET](state, { watchingId, seasonId, episodes }) {
    const { episode, show } = state.watching.find(item => item._id == watchingId);
    const currentSeason = show.seasons.find(item => item._id == seasonId);
    const seasonNumber = show.seasons.indexOf(currentSeason) + 1;
    const episodesBefore = seasonNumber < episode.season.number;
    const currentSeasonEpisodesBefore = (item) => seasonNumber == episode.season.number && item.number <= episode.number;
    const watchingEpisodes = episodes.map(item => ({
      ...item,
      tags: [],
      watched: episodesBefore || currentSeasonEpisodesBefore(item)
    }))

    state.watching.map(item => {
      if (item._id === watchingId) {
        item.show.seasons.map(season => {
          if (season._id == seasonId) {
            season.episodes = watchingEpisodes;
          }

          return season;
        });
      }

      return item;
    });
  },
  [WATCHING_TOGGLE_EPISODE_WATCHED](state, { watchingId, data }) {
    const { episode, behindCount } = data;
    const currentSeasonEpisodesBefore = (item) => item.number <= episode.number;

    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.behindCount = behindCount;
        watch.episode = episode;
        watch.show.seasons.map(season => {
          if (season._id === episode.season._id) {
            return season.episodes.map((item) => {
              item.watched = currentSeasonEpisodesBefore(item);
              return item;
            });
          }

          return season;
        });
      }

      return watch;
    });
  },
  [WATCHING_TOGGLE_TAG](state, { watchingId, episode, data, episodeTags }) {
    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.show.seasons.map(season => {
          if (season._id === episode.season) {
            return season.episodes.map((item) => {
              if(item._id === episode._id) {
                item.tags = episodeTags.map(t => {
                  return {
                    ...t,
                    active: data.find(({ id }) => t.id == id) ? true : false
                  }
                })
              }

              return item;
            });
          }

          return season;
        });
      }

      return watch;
    });
  },
  [WATCHING_GET_TAG](state, { watchingId, episode, data, episodeTags }) {
    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.show.seasons.map(season => {
          if (season._id === episode.season) {
            return season.episodes.map((item) => {
              if(item._id === episode._id) {
                item.tags = episodeTags.map(t => {
                  return {
                    ...t,
                    active: data.find(({ id }) => t.id == id) ? true : false
                  }
                })
              }

              return item;
            });
          }

          return season;
        });
      }

      return watch;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
