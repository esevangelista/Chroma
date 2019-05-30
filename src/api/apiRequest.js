import api from './client';

export function getRequestService(route) {
  return api.get(route).catch((error) => {
    throw error.response.data.message;
  });
}

export function postRequestService(route, data) {
  return api.post(route, data).catch((error) => {
    throw error.response.data.message;
  });
}

export function putRequestService(route, data) {
  return api.put(route, data).catch((error) => {
    throw error.response.data.message;
  });
}

export function deleteRequestService(route, data) {
  return api.delete(route, data).catch((error) => {
    throw error.response.data.message;
  });
}
