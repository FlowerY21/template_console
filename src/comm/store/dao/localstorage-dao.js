import Storage from 'good-storage'

const Keys = {
  UserInfo:'__u__',
  UserToken:'__t__',
};

const loadUserInfo = () => {
  return Storage.session.get(Keys.UserInfo,{});
};

const saveUserInfo = (userInfo) => {
  return Storage.session.set(Keys.UserInfo,userInfo);
};

const loadUserToken = () => {
  return Storage.session.get(Keys.UserToken,{});
};

const saveUserToken = (userInfo) => {
  return Storage.session.set(Keys.UserToken,userInfo);
};

export default {
  loadUserInfo,
  saveUserInfo,
  loadUserToken,
  saveUserToken,
}
