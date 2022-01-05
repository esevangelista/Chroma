import axios from 'axios';

function createClient() {
  return axios.create({
    baseURL: '/api',
  });
}

function createApiClient() {
  return {
    get(...args) {
      return createClient().get(...args).then(res => res);
    },
    post(...args) {
      return createClient().post(...args).then(res => res);
    },
    put(...args) {
      return createClient().put(...args).then(res => res);
    },
    delete(...args) {
      return createClient().delete(...args).then(res => res);
    },
  };
}

export default createApiClient();
