import { createRouter, createWebHistory } from 'vue-router';
// import MostPopular from '@/views/MostPopular';
import Components from '@/views/Components';
// import Register from '@/views/Register';
// import ForgotPassword from '@/views/ForgotPassword';
// import ChangePassword from '@/views/ChangePassword';

// import WatchedShows from '@/views/WatchedShows';
// import MovieCollection from '@/views/MovieCollection';
// import MovieDetails from '@/views/MovieDetails';

const routes = [
  {
    path: '/',
    name: 'components',
    component: Components
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/Login.vue'),
  },
  {
    path: '/most-popular',
    name: 'mostPopular',
    // route level code-splitting
    // this generates a separate chunk (mostPopular.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'mostPopular' */ '../views/MostPopular.vue'),
  },
  {
    path: '/watching',
    name: 'watching',
    // route level code-splitting
    // this generates a separate chunk (watching.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'watching' */ '../views/Watching.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
