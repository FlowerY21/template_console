import Storage from 'good-storage'
import Account from 'comm/service/model/Account'

const Keys = {
  UserInfo:'__u__',
  UserToken:'__t__',
  UserAccount:'__a__',
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

const loadAccount = () => {
  const account = Storage.get(Keys.UserAccount, new Account({}));
  if (24 * 60 * 60 * 1000 * 30 > new Date().getTime() - account.t) {
    return account;
  }
  account.p = "";
  return account;
};

const saveAccount = (account) => {
  return Storage.set(Keys.UserAccount,account);
};

export default {
  loadUserInfo,
  saveUserInfo,
  loadUserToken,
  saveUserToken,
  loadAccount,
  saveAccount,
}
