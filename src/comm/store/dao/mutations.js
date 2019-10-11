import StorageService from '../interfaces'

const mutations = {
  [StorageService.User.setInfo](state, userInfo) {
    state.userInfo = userInfo;
  },
  [StorageService.User.setToken](state, userToken) {
    state.userToken = userToken;
  },
};

export default mutations;
