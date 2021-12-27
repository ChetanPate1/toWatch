import axios from '../../http';

import router from '@/router';

const state = {};

const getters = {};

const actions = {
  async signUserIn({ dispatch }, data) {
    try {
      const res = await axios({
        method: 'POST',
        url: '/login',
        data
      });

      await dispatch('storage/save', {
        prop: 'token',
        value: res.data.token
      }, { root: true });

      await dispatch('storage/save', {
        prop: 'user',
        value: { email: data.email }
      }, { root: true });

      router.push({ name: 'watching' });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async signUserOut({ dispatch }) {
    await dispatch('storage/reset', null, { root: true });
    router.push({ name: 'login' });
  },
  async register({ dispatch }, user) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/register',
        data: user
      });

      router.push({ name: 'login' });
      dispatch('showToast', { title: 'Registered', message: data.message }, { root: true });
    } catch ({ data }) {
      router.push({ name: 'login' });
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async verifyEmail({ dispatch }, token) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/verify-email',
        data: { token }
      });

      router.push({ name: 'login' });
      dispatch('showToast', { title: 'Email Verified', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async forgotPassword({ dispatch }, { email }) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/forgot-password',
        data: { email }
      });

      dispatch('showToast', { title: 'Password Reset', message: data.message }, { root: true });
    } catch (e) {

    }
  },
  async resetPassword({ dispatch }, token) {
    try {
      const res = await axios({
        method: 'POST',
        url: '/reset-password',
        data: { token }
      });
    } catch ({ data }) {
      router.push({ name: 'login' });
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async changePassword({ dispatch }, model) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/change-password',
        data: model
      });

      router.push({ name: 'login' });
      dispatch('showToast', { title: 'Password Changed', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
