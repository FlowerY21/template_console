import {post} from './support/axios-helper';

const port = '';

const doPost = (api, data) => {
  return port('' + api, port, data);
};

const login = (loginData) => {
  return doPost('', loginData);
};

export default {
  login
}
