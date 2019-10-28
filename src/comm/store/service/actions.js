import StorageService from '../interfaces';
import LocalStorageDao from '../dao/localstorage-dao';


export default {
  [StorageService.User.setInfo]({commit}, user) {
    commit(StorageService.User.setInfo, LocalStorageDao.saveUserInfo(user));
  },

  [StorageService.User.setToken]({commit}, token) {
    commit(StorageService.User.setToken, LocalStorageDao.saveUserToken(token));
  },

  [StorageService.User.saveAccount]({commit}, account) {
    commit(StorageService.User.saveAccount, LocalStorageDao.saveAccount(account));
  },
}
