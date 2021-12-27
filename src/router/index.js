import Vue from 'vue';
import Router from 'vue-router';
import MostPopular from '@/views/MostPopular';
import Login from '@/views/Login';
import Register from '@/views/Register';
import ForgotPassword from '@/views/ForgotPassword';
import ChangePassword from '@/views/ChangePassword';
import Watching from '@/views/Watching';
import WatchedShows from '@/views/WatchedShows';
import MovieCollection from '@/views/MovieCollection';
import MovieDetails from '@/views/MovieDetails';

import Store from '../store';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/most-popular',
      name: 'mostPopular',
      component: MostPopular
    },
    {
      path: '/login/:token?',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Register
    // },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/change-password/:resetToken',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/watching',
      name: 'watching',
      component: Watching,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watched-shows',
      name: 'watchedShows',
      component: WatchedShows,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie-collection',
      name: 'movieCollection',
      component: MovieCollection,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie-details/:movieId',
      name: 'movieDetails',
      component: MovieDetails,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/', redirect: '/most-popular' }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

router.beforeEach(async (to, from, next) => {
  const { token } = await Store.dispatch('storage/initialiseStore');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token && to.name != 'login') {
      Store.dispatch('auth/signUserOut');
    }
  }

  if (to.name == 'login' && token) {
    return next({ path: '/watching' });
  }

  next();
});

export default router;
