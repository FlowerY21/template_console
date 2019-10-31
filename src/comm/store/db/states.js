import LocalStorage from '../dao/localstorage-dao'
const states = {
  userInfo: LocalStorage.loadUserInfo(),
  userToken: LocalStorage.loadUserToken(),
  userAccount: LocalStorage.loadAccount(),
  tabBar: LocalStorage.loadTabBar(),
  tabBarOn: LocalStorage.loadTabBarOn(),
};
export default states;
