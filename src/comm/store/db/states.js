import LocalStorage from '../dao/localstorage-dao'
const states = {
  userInfo: LocalStorage.loadUserInfo(),
  userToken: LocalStorage.loadUserToken(),
};
export default states;
