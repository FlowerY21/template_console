import LocalStorage from '../dao/localstorage-dao'
const states = {
  userInfo: LocalStorage.loadUserInfo(),
  userToken: LocalStorage.loadUserToken(),
  userAccount: LocalStorage.loadAccount(),
};
export default states;
