import StorageService from '../interfaces'

const mutations = {
  [StorageService.User.setInfo](state, userInfo) {
    state.userInfo = userInfo;
  },

  [StorageService.User.setToken](state, userToken) {
    state.userToken = userToken;
  },

  [StorageService.User.saveAccount](state, account) {
    state.userAccount = account;
  },
};

export default mutations;
