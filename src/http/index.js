import axios from 'axios';
import Store from '../store';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

instance.interceptors.request.use(function (config) {
    const { token } = Store.state.storage;
    const tvMazeApi = config.url.indexOf(process.env.VUE_APP_TVMAZE_API_URL);
    const omdbApi = config.url.indexOf(process.env.VUE_APP_OMDB_API_URL);
    const notThirdPartyApi = tvMazeApi < 0 && omdbApi < 0;

    if (token && notThirdPartyApi) {
        config.headers['Authorization'] = `token ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));


instance.interceptors.response.use((response) => response, (error) => {
    const { response } = error;

    if (response.status === 401) {
        Store.dispatch('auth/signUserOut');
    }

    return Promise.reject(error.response);
});

export default instance;
