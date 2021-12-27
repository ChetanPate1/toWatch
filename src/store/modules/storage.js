import { STORAGE_UPDATE, STORAGE_SET, STORAGE_RESET } from '../mutation-types';

function initialState() {
  return {
    token: false,
    user: {}
  };
}

const state = initialState();

const getters = {};

const actions = {
  async initialiseStore({ commit }) {
    const store = localStorage.getItem('storage');

    if (store) {
      commit(STORAGE_SET, JSON.parse(store));
      return JSON.parse(store)
    }

    commit(STORAGE_SET, initialState());
    return initialState();
  },
  async save({ commit }, { prop, value }) {
    commit(STORAGE_UPDATE, { prop, value });
  },
  async reset({ commit }) {
    commit(STORAGE_RESET);
  }
};

const mutations = {
  [STORAGE_SET](state, store) {
    state = Object.assign(state, store);
  },
  [STORAGE_UPDATE](state, { prop, value }) {
    state = Object.assign(state, { [prop]: value });
    
    localStorage.setItem('storage', JSON.stringify(state));
  },
  [STORAGE_RESET](state) {
    state = Object.assign(state, initialState());
    
    localStorage.setItem('storage', JSON.stringify({}));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
